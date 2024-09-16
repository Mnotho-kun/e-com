document.addEventListener('DOMContentLoaded', function () {
    const searchIcon = document.getElementById('search-icon');
    const searchInput = document.getElementById('search-input');
    const searchContainer = document.querySelector('.search-container');

    searchIcon.addEventListener('click', function () {
        if (searchContainer.classList.contains('active')) {
            searchContainer.classList.remove('active');
            searchInput.value = ''; // Clear input on close
        } else {
            searchContainer.classList.add('active');
            searchInput.focus(); // Focus on input when opened
        }
    });

    // Optional: Close input when clicking outside of the container
    document.addEventListener('click', function (event) {
        if (!searchContainer.contains(event.target)) {
            searchContainer.classList.remove('active');
            searchInput.value = ''; // Clear input on close
        }
    });

    updateCartDisplay(); // Initial load to display the current cart items
});










document.addEventListener('DOMContentLoaded', function () {
  updateCartDisplay(); // Initial load to display the current cart items
});

// Function to update the cart display on the View-Cart page
function updateCartDisplay() {
  const cartDisplay = document.getElementById('cart-items');
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  let subtotal = 0;

  cartDisplay.innerHTML = ''; // Clear previous items

  cart.forEach((item, index) => {
    const itemSubtotal = item.price * item.quantity;
    subtotal += itemSubtotal;

    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.setAttribute('data-index', index);

    cartItem.innerHTML = `
      <div class="cart-item-content">
        <div class="remove-icon" onclick="removeItem(${index})">
          <i class="fas fa-trash-alt"></i>
        </div>
        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
        <div class="cart-item-info">
          <p class="cart-item-name">${item.name}</p>
          <p class="cart-item-price">$${item.price.toFixed(2)}</p>
          <div class="cart-item-details">
            <button class="quantity-button minus-btn">-</button>
            <input type="text" class="quantity-input" value="${item.quantity}" readonly />
            <button class="quantity-button plus-btn">+</button>
          </div>
          <p class="cart-item-subtotal">Subtotal: $${itemSubtotal.toFixed(2)}</p>
        </div>
      </div>
    `;

    cartDisplay.appendChild(cartItem);
  });

  // Update subtotal display in both sections
  updateCartSubtotal();
  setUpQuantityControls(); // Add event listeners for plus and minus buttons after cart items are displayed
  
}

// Function to set up event listeners for quantity buttons inside the cart
function setUpQuantityControls() {
  document.querySelectorAll('.plus-btn').forEach(button => {
    button.addEventListener('click', function () {
      const cartItem = this.closest('.cart-item');
      const index = parseInt(cartItem.getAttribute('data-index'), 10);
      const cart = JSON.parse(localStorage.getItem('cart')) || [];

      cart[index].quantity += 1;
      cartItem.querySelector('.quantity-input').value = cart[index].quantity; // Update input field
      localStorage.setItem('cart', JSON.stringify(cart)); // Save updated cart to local storage

      // Update subtotal and item subtotal display
      updateItemSubtotal(cartItem, cart[index].price, cart[index].quantity);
      updateCartSubtotal();
    });
  });

  document.querySelectorAll('.minus-btn').forEach(button => {
    button.addEventListener('click', function () {
      const cartItem = this.closest('.cart-item');
      const index = parseInt(cartItem.getAttribute('data-index'), 10);
      const cart = JSON.parse(localStorage.getItem('cart')) || [];

      if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
        cartItem.querySelector('.quantity-input').value = cart[index].quantity; // Update input field
        localStorage.setItem('cart', JSON.stringify(cart)); // Save updated cart to local storage

        // Update subtotal and item subtotal display
        updateItemSubtotal(cartItem, cart[index].price, cart[index].quantity);
        updateCartSubtotal();
      }
    });
  });
}



// Function to update the item subtotal display
function updateItemSubtotal(cartItem, price, quantity) {
  const itemSubtotal = price * quantity;
  cartItem.querySelector('.cart-item-subtotal').textContent = `Subtotal: $${itemSubtotal.toFixed(2)}`;
}




