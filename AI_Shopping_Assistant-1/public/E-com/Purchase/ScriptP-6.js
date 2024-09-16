document.addEventListener("DOMContentLoaded", function () {
    const zoomImage = document.querySelector(".zoom-image");
    const magnifier = document.querySelector(".magnifier");
    const modelImage = document.querySelector(".model-image");
  
    zoomImage.addEventListener("mousemove", function (e) {
      const imageRect = modelImage.getBoundingClientRect();
      const magnifierSize = magnifier.offsetWidth / 2;
  
      // Calculate the position of the cursor inside the image
      const x = e.clientX - imageRect.left;
      const y = e.clientY - imageRect.top;
  
      // Display and position the magnifier
      magnifier.style.display = "block";
      magnifier.style.left = `${x - magnifierSize}px`;
      magnifier.style.top = `${y - magnifierSize}px`;
  
      // Set the background properties to create the zoom effect
      magnifier.style.backgroundImage = `url(${modelImage.src})`;
      magnifier.style.backgroundSize = `${modelImage.width * 2}px ${modelImage.height * 2}px`; // Adjust zoom level here
      magnifier.style.backgroundPosition = `-${x * 2 - magnifierSize}px -${y * 2 - magnifierSize}px`; // Adjust for the zoom scale
    });
  
    zoomImage.addEventListener("mouseleave", function () {
      magnifier.style.display = "none"; // Hide magnifier when not hovering
    });
  });


  document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart array and other variables
    let cart = [];
    let quantity = 1; // Default to 1
    const basePrice = 250.00;
    
    // Predefined color categories
    const blueGreenColors = [
        '#0000FF', '#008000', '#00FFFF', '#0000A0', '#008080'
        // Add more blue and green shades here
    ];
    const yellowPinkColors = [
        '#FFFF00', '#FFC0CB', '#FF69B4', '#FF6347'
        // Add more yellow and pink shades here
    ];

    // Get references to the elements
    const minusButton = document.getElementById('minus');
    const plusButton = document.getElementById('plus');
    const quantityInput = document.getElementById('quantity');
    const addToCartButton = document.querySelector('.add-to-cart');
    const cartCount = document.getElementById('cart-count');
    const viewCartButton = document.querySelector('.view-cart');
    const colorPicker = document.getElementById('color-picker');
    const sizeButtons = document.querySelectorAll('.measurement-box');

    // Function to get price adjustment based on size
    function getPriceAdjustment(size) {
        switch (size) {
            case 'M': return 10;
            case 'L': return 20;
            case 'XL': return 30;
            default: return 0;
        }
    }

    // Function to update the price based on color and size selection
    function updatePrice() {
        let sizePriceIncrease = parseInt(document.querySelector('.measurement-box.selected')?.dataset.priceIncrease || 0, 10);
        const colorPickerValue = colorPicker.value.toUpperCase();

        let finalPrice = basePrice + sizePriceIncrease;

        if (blueGreenColors.includes(colorPickerValue)) {
            finalPrice += 10;
        } else if (yellowPinkColors.includes(colorPickerValue)) {
            finalPrice += 20;
        }

        document.getElementById('price-increase').innerHTML = `<b>$${finalPrice.toFixed(2)}</b>`;
    }

    // Function to update the quantity
    function updateQuantity(newQuantity) {
        quantity = Math.max(1, newQuantity); // Ensure quantity is at least 1
        quantityInput.value = quantity; // Update the input field
    }

    // Function to update the cart count display
    function updateCartDisplay() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
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
        }
    }

    // Function to add item to the cart
    function addToCart(productId, productName, productPrice, productImage, productSize) {
        const sizeAdjustment = getPriceAdjustment(productSize);
        const adjustedPrice = productPrice + sizeAdjustment;

        const existingItem = cart.find(item => item.productId === productId && item.size === productSize);
        if (existingItem) {
            existingItem.quantity += quantity; // Increase quantity if already in cart
        } else {
            cart.push({
                productId: productId,
                name: productName,
                price: adjustedPrice,
                image: productImage,
                size: productSize,
                quantity: quantity
            });
        }
        saveCartToLocalStorage(); // Save the updated cart to localStorage
        updateCartDisplay(); // Update cart count display
        triggerCartUpdate(); // Notify other pages that the cart has been updated
    }

    // Function to trigger a custom event when the cart is updated
    function triggerCartUpdate() {
        localStorage.setItem('cartUpdated', Date.now()); // Update a timestamp to notify the change
    }

    // Function to remove item from the cart
    function removeFromCart(productId, productSize) {
        cart = cart.filter(item => !(item.productId === productId && item.size === productSize));
        saveCartToLocalStorage(); // Save the updated cart to localStorage
        updateCartDisplay(); // Update cart count display
        triggerCartUpdate(); // Notify other pages that the cart has been updated
    }

    // Event listener for the minus button
    minusButton.addEventListener('click', function() {
        updateQuantity(quantity - 1);
    });

    // Event listener for the plus button
    plusButton.addEventListener('click', function() {
        updateQuantity(quantity + 1);
    });

    // Event listener for size buttons
    sizeButtons.forEach(button => {
        button.addEventListener('click', function() {
            sizeButtons.forEach(btn => btn.classList.remove('selected'));
            this.classList.add('selected');
            updatePrice();
        });
    });

    // Event listener for color picker
    colorPicker.addEventListener('input', updatePrice);
    updatePrice(); // Initial price update

    // Event listener for add-to-cart button
    addToCartButton.addEventListener('click', function() {
        const productImage = document.querySelector('.model-image').src;
        const productName = document.querySelector('.clothing-info p').textContent;
        const productPrice = parseFloat(document.getElementById('price-increase').textContent.replace('$', ''));
        const selectedSizeElement = document.querySelector('.measurement-box.selected');
        const productSize = selectedSizeElement ? selectedSizeElement.textContent : 'S';
        const productId = 'uniqueProductId'; // Replace with actual ID

        addToCart(productId, productName, productPrice, productImage, productSize);
    });

    // Event listener for view cart button
    viewCartButton.addEventListener('click', function() {
        window.location.href = '/view-cart'; // Redirect to the View Cart page
    });

    // Event listener for "Add to Cart" icons
    document.querySelectorAll('.bag-handle').forEach(icon => {
        icon.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default behavior if it's a link
            const productElement = this.closest('li');
            const productId = productElement.getAttribute('data-popularity'); // Use data-popularity for ID
            const productName = this.getAttribute('data-item-name');
            const productPrice = parseFloat(productElement.getAttribute('data-price'));
            const productImage = productElement.querySelector('.model-wrapper img').src;
            const selectedSizeElement = productElement.querySelector('.measurement-box.selected');
            const productSize = selectedSizeElement ? selectedSizeElement.textContent : 'S';

            addToCart(productId, productName, productPrice, productImage, productSize);
        });
    });

    // Load cart from localStorage on page load
    loadCartFromLocalStorage();
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


