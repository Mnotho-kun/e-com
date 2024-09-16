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

  // Function to save the cart to localStorage
function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to load the cart from localStorage
function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartDisplay();
        updateCartSidebar();
    }
}



document.addEventListener('DOMContentLoaded', function () {
    // Initialize Tom Select on the country dropdown
    new TomSelect('#country-region', {
      create: false, // Disable creating new entries
      sortField: {
        field: 'text',
        direction: 'asc'
      },
      placeholder: 'Select your country...',
      allowEmptyOption: true,
    });
  });





  let isCartEmpty = true;

  function updateCartDisplay() {
      const orderItemsContainer = document.getElementById('Order-items');
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      let subtotal = 0;
  
      orderItemsContainer.innerHTML = ''; // Clear previous items
  
      if (cart.length === 0) {
          // Show the No-product message if the cart is empty
          const noProductMessage = document.querySelector('.No-product');
          if (noProductMessage) noProductMessage.style.display = 'block';
  
          // Hide payment methods
          const paymentMethodsDiv = document.querySelector('.Payment-methods');
          if (paymentMethodsDiv) paymentMethodsDiv.style.display = 'none';
  
          isCartEmpty = true;
      } else {
          // Hide the No-product message if there are items in the cart
          const noProductMessage = document.querySelector('.No-product');
          if (noProductMessage) noProductMessage.style.display = 'none';
  
          // Show payment methods
          const paymentMethodsDiv = document.querySelector('.Payment-methods');
          if (paymentMethodsDiv) paymentMethodsDiv.style.display = 'block';
  
          isCartEmpty = false;
  
          cart.forEach((item, index) => {
              const itemSubtotal = item.price * item.quantity;
              subtotal += itemSubtotal;
  
              const cartItem = document.createElement('div');
              cartItem.className = 'cart-item';
              cartItem.setAttribute('data-index', index);
  
              cartItem.innerHTML = `
                  <div class="Product-Name">
                      <p class="Product-name">${item.name}</p>
                      <p class="Product-size">${item.size}</p>
                      <p class="Product-quantity">Qty: ${item.quantity}</p>
                  </div>
                  <div class="Subtotal-amount-Product">
                      <p>$${itemSubtotal.toFixed(2)}</p>
                  </div>
              `;
  
              orderItemsContainer.appendChild(cartItem);
          });
  
          // Update subtotal and total display
          updateCartSubtotal();
      }

      initializePayPalButton(); 
  }
  







// Function to calculate and update the subtotal in both sections
function updateCartSubtotal(subtotal) {
    // Update subtotal display in the first section
    document.getElementById('subtotal-amount').textContent = `$${subtotal.toFixed(2)}`;

    // Update total display in the second section
    updateSecondSectionTotal(subtotal);
}

// Function to update the total amount
function updateSecondSectionTotal(subtotal) {
    console.log(`Updating total to: $${subtotal.toFixed(2)}`); // Debugging
    const totalsSection = document.querySelector('.Subtotal');

    if (totalsSection) {
        const subtotalElement = totalsSection.querySelector('#subtotal-amount');
        const totalElement = totalsSection.querySelector('#total-amount');

        if (subtotalElement) {
            console.log(`Updating subtotal element to: $${subtotal.toFixed(2)}`); // Debugging
            subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        } else {
            console.error('Subtotal element not found'); // Debugging
        }

        if (totalElement) {
            console.log(`Updating total element to: $${subtotal.toFixed(2)}`); // Debugging
            totalElement.textContent = `$${subtotal.toFixed(2)}`; // Assuming total is same as subtotal if no extra fees
        } else {
            console.error('Total element not found'); // Debugging
        }
    } else {
        console.error('Subtotal section not found'); // Debugging
    }
}

// Initial rendering of the cart items and subtotal
document.addEventListener('DOMContentLoaded', function () {
    updateCartDisplay(); // Display cart items on page load
});


    // Add event listener for the Place Order button
    document.getElementById('Place-order').addEventListener('click', function() {
        validateOrderForm();
    });


