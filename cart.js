// А вы знали что js разрабы пидоры? Хочу стать js разрабом!
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let currentUser = JSON.parse(localStorage.getItem("user")) || null;

// ДОБАВЛЕНИЕ В КОРЗИНУ

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  }

  saveCart();
  updateCartCount();
}

// СОХРАНЕНИЕ

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// СЧЁТЧИК КОРЗИНЫ

function updateCartCount() {
  const el = document.querySelector(".cart-count");
  if (!el) return;

  const total = cart.reduce((sum, item) => sum + item.quantity, 0);
  el.textContent = total;
}

// ПРОВЕРКА АВТОРИЗАЦИИ

function isAuthenticated() {
  return currentUser !== null;
}

// ПОКУПКА

function checkout() {
  if (!isAuthenticated()) {
    // пользователь не залогинен
    alert("Please log in to continue");
    window.location.href = "login.html";
    return;
  }

  // если авторизован — идём к оплате
  alert("Redirecting to payment...");
  // позже здесь будет Stripe / PayPal
}

// ОТРИСОВКА КОРЗИНЫ


function renderCart() {
  const container = document.querySelector(".cart-items");
  if (!container) return;

  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty</p>";
    return;
  }

  cart.forEach(item => {
    const div = document.createElement("div");
    div.className = "cart-item";

    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div>
        <h3>${item.name}</h3>
        <p>$${item.price}</p>
        <p>Quantity: ${item.quantity}</p>
        <button onclick="removeFromCart(${item.id})">Remove</button>
      </div>
    `;

    container.appendChild(div);
  });
}

// УДАЛЕНИЕ

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  renderCart();
  updateCartCount();
}

// ИНИЦИАЛИЗАЦИЯ

updateCartCount();
renderCart();