function toggleDescription1() {
    // Get both elements
    const descriptionInfo = document.getElementById('description-info');
    const additionalInfo = document.querySelector('.additional-info-2');
    const reviewsInfo = document.querySelector('.Reviews-info-3');

    // Check if description-info is already visible
    if (descriptionInfo.style.display === 'block') {
        // Hide description-info if it's already visible
        descriptionInfo.style.display = 'none';
    } else {
        // Hide additional-info-2 and reviews-info, and show description-info
        additionalInfo.style.display = 'none';
        reviewsInfo.style.display = 'none';
        descriptionInfo.style.display = 'block';
    }
}

function toggleDescription2() {
    // Get both elements
    const descriptionInfo = document.getElementById('description-info');
    const additionalInfo = document.querySelector('.additional-info-2');
    const reviewsInfo = document.querySelector('.Reviews-info-3');

    // Check if additional-info-2 is already visible
    if (additionalInfo.style.display === 'block') {
        // Hide additional-info if it's already visible
        additionalInfo.style.display = 'none';
    } else {
        // Hide description-info and reviews-info, and show additional-info
        descriptionInfo.style.display = 'none';
        reviewsInfo.style.display = 'none';
        additionalInfo.style.display = 'block';
    }
}

function toggleDescription3() {
    // Get both elements
    const descriptionInfo = document.getElementById('description-info');
    const additionalInfo = document.querySelector('.additional-info-2');
    const reviewsInfo = document.querySelector('.Reviews-info-3');

    // Check if reviewsInfo is already visible
    if (reviewsInfo.style.display === 'block') {
        // Hide reviewsInfo if it's already visible
        reviewsInfo.style.display = 'none';
    } else {
        // Hide description-info and additional-info, and show reviewsInfo
        descriptionInfo.style.display = 'none';
        additionalInfo.style.display = 'none';
        reviewsInfo.style.display = 'block';
    }
}