function validateOrderForm() {
    // Example form field IDs - replace these with actual IDs from your form
    const requiredFields = [
        { id: 'first-name', name: 'First Name' },
        { id: 'last-name', name: 'Last Name' },
        { id: 'street-address', name: 'Street address' },
        { id: 'town-city', name: 'Town/City' },
        { id: 'state', name: 'State' },
        { id: 'zip-code', name: 'Zip Code' },
        { id: 'phone', name: 'Phone' },
        { id: 'email', name: 'Email' },
        { id: 'country-region', name: 'Country/Region' }
    ];

    let missingFields = [];
    requiredFields.forEach(field => {
        const fieldElement = document.getElementById(field.id);
        if (!fieldElement || fieldElement.value.trim() === '') {
            missingFields.push(`${field.name} is a required field.`);
            fieldElement.style.border = '2px solid red'; // Highlight empty fields
        } else {
            fieldElement.style.border = ''; // Remove highlight if field is filled
        }
    });

    const errorMessageDiv = document.querySelector('.Error-message');
    const errorText = document.getElementById('error-text');

    if (missingFields.length > 0) {
        // Display error message
        errorText.innerHTML = missingFields.join('<br>');
        if (errorMessageDiv) errorMessageDiv.style.display = 'block';
    } else {
        // Hide error message if no errors
        if (errorMessageDiv) errorMessageDiv.style.display = 'none';
        // Proceed with order submission
    }
}







document.addEventListener('DOMContentLoaded', function () {
    updateCartDisplay(); // Display cart items on page load

    const paymentMethodSelect = document.getElementById('payment-method-select');
    const paymentDetailsDiv = document.getElementById('payment-details');
    const paymentMethodsDiv = document.querySelector('.Payment-methods');
    const noProductDiv = document.querySelector('.No-product');
    const confirmationSection = document.getElementById('confirmation-section');

    // Handle payment method selection
    paymentMethodSelect.addEventListener('change', function() {
        const selectedPaymentMethod = paymentMethodSelect.value;
        displayPaymentDetails(selectedPaymentMethod);
    });

    // Add event listener for the Place Order button
    document.getElementById('Place-order').addEventListener('click', function() {
        if (validateOrderForm()) {
            if (isCartEmpty) {
                const errorMessageDiv = document.querySelector('.Error-message');
                const errorText = document.getElementById('error-text');
                errorText.innerHTML = 'Please add at least one product to the cart before placing an order.';
                if (errorMessageDiv) errorMessageDiv.style.display = 'block';
                return;
            }

            // Hide the current sections and show the confirmation message
            document.querySelector('#section2').style.display = 'none';
            document.querySelector('#section3').style.display = 'none';
            confirmationSection.style.display = 'block';
            
            // You can add code here to handle the actual order submission,
            // like sending data to a server using AJAX or integrating PayPal.
        }
    });
});













// Function to calculate discount based on the coupon
function calculateCouponDiscount(subtotal) {
    const appliedCoupon = localStorage.getItem('appliedCoupon');
    let discount = 0;

    // Calculate discount if a valid coupon is applied
    if (appliedCoupon && validCoupons[appliedCoupon]) {
        discount = validCoupons[appliedCoupon] * subtotal;
    }

    return discount;
}


document.addEventListener('DOMContentLoaded', function () {
    updateCartSubtotal(); // Ensure the subtotal and total are correctly calculated and displayed
});


function updateSecondSectionSubtotal(total) {
    const totalsSection = document.querySelector('.Totals');

    if (totalsSection) {
        const subtotalElement = totalsSection.querySelector('#subtotal-amount');
        const totalElement = totalsSection.querySelector('#total-amount');

        if (subtotalElement) subtotalElement.textContent = `Total: $${total.toFixed(2)}`;
        if (totalElement) totalElement.textContent = `Total: $${total.toFixed(2)}`;
    }
}



