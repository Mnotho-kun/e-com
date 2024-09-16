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