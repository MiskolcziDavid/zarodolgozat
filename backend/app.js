const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const saltRounds = 10
const mysql = require('mysql2')
const bodyParser = require('body-parser')
const cors = require('cors')
const session = require('express-session')
let loggedInUsers = {} // bejelentkezett felhasználók
/*
const corsOptions = {
    origin: 'http://localhost:5500/frontend/index.html',
    credentials: true
} // cors beállítások
*/
// json parse-olás
app.use(bodyParser.json())

// cors
app.use(cors())

// session
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
)

// adatbázis kapcsolódás
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'kong burger',
})

// regisztráció
app.post('/register', (req, res) => {
  const { username, password } = req.body

  connection.query(
    'SELECT * FROM users WHERE username = ?',
    [username],
    (error, results) => {
      if (error) throw error

      if (results.length > 0) {
        return res
          .status(400)
          .json({ message: 'A felhasználónév már foglalt!' })
      }

      bcrypt.hash(password, saltRounds, (error, hash) => {
        if (error) throw error

        connection.query(
          'INSERT INTO users (id, username, password, role) VALUES (NULL, ?, ?, "user")',
          [username, hash],
          (error) => {
            if (error) throw error

            res.json({ message: 'Sikeres regisztráció!' })
          }
        )
      })
    }
  )
})

// Login
app.post('/login', (req, res) => {
  const { username, password } = req.body

  connection.query(
    'SELECT * FROM users WHERE username = ?',
    [username],
    (error, results) => {
      if (error) throw error

      if (results.length === 0) {
        return res
          .status(400)
          .json({ message: 'A felhasználónév vagy jelszó hibás!' })
      }

      const user = results[0]

      bcrypt.compare(password, user.password, (error, result) => {
        if (error) throw error

        if (!result) {
          return res
            .status(400)
            .json({ message: 'A felhasználónév vagy jelszó hibás!' })
        }

        req.session.username = username
        req.session.role = user.role

        res.json({
          username: req.session.username,
          role: req.session.role,
          user_id: user.id,
        })
      })
    }
  )
})

// Logout
app.post('/logout', (req, res) => {
  if (!req.session.username) {
    return res.status(400).json({ message: 'Nincs bejelentkezett felhasználó' })
  }

  req.session.destroy(() => {
    res.json({ message: 'Sikeres kijelentkezés!' })
  })
})
// Rendelés le mentése adatbázisba

app.post('/kosar', (req, res) => {
  const { user_id, cart } = req.body

  // A kosár (cart):
  // [
  //  {
  //    "title": "Tojás Burger",
  //    "price": "990 Ft",
  //    "quantity": 1,
  //    "imageSrc": "http://127.0.0.1:5500/frontend/img/tojas.png"
  //  },
  //  ...és a többi elem
  // ]

  const sql =
    'INSERT INTO kosarak (user_id, termek_nev, termek_ar, termek_db, termek_kep) VALUES (?, ?, ?, ?, ?)'

  // Minden elem feltöltése az kosárból az adatbázisba
  cart.map(
    ({
      title: termek_nev,
      price: termek_ar,
      quantity: termek_db,
      imageSrc: termek_kep,
    }) => {
      connection.query(
        sql,
        [user_id, termek_nev, termek_ar, termek_db, termek_kep],
        (error) => {
          if (error) throw error
        }
      )
    }
  )
})

// szerver futása
app.listen(3000, () => {
  console.log('Server running on port 3000')
})