// Initialize the checkout page display
document.addEventListener('DOMContentLoaded', function () {
    updateCartDisplay(); // Update cart items and subtotal
});


// Function to calculate discount based on the coupon
function calculateCouponDiscount(subtotal) {
    const appliedCoupon = localStorage.getItem('appliedCoupon');
    let discount = 0;

    // Define valid coupons and their discount percentages
    const validCoupons = {
        'SAVE10': 0.10, // 10% discount
        'SAVE20': 0.20, // 20% discount
        'FREESHIP': 5.00 // $5 discount for free shipping
    };

    // Calculate discount if a valid coupon is applied
    if (appliedCoupon && validCoupons[appliedCoupon]) {
        discount = validCoupons[appliedCoupon] === 5.00 ? validCoupons[appliedCoupon] : validCoupons[appliedCoupon] * subtotal;
    }

    return discount;
}



// Define valid coupons with discount percentages
const validCoupons = {
    'SAVE10': 0.10, // 10% discount
    'SAVE20': 0.20, // 20% discount
    'FREESHIP': 5.00 // $5 discount for free shipping
};

// Function to generate a random coupon code
function generateRandomCoupon() {
    const couponKeys = Object.keys(validCoupons);
    const randomIndex = Math.floor(Math.random() * couponKeys.length);
    return couponKeys[randomIndex];
}

// Function to display a coupon code and start the countdown
function displayRandomCoupon() {
    const couponCode = generateRandomCoupon();
    const couponElement = document.getElementById('generated-coupon-code');
    const timerElement = document.getElementById('coupon-timer');

    couponElement.textContent = `Your random coupon code is: ${couponCode}`;
    document.getElementById('coupon-input').value = couponCode;
    
    let countdown = 5;
    timerElement.textContent = `Coupon expires in: ${countdown} seconds`;

    const intervalId = setInterval(() => {
        countdown--;
        timerElement.textContent = `Coupon expires in: ${countdown} seconds`;

        if (countdown <= 0) {
            clearInterval(intervalId);
            couponElement.textContent = '';
            timerElement.textContent = '';

            // Restart the process after expiration
            setTimeout(displayRandomCoupon, 1000); // Generate a new coupon after 1 second
        }
    }, 1000);
}

// Function to apply the coupon code
function applyCoupon() {
    const couponInput = document.getElementById('coupon-input');
    const couponCode = couponInput.value.trim().toUpperCase();

    if (validCoupons[couponCode]) {
        localStorage.setItem('appliedCoupon', couponCode);
        updateCartSubtotal(); // Recalculate subtotal with discount
        alert(`Coupon "${couponCode}" applied successfully!`);
    } else {
        alert('Invalid coupon code. Please try again.');
    }
}

// Event listeners
document.getElementById('apply-coupon-btn').addEventListener('click', applyCoupon);

// Initialize the checkout page display and start coupon generation
document.addEventListener('DOMContentLoaded', function () {
    setTimeout(displayRandomCoupon, 10000); // Start displaying coupon after 10 seconds
    updateCartSubtotal(); // Ensure the subtotal and total are correctly calculated and displayed
});




