document.addEventListener('DOMContentLoaded', () => {
    const cartButton = document.querySelector('.cart-button');
    const cartContent = document.querySelector('.cart-content');
    const productButtons = document.querySelectorAll('.product-button');
    const cartTotalElement = document.querySelector('.cart-total span:last-child');
    const cartItemsContainer = document.querySelector('.cart-content');
  
    let cart = [];
  
    cartButton.addEventListener('click', () => {
      cartContent.classList.toggle('show');
    });
  
    productButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const productCard = e.target.closest('.product-card');
        const productName = productCard.querySelector('.product-name').textContent;
        const productPrice = parseFloat(productCard.querySelector('.product-price').textContent.replace('$', '').replace('.', ''));
        const productImageSrc = productCard.querySelector('.product-image').src;
  
        addToCart(productName, productPrice, productImageSrc);
      });
    });
  
    function addToCart(name, price, imageSrc) {
      const existingProductIndex = cart.findIndex(item => item.name === name);
  
      if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += 1;
      } else {
        cart.push({ name, price, imageSrc, quantity: 1 });
      }
  
      renderCartItems();
      updateCartTotal();
    }
  
    function renderCartItems() {
      const cartItemsElement = document.querySelector('.cart-content .cart-item');
      cartItemsElement.innerHTML = '';
  
      cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
          <img src="${item.imageSrc}" alt="Producto" class="cart-item-image">
          <div class="cart-item-info">
            <span class="cart-item-name">${item.name}</span>
            <span class="cart-item-price">$${item.price.toLocaleString()}</span>
          </div>
          <div class="cart-item-quantity">
            <button class="quantity-button" data-name="${item.name}" data-action="decrease">-</button>
            <span>${item.quantity}</span>
            <button class="quantity-button" data-name="${item.name}" data-action="increase">+</button>
          </div>
        `;
        cartItemsElement.appendChild(cartItem);
      });
  
      const quantityButtons = document.querySelectorAll('.quantity-button');
      quantityButtons.forEach(button => {
        button.addEventListener('click', handleQuantityChange);
      });
    }
  
    function handleQuantityChange(e) {
      const button = e.target;
      const productName = button.dataset.name;
      const action = button.dataset.action;
      const productIndex = cart.findIndex(item => item.name === productName);
  
      if (action === 'decrease' && cart[productIndex].quantity > 1) {
        cart[productIndex].quantity -= 1;
      } else if (action === 'increase') {
        cart[productIndex].quantity += 1;
      }
  
      renderCartItems();
      updateCartTotal();
    }
  
    function updateCartTotal() {
      const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
      cartTotalElement.textContent = `$${total.toLocaleString()}`;
    }
  });
  