// STAR RATING
document.addEventListener('DOMContentLoaded', () => {
    const stars = document.querySelectorAll('.rating-stars i');
    let currentRating = 0;

    stars.forEach(star => {
        star.addEventListener('mouseover', () => {
            const value = parseInt(star.getAttribute('data-value'), 10);
            highlightStars(value);
        });

        star.addEventListener('mouseout', () => {
            highlightStars(currentRating);
        });

        star.addEventListener('click', () => {
            currentRating = parseInt(star.getAttribute('data-value'), 10);
            highlightStars(currentRating);
        });
    });

    function highlightStars(rating) {
        stars.forEach(star => {
            const value = parseInt(star.getAttribute('data-value'), 10);
            if (value <= rating) {
                star.classList.add('hovered');
            } else {
                star.classList.remove('hovered');
            }
        });
    }
});


// Description Name
document.addEventListener('DOMContentLoaded', () => {
    // Select the elements
    const clothingInfoParagraph = document.querySelector('.clothing-info p');
    const reviewPlaceholder = document.getElementById('review-placeholder');

    // Extract the product name from the clothing-info section
    const productName = clothingInfoParagraph.textContent.trim();

    // Update the review placeholder with the product name
    reviewPlaceholder.innerHTML = `Be the first to review "<strong>${productName}</strong>"`;
});




// SUBMIT REVIEWS & VIEW REVIEWS

// Global array to store reviews with their timestamps
let reviews = [];

// Handle form submission
document.getElementById("review-form").addEventListener("submit", function (e) {
  e.preventDefault();

  // Get values from the form
  const name = document.getElementById("review-name").value;
  const reviewText = document.getElementById("review-textarea").value;
  const starRating = document.querySelectorAll(".rating-stars .fa-star.selected").length;
  const timestamp = new Date(); // Capture the current time of submission

  // Create a review object and push it to the reviews array
  const review = {
    name: name,
    text: reviewText,
    rating: starRating,
    timestamp: timestamp,
  };

  reviews.push(review);

  // Update the reviews section
  updateReviews();

  // Clear the form
  document.getElementById("review-form").reset();
});