// Function to display payment details based on the selected method
function displayPaymentDetails(paymentMethod) {
    const paymentDetailsDiv = document.getElementById('payment-details');

    let paymentDetailsHTML = '';

    switch (paymentMethod) {
        case 'paypal':
            paymentDetailsHTML = `
                <h3>PayPal Details</h3>
                <p>Login to your PayPal account to complete the payment.</p>
            `;
            break;
        case 'mastercard':
        case 'visa':
        case 'amex':
        case 'discover':
            paymentDetailsHTML = `
                <h3>${paymentMethod.charAt(0).toUpperCase() + paymentMethod.slice(1)} Card Details</h3>
                <label for="card-number">Card Number</label>
                <input type="text" id="card-number" placeholder="XXXX-XXXX-XXXX-XXXX" required>
                <label for="card-expiry">Expiry Date</label>
                <input type="text" id="card-expiry" placeholder="MM/YY" required>
                <label for="card-cvc">CVC</label>
                <input type="text" id="card-cvc" placeholder="XXX" required>
            `;
            break;
        case 'google-pay':
            paymentDetailsHTML = `
                <h3>Google Pay Details</h3>
                <p>Login to your Google Pay account to complete the payment.</p>
            `;
            break;
        case 'amazon-pay':
            paymentDetailsHTML = `
                <h3>Amazon Pay Details</h3>
                <p>Login to your Amazon account to complete the payment.</p>
            `;
            break;
        default:
            paymentDetailsHTML = '';
            break;
    }

    paymentDetailsDiv.innerHTML = paymentDetailsHTML;

    // Show the payment details section
    paymentDetailsDiv.style.display = paymentDetailsHTML ? 'block' : 'none';
}



function validateOrderForm() {
    const requiredFields = [
        { id: 'first-name', name: 'First Name' },
        { id: 'last-name', name: 'Last Name' },
        { id: 'street-address', name: 'Street address' },
        { id: 'town-city', name: 'Town/City' },
        { id: 'state', name: 'State' },
        { id: 'zip-code', name: 'Zip Code' },
        { id: 'phone', name: 'Phone' },
        { id: 'email', name: 'Email' },
        { id: 'country-region', name: 'Country/Region' },
    ];

    let missingFields = [];
    requiredFields.forEach((field) => {
        const fieldElement = document.getElementById(field.id);
        if (!fieldElement || fieldElement.value.trim() === '') {
            missingFields.push(`${field.name} is a required field.`);
            fieldElement.style.border = '2px solid red'; // Highlight empty fields
        } else {
            fieldElement.style.border = ''; // Remove highlight if field is filled
        }
    });

    const emailElement = document.getElementById('email');
    if (emailElement && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailElement.value)) {
        missingFields.push('Invalid email format.');
        emailElement.style.border = '2px solid red'; // Highlight invalid email
    }

    const paymentMethodSelect = document.getElementById('payment-method-select');
    if (!paymentMethodSelect || paymentMethodSelect.value === '') {
        missingFields.push('Payment method is a required field.');
        paymentMethodSelect.style.border = '2px solid red'; // Highlight the empty payment method field
    } else {
        paymentMethodSelect.style.border = ''; // Remove highlight if payment method is selected
    }

    const errorMessageDiv = document.querySelector('.Error-message');
    const errorText = document.getElementById('error-text');

    if (missingFields.length > 0) {
        errorText.innerHTML = missingFields.join('<br>');
        if (errorMessageDiv) errorMessageDiv.style.display = 'block';
        return false;
    } else {
        if (errorMessageDiv) errorMessageDiv.style.display = 'none';
        return true;
    }
}


// Add event listener to the "Place Order" button to validate the form before placing the order
document.getElementById('Place-order').addEventListener('click', function () {
    if (validateOrderForm()) {
        // Place order logic here
        alert('Order placed successfully!');
    }
});

// Ensure the DOM is fully loaded before attaching event listeners
document.addEventListener('DOMContentLoaded', function () {
    // Toggle the coupon input field when clicking the text
    const enterCoupon = document.getElementById('enter-coupon');
    const couponContainer = document.getElementById('coupon-input-container');

    enterCoupon.addEventListener('click', function () {
        console.log('Coupon input toggle clicked.'); // Debugging
        couponContainer.style.display = couponContainer.style.display === 'none' ? 'block' : 'none';
    });

    // Handle the coupon application
    document.getElementById('apply-coupon-btn').addEventListener('click', function () {
        applyCoupon();
    });

    // Handle payment method changes
    const paymentMethodSelect = document.getElementById('payment-method-select');
    if (paymentMethodSelect) {
        paymentMethodSelect.addEventListener('change', function () {
            displayPaymentDetails(paymentMethodSelect.value);
        });
    }

    // Initial cart display update
    updateCartDisplay();
});