// Function to update the subtotal in both sections
function updateCartSubtotal() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  let subtotal = 0;

  cart.forEach(item => {
    subtotal += item.price * item.quantity;
  });

  // Update subtotal display in the first section
  document.getElementById('subtotal-amount').textContent = `Subtotal: $${subtotal.toFixed(2)}`;

  // Update subtotal and total display in the second section
  const totalsSection = document.querySelector('.Totals');
  if (totalsSection) {
    const subtotalElement = totalsSection.querySelector('p:first-child'); // First p for subtotal
    const totalElement = totalsSection.querySelector('p:nth-child(2)'); // Second p for total
    if (subtotalElement) subtotalElement.textContent = `Subtotal: $${subtotal.toFixed(2)}`;
    if (totalElement) totalElement.textContent = `Total: $${subtotal.toFixed(2)}`; // Assuming no extra fees
  }

    // Call to update PayPal button amount
    initializePayPalButton();
}




// Function to remove an item from the cart
function removeItem(index) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.splice(index, 1); // Remove the item at the specified index
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartDisplay();
}





document.addEventListener('DOMContentLoaded', function() {
  // Get references to the elements
  const minusButton = document.getElementById('minus');
  const plusButton = document.getElementById('plus');
  const quantityInput = document.getElementById('quantity');
  const addToCartButton = document.querySelector('.add-to-cart');
  const cartCount = document.getElementById('cart-count');

  // Initialize quantity value
  let quantity = parseInt(quantityInput.value, 10);
  let cartQuantity = parseInt(cartCount.textContent, 10);

  // Function to update the quantity
  function updateQuantity(newQuantity) {
      quantity = Math.max(1, newQuantity); // Ensure quantity is at least 1
      quantityInput.value = quantity; // Update the input field
  }

  // Function to update the cart count
  function updateCartCount() {
      cartQuantity += quantity; // Increase cart quantity by the selected quantity
      cartCount.textContent = cartQuantity; // Update cart count display
  }

  // Event listener for the minus button
  minusButton.addEventListener('click', function() {
      updateQuantity(quantity - 1);
  });

  // Event listener for the plus button
  plusButton.addEventListener('click', function() {
      updateQuantity(quantity + 1);
  });

  // Event listener for the add-to-cart button
  addToCartButton.addEventListener('click', function() {
      updateCartCount(); // Update cart count based on current quantity
      // You can also add code here to handle cart functionality, e.g., saving items to a cart
  });
});








  // Example cart items (in reality, you'll be loading these from localStorage)
let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

