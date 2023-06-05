document.addEventListener('DOMContentLoaded', function() {
    const cartItemsElement = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    
    // Haal winkelwagen uit lokale opslag
    const storedCartItems = localStorage.getItem('cartItems');
    const storedCartTotal = localStorage.getItem('cartTotal');
    
    if (storedCartItems && storedCartTotal) {
      cartItems = JSON.parse(storedCartItems);
      cartTotal = parseFloat(storedCartTotal);
    }
    
    updateCart();
  });
  
  function addToCart(productName, price, size) {
    // Controleer of het product al in de winkelwagen zit
    const existingItem = cartItems.find(item => item.name === productName && item.size === size);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.push({ name: productName, price: price, size: size, quantity: 1 });
    }
    
    cartTotal += price;
    
    // Bewaar winkelwagen in lokale opslag
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('cartTotal', cartTotal);
  }
  
  function updateCart() {
    const cartItemsElement = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    
    cartItemsElement.innerHTML = '';
    
    if (cartItems.length === 0) {
      cartTotalElement.innerText = '0.00';
      return;
    }
    
    let total = 0;
    
    cartItems.forEach((item, index) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <span>${item.name} - Size: ${item.size} - $${item.price.toFixed(2)}</span>
        <input type="number" min="1" value="${item.quantity}" onchange="updateQuantity(${index}, this.value)">
        <button onclick="removeFromCart(${index})">Verwijderen</button>
      `;
      cartItemsElement.appendChild(li);
      
      const itemTotal = item.price * item.quantity;
      total += itemTotal;
    });
    
    cartTotalElement.innerText = total.toFixed(2);
  }
  
  function updateQuantity(index, quantity) {
    if (quantity < 1) {
      removeFromCart(index);
      return;
    }
    
    const item = cartItems[index];
    const previousQuantity = item.quantity;
    item.quantity = parseInt(quantity);
    
    const quantityDifference = item.quantity - previousQuantity;
    cartTotal += quantityDifference * item.price;
    
    // Bewaar winkelwagen in lokale opslag
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('cartTotal', cartTotal);
    
    updateCart();
  }
  
  function removeFromCart(index) {
    const item = cartItems[index];
    cartItems.splice(index, 1);
    cartTotal -= item.price * item.quantity;
    
    // Bewaar winkelwagen in lokale opslag
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('cartTotal', cartTotal);
    
    updateCart();
  }
  