// Clear the discount amount from localStorage after checkout
function clearCoupon() {
    localStorage.removeItem('discountAmount');
    localStorage.removeItem('appliedCoupon'); // Optionally clear applied coupon code
}

// Call clearCoupon function when appropriate (e.g., after order is placed)
document.getElementById('Place-order').addEventListener('click', function () {
    if (validateOrderForm()) {
        clearCoupon(); // Clear coupon details
        // Place order logic here
        alert('Order placed successfully!');
    }
});





// Function to handle place order
function placeOrder() {
    // Validate input fields if necessary
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const paymentMethod = document.getElementById('payment-method-select').value;

    if (!firstName || !lastName || !paymentMethod) {
        alert('Please fill out all required fields and select a payment method.');
        return;
    }

    // Perform any necessary order processing here
    // E.g., save order to a database or API

    // Hide other sections and show the confirmation section
    document.getElementById('section2').style.display = 'none'; // Hide Billing Details section
    document.getElementById('section3').style.display = 'none'; // Hide Your Order section
    document.getElementById('confirmation-section').style.display = 'block'; // Show Confirmation section

    // Optionally clear the cart or reset the form
    localStorage.removeItem('cart');
}

// Attach the function to the Place Order button
document.getElementById('Place-order').addEventListener('click', placeOrder);




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









// Attach event listener to the "Place Order" button
document.getElementById('Place-order').addEventListener('click', placeOrder);

// Attach event listener to the payment method dropdown
document.getElementById('payment-method-select').addEventListener('change', (event) => {
    displayPaymentDetails(event.target.value);
});




