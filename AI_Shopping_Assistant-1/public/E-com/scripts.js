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





// Event listener to handle size selection
document.querySelectorAll('.measurement-box').forEach(button => {
    button.addEventListener('click', function () {
        // Remove 'selected' class from all size buttons in the current product
        this.closest('.measurements').querySelectorAll('.measurement-box').forEach(btn => btn.classList.remove('selected'));
        // Add 'selected' class to the clicked button
        this.classList.add('selected');
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


const products = [
    {
      name: "BohemianRhapsodyAttire",
      type: "Casual",
      image: "/background/models/Display-model-1.jpg",
      price: "$145.50",
      link: "/purchase-page-1?product=BohemianRhapsodyAttire"
    },
    {
      name: "MidnightGalaMaxiDress",
      type: "Evening Dresses",
      image: "/background/models/Display-model-2.jpg",
      price: "$175.00",
      link: "/purchase-page-2?product=MidnightGalaMaxiDress"
    },
    {
      name: "PowerSuitEnsemble",
      type: "Casual",
      image: "/background/models/Display-model-3.jpg",
      price: "$125.00",
      link: "/purchase-page-3?product=PowerSuitEnsemble"
    },
    {
      name: "ProfessionalPinestripBlazer",
      type: "Activewear",
      image: "/background/models/Display-model-4.jpg",
      price: "$109.99",
      link: "/purchase-page-4?product=ProfessionalPinestripBlazer"
    },
    {
      name: "TimelessClassicCollection",
      type: "Work & Office",
      image: "/background/models/Display-model-5.jpg",
      price: "$124.90",
      link: "/purchase-page-5?product=TimelessClassicCollection"
    },
    {
      name: "RelaxedFitJogger",
      type: "Work & Office",
      image: "/background/models/Display-model-7.jpg",
      price: "$250.00",
      link: "/purchase-page-6?product=RelaxedFitJogger"
    },
    {
      name: "UrbanChicEnsemble",
      type: "Evening Dresses",
      image: "/background/models/Display-model-10.jpg",
      price: "$224.95",
      link: "/purchase-page-7?product=UrbanChicEnsemble"
    },
    {
      name: "WeekendWanderlustWardrobe",
      type: "Activewear",
      image: "/background/models/Display-model-11.jpg",
      price: "$119.95",
      link: "/purchase-page-8?product=WeekendWanderlustWardrobe"
    }
  ];


// Select the bag icon and sidebar elements
const cartIcon = document.querySelector('.cart-bag-icon');
const sidebar = document.getElementById('sidebar');
const closeSidebarButton = document.getElementById('close-sidebar');

// Toggle sidebar visibility when the bag icon is clicked
cartIcon.addEventListener('click', () => {
  sidebar.classList.add('visible'); // Show sidebar by adding the visible class
});

// Hide the sidebar when the close button is clicked
closeSidebarButton.addEventListener('click', () => {
  sidebar.classList.remove('visible'); // Hide sidebar by removing the visible class
});












if ('webkitSpeechRecognition' in window) {
  const recognition = new webkitSpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = 'en-US';

  // Create the voice command button as the anime avatar
  const startVoiceButton = document.createElement('div');
  startVoiceButton.className = 'voice-command-avatar';
  startVoiceButton.id = 'voice-avatar'; // Set the ID
  startVoiceButton.style.position = 'absolute'; // Ensure it's positionable
  startVoiceButton.style.left = '20px'; // Initial position
  startVoiceButton.style.top = '20px'; // Initial position
 
  document.body.appendChild(startVoiceButton);

  // Dragging functionality
  const voiceAvatar = document.getElementById('voice-avatar');
  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  // Mouse down event to start dragging
  voiceAvatar.addEventListener('mousedown', (event) => {
    isDragging = true;
    offsetX = event.clientX - voiceAvatar.getBoundingClientRect().left;
    offsetY = event.clientY - voiceAvatar.getBoundingClientRect().top;
    voiceAvatar.style.cursor = 'grabbing'; // Change cursor when dragging starts
  });

  // Mouse move event to track mouse position and move the avatar
  document.addEventListener('mousemove', (event) => {
    if (isDragging) {
      let xPos = event.clientX - offsetX;
      let yPos = event.clientY - offsetY;

      // Ensure the avatar stays within the viewport
      const avatarWidth = voiceAvatar.offsetWidth;
      const avatarHeight = voiceAvatar.offsetHeight;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      // Limit to window edges
      if (xPos < 0) xPos = 0;
      if (yPos < 0) yPos = 0;
      if (xPos + avatarWidth > windowWidth) xPos = windowWidth - avatarWidth;
      if (yPos + avatarHeight > windowHeight) yPos = windowHeight - avatarHeight;

      voiceAvatar.style.left = `${xPos}px`;
      voiceAvatar.style.top = `${yPos}px`;
    }
  });

  // Mouse up event to stop dragging
  document.addEventListener('mouseup', () => {
    isDragging = false;
    voiceAvatar.style.cursor = 'grab'; // Change cursor back when dragging stops
  });

  // Start the speech recognition when the avatar is clicked
  voiceAvatar.addEventListener('click', () => {
    recognition.start();
  });

  recognition.onresult = function (event) {
    const transcript = event.results[0][0].transcript.toLowerCase();
    console.log(`Voice command received: ${transcript}`);

    // Navigation commands
    if (transcript.includes('home')) {
      window.location.href = '/';
    } else if (transcript.includes('shop')) {
      window.location.href = '/shop';
    } else if (transcript.includes('one') || transcript.includes('purchase page 1')) {
      window.location.href = '/purchase-page-1';
    } else if (transcript.includes('two') || transcript.includes('purchase page 2')) {
      window.location.href = '/purchase-page-2';
    } else if (transcript.includes('three') || transcript.includes('purchase page 3')) {
      window.location.href = '/purchase-page-3';
    } else if (transcript.includes('four') || transcript.includes('purchase page 4')) {
      window.location.href = '/purchase-page-4';
    } else if (transcript.includes('five') || transcript.includes('purchase page 5')) {
      window.location.href = '/purchase-page-5';
    } else if (transcript.includes('six') || transcript.includes('purchase page 6')) {
      window.location.href = '/purchase-page-6';
    } else if (transcript.includes('seven') || transcript.includes('purchase page 7')) {
      window.location.href = '/purchase-page-7';
    } else if (transcript.includes('eight') || transcript.includes('purchase page 8')) {
      window.location.href = '/purchase-page-8';
    } else if (transcript.includes('contact us')) {
      window.location.href = '/contact-us';
    } else if (transcript.includes('view cart')) {
      window.location.href = '/view-cart';
    } else if (transcript.includes('checkout')) {
      window.location.href = '/checkout';
    } else if (transcript.includes('about us')) {
      window.location.href = '/about-us';
    } else {
      alert('Command not recognized. Try saying: Home, Shop, Purchase Page 1-8, Contact Us, View Cart, Checkout, or About Us.');
    }
  };

  recognition.onerror = function (event) {
    console.error('Speech recognition error detected: ', event.error);
  };

  // Voice Command Logic (Microphone activation & ripple effect)
  const avatarImg = document.getElementById('avatar-img');
  const rippleEffect = document.querySelector('.ripple-effect');

  function startListening() {
    avatarImg.style.transform = 'scale(1.1)'; // Scale effect when listening
    rippleEffect.style.display = 'block';     // Show ripple effect
  }

  function stopListening() {
    avatarImg.style.transform = 'scale(1)';  // Reset scale effect
    rippleEffect.style.display = 'none';     // Hide ripple effect
  }

  // Trigger listening effect for demo purposes
  avatarImg.addEventListener('click', () => {
    startListening();
    setTimeout(stopListening, 2000); // Simulates listening duration
  });
} else {
  alert('Sorry, your browser does not support speech recognition.');
}