// Function to update the reviews list in the DOM
function updateReviews() {
  const reviewsList = document.getElementById("reviews-list");
  reviewsList.innerHTML = ""; // Clear the current reviews

  reviews.forEach((review) => {
    // Create the review item element
    const reviewItem = document.createElement("li");
    reviewItem.classList.add("review-box");

    // Profile picture (placeholder for now)
    const profilePic = document.createElement("img");
    profilePic.src = "https://via.placeholder.com/50"; // Placeholder image
    profilePic.alt = "Profile Picture";
    profilePic.classList.add("pfp");

    // Review content container
    const reviewContent = document.createElement("div");
    reviewContent.classList.add("review-content");

    // Reviewer name
    const reviewerName = document.createElement("p");
    reviewerName.classList.add("review-name");
    reviewerName.textContent = review.name;

    // Star ratings
    const stars = document.createElement("div");
    stars.classList.add("review-stars");
    for (let i = 0; i < review.rating; i++) {
      const star = document.createElement("i");
      star.classList.add("fa-solid", "fa-star");
      stars.appendChild(star);
    }

    // Review text
    const reviewParagraph = document.createElement("p");
    reviewParagraph.classList.add("review-text");
    reviewParagraph.textContent = review.text;

    // Append everything to the review content
    reviewContent.appendChild(reviewerName);
    reviewContent.appendChild(stars);
    reviewContent.appendChild(reviewParagraph);

    // Append profile picture and content to the review item
    reviewItem.appendChild(profilePic);
    reviewItem.appendChild(reviewContent);

    // Add the new review to the list
    reviewsList.appendChild(reviewItem);
  });

  // Update review count
  const reviewCount = document.getElementById("review-count");
  reviewCount.textContent = reviews.length;
}

// Sorting functionality for the buttons
document.getElementById("sort-new-old").addEventListener("click", function () {
  // Sort reviews from newest to oldest
  reviews.sort((a, b) => b.timestamp - a.timestamp);
  updateReviews();
});

document.getElementById("sort-old-new").addEventListener("click", function () {
  // Sort reviews from oldest to newest
  reviews.sort((a, b) => a.timestamp - b.timestamp);
  updateReviews();
});

// Handling star selection for rating
document.querySelectorAll(".rating-stars .fa-star").forEach((star) => {
  star.addEventListener("click", function () {
    // Remove 'selected' class from all stars
    document.querySelectorAll(".rating-stars .fa-star").forEach((s) => {
      s.classList.remove("selected");
    });

    // Add 'selected' class up to the clicked star
    this.classList.add("selected");
    let prevStar = this.previousElementSibling;
    while (prevStar) {
      prevStar.classList.add("selected");
      prevStar = prevStar.previousElementSibling;
    }
  });
});




// Mockup data for products (Replace with actual data source)
// Mockup data for products (Replace with actual data source)
  // Data for products
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


  
  // Function to get query parameter
  function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }

  // Function to update product details
  function updateProductDetails() {
    const productName = getQueryParam('product');
    const currentProduct = products.find(product => product.name === productName);

    if (currentProduct) {
      // Update the main product image
      const modelImage = document.querySelector('.model-image');
      if (modelImage) {
        modelImage.src = currentProduct.image;
      }

      // Update the price and other details
      const priceElement = document.getElementById('price-increase');
      if (priceElement) {
        priceElement.innerHTML = `<b>${currentProduct.price}</b>`;
      }

      // Populate related products
      populateRelatedProducts(currentProduct.type);
    }
  }

  // Function to populate related products
  function populateRelatedProducts(type) {
    const relatedProductsList = document.getElementById('related-products-list');
    if (!relatedProductsList) return;

    // Filter products by type
    const relatedProducts = products.filter(product => product.type === type);

    // Clear existing products
    relatedProductsList.innerHTML = '';

    // Create and append each related product
    relatedProducts.forEach(product => {
      const productItem = document.createElement('li');

      const imageContainer = document.createElement('div');
      imageContainer.classList.add('image-container');

      const anchor = document.createElement('a');
      anchor.href = product.link;

      const modelWrapper = document.createElement('div');
      modelWrapper.classList.add('model-wrapper');

      const img = document.createElement('img');
      img.src = product.image;
      img.alt = product.name;

      modelWrapper.appendChild(img);
      anchor.appendChild(modelWrapper);
      imageContainer.appendChild(anchor);

      const price = document.createElement('p');
      price.innerHTML = `<b>${product.price}</b>`;

      productItem.appendChild(imageContainer);
      productItem.appendChild(price);

      relatedProductsList.appendChild(productItem);
    });
  }

  // Initialize product details and related products
  window.addEventListener('DOMContentLoaded', updateProductDetails);
  
  


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