document.addEventListener('DOMContentLoaded', () => {
    const assistantButton = document.getElementById('assistant-button');
    const assistantPanel = document.getElementById('assistant-panel');
    const closeAssistant = document.getElementById('close-assistant');
    const startAssistant = document.getElementById('start-assistant');
    const useSavedDetailsButton = document.getElementById('use-saved-details');
    const placeOrderButton = document.getElementById('Place-order');
    const form = document.querySelector('#section2 .Billing-info'); // The form section ID

    // Show assistant panel when the button is clicked
    assistantButton.addEventListener('click', () => {
        console.log('Assistant button clicked');
        assistantPanel.style.display = 'block';
    });

    // Close assistant panel
    closeAssistant.addEventListener('click', () => {
        assistantPanel.style.display = 'none';
    });

    // Start the assistant functionality
    startAssistant.addEventListener('click', () => {
        requestUserDetails();
    });

    // Use saved user details
    useSavedDetailsButton.addEventListener('click', async () => {
        const email = prompt('Please enter your email:');
        const response = await fetch(`/api/getUser/${email}`);
        if (response.ok) {
            const userDetails = await response.json();
            fillFormFields(userDetails);
            alert('Your details have been filled. Proceeding to place the order.');
            if (validateForm()) {
                placeOrder();
            } else {
                alert('Please complete all required fields before placing the order.');
            }
        } else {
            alert('No saved details found. Please provide your details.');
        }
    });

    // Function to request user details
    async function requestUserDetails() {
        const firstName = prompt('Please enter your first name:');
        const lastName = prompt('Please enter your last name:');
        const phone = prompt('Please enter your phone number:');
        const email = prompt('Please enter your email:');
        const companyName = prompt('Please enter your company name (Optional):');
        const countryRegion = prompt('Please enter your country/region:');
        const streetAddress = prompt('Please enter your street address:');
        const streetAddress2 = prompt('Please enter your additional address information (Optional):');
        const townCity = prompt('Please enter your town/city:');
        const state = prompt('Please enter your state:');
        const zipCode = prompt('Please enter your zip code:');
        const accountNumber = prompt('Please enter your account number:');
        const cvc = prompt('Please enter your card CVC:');
        const expiryDate = prompt('Please enter your card expiry date (MM/YY):');

        if (firstName && lastName && phone && email && countryRegion && streetAddress && townCity && state && zipCode && accountNumber && cvc && expiryDate) {
            const userDetails = {
                firstName,
                lastName,
                phone,
                email,
                companyName,
                countryRegion,
                streetAddress,
                streetAddress2,
                townCity,
                state,
                zipCode,
                accountNumber,
                cvc,
                expiryDate
            };

            // Save details to the server
            await fetch('/api/saveUser', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userDetails),
            });

            fillFormFields(userDetails);

            alert('Your details have been captured. Proceeding to place the order.');
            if (validateForm()) {
                placeOrder();
            } else {
                alert('Please complete all required fields before placing the order.');
            }
        } else {
            alert('Please provide all required details.');
        }
    }

    // Function to fill the form fields
    function fillFormFields(details) {
        document.getElementById('first-name').value = details.firstName;
        document.getElementById('last-name').value = details.lastName;
        document.getElementById('phone').value = details.phone;
        document.getElementById('email').value = details.email;
        document.getElementById('company-name').value = details.companyName || '';
        document.getElementById('country-region').value = details.countryRegion;
        document.getElementById('street-address').value = details.streetAddress;
        document.getElementById('street-address-2').value = details.streetAddress2 || '';
        document.getElementById('town-city').value = details.townCity;
        document.getElementById('state').value = details.state;
        document.getElementById('zip-code').value = details.zipCode;
        document.getElementById('account-number').value = details.accountNumber;
        document.getElementById('cvc').value = details.cvc;
        document.getElementById('expiry-date').value = details.expiryDate;
    }

    // Function to validate form
    function validateForm() {
        const requiredFields = form.querySelectorAll('input[required], select[required]');
        for (const field of requiredFields) {
            if (!field.value) {
                return false;
            }
        }
        return true;
    }

    // Function to handle the order placement
    function placeOrder() {
        alert('Order placed successfully. Check your confirmation.');
        document.getElementById('confirmation-section').style.display = 'block';
    }

    // Attach event listener to the payment method dropdown
    document.getElementById('payment-method-select').addEventListener('change', (event) => {
        displayPaymentDetails(event.target.value);
    });
});






// Function to update cart subtotal and total
function updateCartSubtotal() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let subtotal = 0;

    cart.forEach(item => {
        subtotal += item.price * item.quantity;
    });

    const discountAmount = calculateCouponDiscount(subtotal);

    // Store the discount amount and total in localStorage
    localStorage.setItem('discountAmount', discountAmount);

    const total = subtotal - discountAmount;
    localStorage.setItem('totalAmount', total);

    document.getElementById('subtotal-amount').textContent = `Subtotal: $${subtotal.toFixed(2)}`;
    document.getElementById('discount-amount').textContent = `Discount: -$${discountAmount.toFixed(2)}`;
    document.getElementById('total-amount').textContent = `Total: $${total.toFixed(2)}`;

    updateSecondSectionSubtotal(total);
}

// PayPal button configuration
paypal.Buttons({
    createOrder: function(data, actions) {
        // Retrieve the total from localStorage
        const total = parseFloat(localStorage.getItem('totalAmount')) || 0;
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: total.toFixed(2)  // Use the stored total amount
                }
            }]
        });
    },
    onApprove: function(data, actions) {
        return actions.order.capture().then(function(details) {
            alert('Transaction completed by ' + details.payer.name.given_name);
            // Optionally, redirect the user or update your server with the transaction details
        });
    },
    onError: function(err) {
        console.error('PayPal Checkout Error:', err);
        alert('An error occurred during the PayPal Checkout.');
    }
}).render('#paypal-button-container'); // Render the PayPal button into the container

// Call updateCartSubtotal to initialize values
updateCartSubtotal();
 

