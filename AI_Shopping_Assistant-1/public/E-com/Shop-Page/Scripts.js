document.addEventListener("DOMContentLoaded", function () {
  const productList = document.querySelector(".product-list");
  const sortDropdown = document.getElementById("sortDropdown");
  const cartCountElement = document.getElementById("cart-count"); // Select the cart count element
  let cartCount = 0; // Initialize cart count

  // Store the original order of the products
  const originalOrder = Array.from(productList.children);

  // Sorting logic (keeping your original sorting function)
  sortDropdown.addEventListener("change", function () {
    const sortValue = this.value;
    const products = Array.from(productList.children);

    let sortedProducts;

    switch (sortValue) {
      case "priceLowHigh":
        sortedProducts = products.sort((a, b) => parseFloat(a.dataset.price) - parseFloat(b.dataset.price));
        break;
      case "priceHighLow":
        sortedProducts = products.sort((a, b) => parseFloat(b.dataset.price) - parseFloat(a.dataset.price));
        break;
      case "latest":
        sortedProducts = products.sort((a, b) => new Date(b.dataset.date) - new Date(a.dataset.date));
        break;
      case "averageRating":
        sortedProducts = products.sort((a, b) => parseFloat(b.dataset.rating) - parseFloat(a.dataset.rating));
        break;
      case "popularity":
        sortedProducts = products.sort((a, b) => parseInt(b.dataset.popularity) - parseInt(a.dataset.popularity));
        break;
      default:
        sortedProducts = originalOrder;
        break;
    }

    productList.innerHTML = "";
    sortedProducts.forEach((product) => productList.appendChild(product));
  });

  // Add to cart logic
  const addToCartIcons = document.querySelectorAll(".product-list .bag-handle");

  addToCartIcons.forEach((icon) => {
    icon.addEventListener("click", function () {
      cartCount++; // Increment cart count
      cartCountElement.textContent = cartCount; // Update the cart count in the DOM
    });
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

function updateCart(itemName, itemCount) {
  const cartMessage = document.getElementById('cart-message');
  const message = `${itemCount} "${itemName}" have been added to your cart.`;
  cartMessage.textContent = message;
}

// Event listener for adding an item to the cart
function addItemToCart(itemName, itemCount) {
  updateCart(itemName, itemCount);
}

// Example of adding an item to the cart (you can call this function when an item is added)
addItemToCart('Item Name', 3); // Adjust the item name and count as needed

// Redirect to cart page on button click
document.getElementById('view-cart-button').addEventListener('click', function() {
  window.location.href = '/view-cart'; // Redirect to your cart page
});



// LIST ITEMS
document.addEventListener('DOMContentLoaded', function() {
  let itemCounts = {}; // Object to track item counts

  // Function to update the cart message and list
  function updateCart(itemName) {
      const cartMessage = document.getElementById('cart-message');
      const cartList = document.getElementById('cart-list');

      // Update cart message
      const count = itemCounts[itemName] || 0;
      const message = `${count} "${itemName}" have been added to your cart.`;
      cartMessage.textContent = message;

      // Update cart list
      const listItem = Array.from(cartList.children).find(li => li.textContent.includes(itemName));
      if (listItem) {
          listItem.textContent = `${itemName}: ${itemCounts[itemName]}`;
      } else {
          const newListItem = document.createElement('li');
          newListItem.textContent = `${itemName}: ${itemCounts[itemName]}`;
          cartList.appendChild(newListItem);
      }
  }

  // Function to handle bag icon clicks
  function handleBagClick(event) {
      const icon = event.target;
      if (icon.classList.contains('bag-handle')) {
          const itemName = icon.dataset.itemName;
          itemCounts[itemName] = (itemCounts[itemName] || 0) + 1;
          updateCart(itemName);
      }
  }

  // Add event listener to all bag icons
  document.querySelectorAll('.bag-handle').forEach(icon => {
      icon.addEventListener('click', handleBagClick);
  });

  // Redirect to cart page on button click
  document.getElementById('view-cart-button').addEventListener('click', function() {
      window.location.href = '/view-cart'; // Redirect to your cart page
  });
});





// Event listener to open and update the sidebar when the cart icon is clicked
document.querySelector('.cart-icon-container').addEventListener('click', function () {
  const sidebar = document.getElementById('sidebar');
  sidebar.style.display = 'block'; // Show the sidebar
  updateCartSidebar(); // Update the sidebar content with cart items
});

// Event listener to close the sidebar when the close button is clicked
document.getElementById('close-sidebar').addEventListener('click', function () {
  const sidebar = document.getElementById('sidebar');
  sidebar.style.display = 'none'; // Hide the sidebar
});


// Call this function on page load to populate the cart
document.addEventListener('DOMContentLoaded', () => {
  loadCartFromLocalStorage();

  // Cart icon click event to show the sidebar
  document.querySelector('.cart-icon-container').addEventListener('click', function () {
      const sidebar = document.getElementById('sidebar');
      sidebar.style.right = '0'; // Show the sidebar
      updateCartSidebar(); // Update the sidebar content with cart items and subtotal
  });

  // Sidebar close button event
  document.getElementById('close-sidebar').addEventListener('click', function () {
      const sidebar = document.getElementById('sidebar');
      sidebar.style.right = '-400px'; // Hide the sidebar
  });
});


// Function to store cart in localStorage
function saveCartToLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to load cart from localStorage
function loadCartFromLocalStorage() {
  const savedCart = localStorage.getItem('cart');
  if (savedCart) {
      cart = JSON.parse(savedCart);
      updateCartDisplay();
      updateCartSidebar();
  }
}




let cart = [];

// Function to calculate the price adjustment based on size
function getPriceAdjustment(size) {
    switch (size) {
        case 'M': return 10; // $10 more than S
        case 'L': return 20; // $20 more than S, $10 more than M
        case 'XL': return 30; // $30 more than S, $20 more than M, $10 more than L
        default: return 0; // S or any other size not listed
    }
}

// Function to add item to the cart
function addToCart(productId, productName, productPrice, productImage, productSize) {
    const sizeAdjustment = getPriceAdjustment(productSize);
    const adjustedPrice = productPrice + sizeAdjustment;

    console.log(`Adding item with ID: ${productId} and size: ${productSize}`);

    // Check if the item with the same product ID and size already exists in the cart
    const existingItem = cart.find(item => item.productId === productId && item.size === productSize);
    if (existingItem) {
        existingItem.quantity += 1; // Increase quantity if already in cart
    } else {
        // Add new item to cart
        cart.push({
            productId: productId,
            name: productName,
            price: adjustedPrice,
            image: productImage,
            size: productSize,
            quantity: 1
        });
    }
    updateCartDisplay();
   
    saveCartToLocalStorage(); // Save the updated cart to localStorage
    triggerCartUpdate(); // Notify other pages that the cart has been updated
}

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

// Function to trigger a custom event when the cart is updated
function triggerCartUpdate() {
    localStorage.setItem('cartUpdated', Date.now()); // Update a timestamp to notify the change
}

// Add event listener to listen for updates from other pages
window.addEventListener('storage', (event) => {
    if (event.key === 'cartUpdated') {
        loadCartFromLocalStorage(); // Reload the cart if it's updated
        updateCartDisplay(); // Update the cart display
    }
});



// Function to remove item from the cart
function removeFromCart(productId, productSize) {
    console.log(`Removing item with ID: ${productId} and size: ${productSize}`);
    cart = cart.filter(item => !(item.productId === productId && item.size === productSize));
    saveCartToLocalStorage(); // Save the updated cart to localStorage
    updateCartDisplay(); // Update cart count display
    updateCartSidebar(); // Update the sidebar display
    triggerCartUpdate(); // Notify other pages that the cart has been updated
}
// Function to update the cart count display
function updateCartDisplay() {
    const cartCountElement = document.getElementById('cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElement.textContent = totalItems;
}

// Function to update the sidebar with cart items and subtotal
function updateCartSidebar() {
    const sidebar = document.getElementById('cart-sidebar'); // Ensure this matches the HTML ID
    const subtotalElement = document.getElementById('subtotal-amount'); // Element for displaying subtotal

    sidebar.innerHTML = ''; // Clear the sidebar before updating

    let subtotal = 0; // Initialize subtotal

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        // Create HTML structure for each cart item
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <p class="cart-item-name">${item.name}</p>
                <p class="cart-item-size">Size: ${item.size}</p>
                <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                <p class="cart-item-quantity">Quantity: ${item.quantity}</p>
            </div>
            <i class="fa-solid fa-xmark remove-icon" data-product-id="${item.productId}" data-product-size="${item.size}"></i>
        `;

        sidebar.appendChild(cartItem);

        // Calculate subtotal
        subtotal += item.price * item.quantity;
    });

    // Update the subtotal display
    subtotalElement.textContent = subtotal.toFixed(2);

    // Add event listeners to remove icons
    document.querySelectorAll('.remove-icon').forEach(icon => {
        icon.addEventListener('click', function () {
            const productId = this.getAttribute('data-product-id');
            const productSize = this.getAttribute('data-product-size');
            removeFromCart(productId, productSize);
        });
    });
}

// Event listener for "Add to Cart" icons
document.querySelectorAll('.bag-handle').forEach(icon => {
    icon.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent default behavior if it's a link
        const productElement = this.closest('li'); // Find the closest parent <li> with product data
        const productId = productElement.getAttribute('data-popularity'); // Use data-popularity for ID
        const productName = this.getAttribute('data-item-name');
        const productPrice = parseFloat(productElement.getAttribute('data-price'));
        const productImage = productElement.querySelector('.model-wrapper img').src;

        // Retrieve selected size
        const selectedSize = productElement.querySelector('.measurement-box.selected');
        const productSize = selectedSize ? selectedSize.textContent : 'S'; // Default to 'S' if no size is selected

        addToCart(productId, productName, productPrice, productImage, productSize); // Call function to add to cart
    });
});

// Event listener to handle size selection
document.querySelectorAll('.measurement-box').forEach(button => {
    button.addEventListener('click', function () {
        // Remove 'selected' class from all size buttons in the current product
        this.closest('.measurements').querySelectorAll('.measurement-box').forEach(btn => btn.classList.remove('selected'));
        // Add 'selected' class to the clicked button
        this.classList.add('selected');
    });
});

// Function to store cart in localStorage
function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to load cart from localStorage
function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartDisplay();
        updateCartSidebar();
    }
}

// Call this function on page load to populate the cart
document.addEventListener('DOMContentLoaded', () => {
    loadCartFromLocalStorage();

    // Cart icon click event to show the sidebar
    document.querySelector('.cart-icon-container').addEventListener('click', function () {
        const sidebar = document.getElementById('sidebar');
        sidebar.style.right = '0'; // Show the sidebar
        updateCartSidebar(); // Update the sidebar content with cart items and subtotal
    });

    // Sidebar close button event
    document.getElementById('close-sidebar').addEventListener('click', function () {
        const sidebar = document.getElementById('sidebar');
        sidebar.style.right = '-400px'; // Hide the sidebar
    });
});

