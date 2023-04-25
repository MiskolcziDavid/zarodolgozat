//Regisztráció:
function registration() {
    if (
      document.getElementById('regUsername').value != '' &&
      document.getElementById('regPassword1').value != '' &&
      document.getElementById('regPassword2').value != ''
    ) {
      if (
        document.getElementById('regPassword1').value ==
        document.getElementById('regPassword2').value
      ) {
        let datas = {
          username: document.getElementById('regUsername').value,
          password: document.getElementById('regPassword1').value,
        }
        let url = 'http://localhost:3000/register'
        let fetchOptions = {
          method: 'POST',
          body: JSON.stringify(datas),
          headers: { 'Content-type': 'application/json; charset=UTF-8' },
        }
        fetch(url, fetchOptions)
          .then((x) => x.text())
          .then((y) => {
            alert(y)
            document.getElementById('regUsername').value = ''
            document.getElementById('regPassword1').value = ''
            document.getElementById('regPassword2').value = ''
          })
      } else {
        alert('A két jelszó nem egyezik!')
      }
    } else {
      alert('Minden mezőt kötelező kitölteni!')
    }
  }
  
  //Bejelentkezés
  function login() {
    if (
      document.getElementById('logUsername').value !== '' &&
      document.getElementById('logPassword').value !== ''
    ) {
      let datas = {
        username: document.getElementById('logUsername').value,
        password: document.getElementById('logPassword').value,
      }
      let url = 'http://localhost:3000/login'
      let fetchOptions = {
        method: 'POST',
        body: JSON.stringify(datas),
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
      }
      fetch(url, fetchOptions)
        .then((x) => {
          return x.json()
        })
        .then((y) => {
          console.log(y)
  
          sessionStorage.setItem('username', y.username)
          sessionStorage.setItem('role', y.role)
          sessionStorage.setItem('user_id', y.user_id)
          if (y.role === 'admin') {
            window.location.replace('admin.html')
          } else {
            window.location.replace('loggedIn.html')
          }
        })
        .catch((error) => {
          console.error(error)
        })
    } else {
      alert('Minden mezőt kötelező kitölteni!')
    }
  }
  
  //Kijelentkezés
  function logout() {
    let url = 'http://localhost:3000/logout'
    let datas = {
      username: sessionStorage.getItem('username'),
    }
    let fetchOptions = {
      method: 'POST',
      body: JSON.stringify(datas),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    }
    fetch(url, fetchOptions).then((x) => {
      x.json()
      sessionStorage.removeItem('username')
      sessionStorage.removeItem('role')
      window.location.href = 'index.html'
    })
  }
  
  // Felhasználó kiírása
  function load() {
    let username = sessionStorage.getItem('username')
    let role = sessionStorage.getItem('role')
    if (username) {
      let loggedInUser = document.getElementById('loggedInUser')
      if (loggedInUser) {
        loggedInUser.innerHTML = ` ${username} (${role})`
      }
    }
  }
  
  // Adatok lekérése a card-okhoz
  function cardDatas() {
    fetch('http://localhost:3000/cards', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    })
      .then((x) => {
        console.log(x)
        return x.json()
      })
      .then((y) => {
        console.log(y)
        cards(y)
      })
      .catch((error) => console.error(error))
  }
  
  // adatok kirajzoltatása
  function cards(adatok) {
    let cardsFromDB = ''
    console.log(adatok)
    for (let adat of adatok) {
      cardsFromDB += `
          <div class="row">
              <img src="${adat.kep}" class="card-img-top" alt="Image">
              <div class="card-body">
                  <h5 class="card-title">${adat.cim}</h5>
                  <p class="card-text">${adat.szerzo}</p>
                  <p class="card-text">${adat.tipus}</p>
                  <p class="card-text">${adat.olvasas}</p>
                  <button type="button" class="btn btn-primary" onclick="updateData()">Update</button>
              </div>
          </div>
          `
    }
  
    document.getElementById('bookCard').innerHTML = cardsFromDB
  }
  
  // Új könyv felvitele
  function newBook() {
    if (
      document.getElementById('newTitle') != '' &&
      document.getElementById('newWriter') != '' &&
      document.getElementById('newType') != '' &&
      document.getElementById('newRead') != ''
    ) {
      let datas = {
        title: document.getElementById('newTitle').value,
        writer: document.getElementById('newWriter').value,
        type: document.getElementById('newType').value,
        read: document.getElementById('newRead').value,
      }
      let url = 'http://localhost:3000/newBook'
      let fetchOptions = {
        method: 'POST',
        body: JSON.stringify(datas),
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
      }
      fetch(url, fetchOptions)
        .then((x) => x.text())
        .then((y) => {
          cardDatas()
          alert(y)
          document.getElementById('newTitle').value = ''
          document.getElementById('newWriter').value = ''
          document.getElementById('newType').value = ''
          document.getElementById('newRead').value = ''
        })
    } else {
      alert('Minden mezőt tölts ki!')
    }
  }
  
  //Jelszó módosítás
  function jelszomodosit() {
    let bemenet = {
      felhasznaloinev: document.getElementById('loginUser').value,
      jelszo: document.getElementById('loginPass').value,
    }
    let url = 'http://localhost:3000/jelszoCsere'
    let fetchOptions = {
      method: 'POST',
      body: JSON.stringify(bemenet),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    }
    fetch(url, fetchOptions)
      .then((x) => x.text())
      .then((y) => {
        alert(y)
      })
  }
  
  //Felhasználó törlése
  function userDelete() {
    let bemenet = {
      felhasznaloinev: document.getElementById('loginUser').value,
    }
    let url = 'http://localhost:3000/felhasznaloTorlese'
    let fetchOptions = {
      method: 'POST',
      body: JSON.stringify(bemenet),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    }
    fetch(url, fetchOptions)
      .then((x) => x.text())
      .then((y) => {
        alert(y)
      })
  }
  function nextpage() {
    window.location.href = 'rolunk.html'
  }
  function nextpage1() {
    window.location.href = 'loggedIn.html'
  }
  function nextpage2() {
    window.location.href = 'burgereink.html'
  }
  function nextpage3() {
    window.location.href = 'kosar.html'
  }
  function nextpage4() {
    window.location.href = 'csibe.html'
  }
  function nextpage5() {
    window.location.href = 'BigKong.html'
  }
  function nextpage6() {
    window.location.href = 'sajtburger.html'
  }
  function nextpage7() {
    window.location.href = 'DuplaKong.html'
  }
  function nextpage8() {
    window.location.href = 'Spicy.html'
  }
  function nextpage9() {
    window.location.href = 'Honey.html'
  }
  function nextpage10() {
    window.location.href = 'Farm.html'
  }
  function nextpage11() {
    window.location.href = 'halas.html'
  }
  function nextpage12() {
    window.location.href = 'duplasajt.html'
  }
  function nextpage13() {
    window.location.href = 'pinky.html'
  }
  function nextpage14() {
    window.location.href = 'gluten.html'
  }
  function nextpage15() {
    window.location.href = 'hambi.html'
  }
  function nextpage16() {
    window.location.href = 'tojas.html'
  }
  function nextpage17() {
    window.location.href = 'muffin.html'
  }
  //kosar
  if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
  } else {
    ready()
  }
  
  function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
      var button = removeCartItemButtons[i]
      button.addEventListener('click', removeCartItem)
    }
  
    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
      var input = quantityInputs[i]
      input.addEventListener('change', quantityChanged)
    }
  
    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
      var button = addToCartButtons[i]
      button.addEventListener('click', addToCartClicked)
    }
  
    document
      .getElementsByClassName('btn-purchase')[0]
      .addEventListener('click', purchaseClicked)
  }
  
  function purchaseClicked() {
    const cart = getCart()
  
    // Ha nincs termék a kosárban
    if (!cart || cart.length === 0) {
      alert('A kosár üres!')
      return
    }
  
    // A szervernek ezek kellenek
    const data = {
      user_id: sessionStorage.getItem('user_id'),
      cart,
    }
  
    let url = 'http://localhost:3000/kosar'
    let fetchOptions = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    }
    fetch(url, fetchOptions)
      .then((x) => x.text())
      .then((y) => {})
    updateCartTotal()
  
    // Kosár kiűrítése
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    cartItemContainer.innerHTML = ''
  
    localStorage.removeItem('cart')
  
    alert('Köszönjük a vásárlást!')
  }
  
  function removeCartItem(event, termekTitle) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
  
    // Delete item
    deleteItemFromCart(termekTitle)
  
    updateCartTotal()
  }
  
  function quantityChanged(event, termekTitle) {
    var inputValue = event.target.value
    if (isNaN(inputValue) || inputValue <= 0) {
      inputValue = 1
    }
  
    // Update quantity
    const quantity = Number(inputValue)
    updateQuantityInCart(termekTitle, quantity)
  
    updateCartTotal()
  }
  
  // Ha fríssül a lap töröljük ki az esetlegesen létező,
  // "cart" nevű elemet a localStorage-ból
  localStorage.removeItem('cart')
  
  function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    // Ez a verzió nem megfelelő mert a következőt fogja vissza adni:
    // http://127.0.0.1:5500/frontend/img/gluten.png
    // var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
  
    // Ez már valóban a kép elérési útját adja vissza
    // Pl.: ../frontend/img/gluten.png
    var imageSrc =
      shopItem.getElementsByClassName('shop-item-image')[0].attributes.src.value
  
    setCartInLocalStorage(title, price, 1, imageSrc)
  
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
  }
  
  // localStorage cart
  function setCartInLocalStorage(title, price, quantity, imageSrc) {
    const priceWithoutFt = Number(price.slice(0, price.length - 3))
    const newCartItem = { title, price: priceWithoutFt, quantity, imageSrc }
    const cartValue = localStorage.getItem('cart')
  
    // Ha a kosár már létezik
    if (cartValue) {
      // A cartValue egy string, ehhez nem tudunk elemet adni.
      // Atkell "parsolni" hogy az értékéből kinyerjük a tömböt.
      const cartArray = JSON.parse(cartValue)
  
      // Ne adjuk hozzá a terméket ha már benne van a kosárba
      const termekInCart = cartArray.find(
        ({ title: termekTitle }) => termekTitle === title
      )
      if (termekInCart) return
  
      // A tömbhöz hozzáadjuk az új elemet
      cartArray.push(newCartItem)
  
      // A tömböt ismét string-gé alakítjuk és elhelyezzük a
      // localStorage-en belül, "cart" néven.
      localStorage.setItem('cart', JSON.stringify(cartArray))
  
      console.log(cartArray)
    } else {
      // Üres kosár lérehozása
      const cartArray = []
      // A jelenleg hozzáadandó termék kosárba rakása
      cartArray.push(newCartItem)
  
      // Így fog kinézni a kosár:
      // [
      //  {
      //    "title": "Tojás Burger",
      //    "price": "990 Ft",
      //    "quantity": 1,
      //    "imageSrc": "http://127.0.0.1:5500/frontend/img/tojas.png"
      //  },
      //  ...és a többi elem
      // ]
  
      // A kosár tömböt string-gé alakítjuk és elhelyezzük a
      // localStorage-en belül, "cart" néven
      localStorage.setItem('cart', JSON.stringify(cartArray))
    }
  }
  
  function getCart() {
    const cartValue = localStorage.getItem('cart')
    return JSON.parse(cartValue)
  }
  
  function updateCart(newCart) {
    localStorage.setItem('cart', JSON.stringify(newCart))
  }
  
  function deleteItemFromCart(termekTitle) {
    const cart = getCart()
    const newCart = cart.filter(({ title }) => title !== termekTitle)
  
    updateCart(newCart)
  }
  
  function updateQuantityInCart(termekTitle, newQuantity) {
    const cart = getCart()
    const newCart = cart.map((item) => {
      if (item.title === termekTitle) {
        return { ...item, quantity: newQuantity }
      }
  
      return item
    })
  
    updateCart(newCart)
  }
  
  function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
      if (cartItemNames[i].innerText == title) {
        alert('Ez a termék már a kosárban van!')
        return
      }
    }
    var cartRowContents = `
          <div class="cart-item cart-column">
              <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
              <span class="cart-item-title">${title}</span>
          </div>
          <span class="cart-price cart-column">${price}</span>
          <div class="cart-quantity cart-column">
              <input class="cart-quantity-input" type="number" min="1" value="1">
              <button class="btn btn-danger" type="button">Törlés</button>
          </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow
      .getElementsByClassName('btn-danger')[0]
      .addEventListener('click', (e) => removeCartItem(e, title))
    cartRow
      .getElementsByClassName('cart-quantity-input')[0]
      .addEventListener('change', (e) => quantityChanged(e, title))
  }
  
  function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
      var cartRow = cartRows[i]
      var priceElement = cartRow.getElementsByClassName('cart-price')[0]
      var quantityElement = cartRow.getElementsByClassName(
        'cart-quantity-input'
      )[0]
      var price = parseFloat(priceElement.innerText.replace('Ft', ''))
      var quantity = quantityElement.value
      total = total + price * quantity
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText =
      total + 'Ft'
  }
  