// Function to render cart items
function renderCartItems() {
    const cartContainer = document.getElementById("cart-items");
    cartContainer.innerHTML = ""; // Clear existing items

    if (cartItems.length === 0) {
        cartContainer.innerHTML = `<i class="fa-solid fa-shop"></i><p>Your cart is currently empty.</p>`;
    } else {
        cartItems.forEach((item, index) => {
            const cartItem = document.createElement("div");
            cartItem.className = "cart-item";

            // Cart Item Structure
            cartItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
        <div class="cart-item-name">
          <p><strong>Product Name:</strong> ${item.name}</p>
          <p><strong>Size:</strong> ${item.size}</p>
          <p><strong>Quantity:</strong> 
            <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-index="${index}">
          </p>
          <p><strong>Subtotal:</strong> $${(item.price * item.quantity).toFixed(2)}</p>
        </div>
      `;

            cartContainer.appendChild(cartItem);
        });
        
        checkCouponVisibility(); // Check if coupon section should be visible
    }
    
    updateCart();
}

// Function to update cart subtotals
function updateCart() {
    const quantityInputs = document.querySelectorAll(".quantity-input");

    quantityInputs.forEach(input => {
        input.addEventListener("input", (event) => {
            const index = event.target.dataset.index;
            cartItems[index].quantity = parseInt(event.target.value) || 1;
            localStorage.setItem('cart', JSON.stringify(cartItems)); // Save updated cartItems to localStorage
            renderCartItems(); // Re-render to update the subtotal
        });
    });
}

// Function to check if the coupon section should be visible
function checkCouponVisibility() {
  const couponSection = document.getElementById('coupon-section');
  const couponCode = localStorage.getItem('appliedCoupon');

  if (couponCode) {
      couponSection.style.display = 'block'; // Show coupon section if a coupon is applied
  } else {
      couponSection.style.display = 'none'; // Hide coupon section if no coupon is applied
  }
}


const validCoupons = {
  'SAVE10': 0.10, // 10% discount
  'SAVE20': 0.20  // 20% discount
};

// Apply coupon function
function applyCoupon() {
  const couponCode = document.getElementById("coupon-code").value.trim().toUpperCase();
  const couponMessage = document.getElementById("coupon-message");

  const discount = validCoupons[couponCode];
  if (discount) {
      const subtotal = calculateSubtotal();
      const discountAmount = discount * subtotal;
      localStorage.setItem('discountAmount', discountAmount); // Store discount amount
      couponMessage.textContent = `Coupon applied! You get ${discount * 100}% off.`;
      applyDiscount(discount); // Apply discount to cart items
  } else {
      couponMessage.textContent = 'Invalid coupon code.';
  }
}



// Function to apply discount to all cart items
function applyDiscount(discount) {
  cartItems = cartItems.map(item => {
      item.price = item.price * (1 - discount);
      return item;
  });

  localStorage.setItem('cart', JSON.stringify(cartItems)); // Save updated cartItems to localStorage
  renderCartItems(); // Re-render to reflect discount
  updateCartSubtotal(); // Update subtotal with discount
}

// Initialize Cart Rendering
renderCartItems();

// Event listener for the apply coupon button
document.getElementById("apply-coupon").addEventListener("click", applyCoupon);









// Function to generate a random coupon code
function generateCouponCode(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let couponCode = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    couponCode += characters[randomIndex];
  }
  return couponCode;
}

// Function to display the generated coupon code and store it in localStorage
document.addEventListener('DOMContentLoaded', function () {
  // Generate and store the coupon code
  const couponCode = generateCouponCode(8);
  localStorage.setItem('validCouponCode', couponCode); // Store the coupon code in localStorage

  // Display the coupon code in the Coupon-name-display section
  const couponDisplay = document.querySelector('.Coupon-name-display');
  if (couponDisplay) {
    couponDisplay.textContent = `Use this coupon code: ${couponCode}`;
  }

  // Show the coupon section only when items are added to the cart
  const cartItems = document.querySelectorAll('#cart-items .cart-item');
  if (cartItems.length > 0) {
    document.getElementById('coupon-section').style.display = 'block';
  }
});

// Apply coupon functionality to validate the inputted coupon code
document.getElementById('apply-coupon').addEventListener('click', function () {
  const enteredCode = document.getElementById('coupon-code').value.trim(); // Get entered coupon code
  const validCouponCode = localStorage.getItem('validCouponCode'); // Retrieve stored coupon code

  const couponMessage = document.getElementById('coupon-message');
  if (enteredCode === validCouponCode) {
    applyDiscount(); // Apply 15% discount
    couponMessage.textContent = 'Coupon applied successfully! 15% discount has been applied.';
    couponMessage.style.color = 'green';
  } else {
    couponMessage.textContent = 'Invalid coupon code. Please try again.';
    couponMessage.style.color = 'red';
  }
});

// Function to calculate and display the subtotal amount
function calculateSubtotal() {
  let subtotal = 0;
  const cartItems = document.querySelectorAll('.cart-item');

  cartItems.forEach((item) => {
    const price = parseFloat(item.querySelector('.cart-item-price').textContent.replace('$', ''));
    const quantity = parseInt(item.querySelector('.quantity-input').value);
    subtotal += price * quantity;
  });

  document.getElementById('subtotal-amount').textContent = `Subtotal: $${subtotal.toFixed(2)}`;
  return subtotal;
}

// Function to apply a 15% discount to the subtotal
function applyDiscount() {
  const subtotal = calculateSubtotal();
  const discount = subtotal * 0.15;
  const discountedTotal = subtotal - discount;

  document.getElementById('subtotal-amount').textContent = `Subtotal after discount: $${discountedTotal.toFixed(2)}`;
}

// Initial rendering of the cart items and subtotal
document.addEventListener('DOMContentLoaded', function () {
  calculateSubtotal();
});








// Function to calculate and display the subtotal amount
function calculateSubtotal() {
  let subtotal = 0;
  const cartItems = document.querySelectorAll('.cart-item');

  cartItems.forEach((item) => {
    const price = parseFloat(item.querySelector('.cart-item-price').textContent.replace('$', ''));
    const quantity = parseInt(item.querySelector('.quantity-input').value);
    subtotal += price * quantity;
  });

  // Update the subtotal in the first section
  document.getElementById('subtotal-amount').textContent = `Subtotal: $${subtotal.toFixed(2)}`;

  // Update the subtotal and total in the second section
  updateSecondSectionSubtotal(subtotal);

  return subtotal;
}

// Function to apply a 15% discount to the subtotal
function applyDiscount() {
  const subtotal = calculateSubtotal();
  const discount = subtotal * 0.15;
  const discountedTotal = subtotal - discount;

  document.getElementById('subtotal-amount').textContent = `Subtotal after discount: $${discountedTotal.toFixed(2)}`;

  // Update the discounted total in the second section
  updateSecondSectionSubtotal(discountedTotal);
}

// Function to update the subtotal and total in the second section
function updateSecondSectionSubtotal(subtotal) {
  const totalsSection = document.querySelector('.Totals');

  // Find and update the subtotal and total values in the second section
  if (totalsSection) {
    const subtotalElement = totalsSection.querySelector('p:first-child'); // First <p> for subtotal
    const totalElement = totalsSection.querySelector('p:nth-child(2)'); // Second <p> for total

    if (subtotalElement) subtotalElement.textContent = `Subtotal: $${subtotal.toFixed(2)}`;
    if (totalElement) totalElement.textContent = `Total: $${subtotal.toFixed(2)}`; // Assuming total is same as subtotal if no extra fees
  }
}

// Function to update the subtotal and re-render cart items when quantity changes
function updateCart() {
  const quantityInputs = document.querySelectorAll(".quantity-input");

  quantityInputs.forEach(input => {
    input.addEventListener("input", (event) => {
      const index = event.target.dataset.index;
      cartItems[index].quantity = parseInt(event.target.value) || 1;
      calculateSubtotal(); // Recalculate subtotal to reflect changes
      renderCartItems(); // Re-render to update the subtotal
    });
  });
}

// Initial rendering of the cart items and subtotal
document.addEventListener('DOMContentLoaded', function () {
  calculateSubtotal();
});



document.addEventListener('DOMContentLoaded', function () {
  // Select the proceed to checkout button
  const checkoutButton = document.getElementById('proceed-to-checkout');

  // Add click event listener to redirect to the Check-Out.html page
  checkoutButton.addEventListener('click', function () {
    window.location.href = '/checkout'; // Redirects to the checkout page
  });

  // Call the function to update the cart display on initial load
  updateCartDisplay();
});


// Responsive Webpage
document.addEventListener('DOMContentLoaded', () => {
  const menuIcon = document.querySelector('.menu');
  const closeIcon = document.querySelector('.close');
  const navUl = document.querySelector('nav ul');

  menuIcon.addEventListener('click', () => {
      navUl.classList.add('show');
      menuIcon.style.display = 'none';
      closeIcon.style.display = 'block';
  });

  closeIcon.addEventListener('click', () => {
      navUl.classList.remove('show');
      menuIcon.style.display = 'block';
      closeIcon.style.display = 'none';
  });
});
