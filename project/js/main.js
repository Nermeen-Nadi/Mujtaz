// DOM Elements
const currentPlansBtn = document.getElementById('currentPlansBtn');
const availablePlansBtn = document.getElementById('availablePlansBtn');
const browsePlansBtn = document.getElementById('browsePlansBtn');
const currentPlansContent = document.getElementById('currentPlansContent');
const availablePlansContent = document.getElementById('availablePlansContent');
const activePlansContent = document.getElementById('activePlansContent');
const paymentModal = document.getElementById('paymentModal');
const logoutConfirmationModal = document.getElementById('logoutConfirmationModal');
const logoutBtn = document.getElementById('logoutBtn');
const mobileMenuBtn = document.querySelector('.menu-btn');
const sidebar = document.querySelector('.sidebar');
const closeModalBtns = document.querySelectorAll('.close-modal');
const cancelBtn = document.querySelector('.cancel-btn');
const confirmBtn = document.querySelector('.confirm-btn');
const subscribeButtons = document.querySelectorAll('.subscribe-btn');

// Current state
let hasActiveSubscriptions = false; // Set to true if the user has active subscriptions

// Initialize active tab highlighting in sidebar
const initSidebar = () => {
    const currentPath = window.location.pathname.split('/').pop();
    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href && (href === currentPath || (currentPath === '' && href === 'index.html'))) {
            link.parentElement.classList.add('active');
        } else {
            link.parentElement.classList.remove('active');
        }
    });
};

// Tab Switching Logic
const switchToTab = (tabName) => {
    // Reset all tabs
    currentPlansBtn.classList.remove('active');
    availablePlansBtn.classList.remove('active');
    currentPlansContent.style.display = 'none';
    availablePlansContent.style.display = 'none';
    activePlansContent.style.display = 'none';

    // Activate selected tab
    if (tabName === 'current') {
        currentPlansBtn.classList.add('active');
        if (hasActiveSubscriptions) {
            activePlansContent.style.display = 'block';
        } else {
            currentPlansContent.style.display = 'block';
        }
    } else if (tabName === 'available') {
        availablePlansBtn.classList.add('active');
        availablePlansContent.style.display = 'block';
    }
};

// Toggle Mobile Sidebar
const toggleSidebar = () => {
    sidebar.classList.toggle('show-sidebar');
};

// Show Modal
const showModal = (modal) => {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
};

// Hide Modal
const hideModal = (modal) => {
    modal.classList.remove('show');
    document.body.style.overflow = ''; // Enable scrolling
};

// After successful payment
const handleSuccessfulPayment = () => {
    hasActiveSubscriptions = true;
    hideModal(paymentModal);
    switchToTab('current'); // Switch back to current plans tab
};

// Event Listeners
currentPlansBtn.addEventListener('click', () => switchToTab('current'));
availablePlansBtn.addEventListener('click', () => switchToTab('available'));
browsePlansBtn.addEventListener('click', () => switchToTab('available'));

// Payment button click
subscribeButtons.forEach(button => {
    button.addEventListener('click', () => {
        showModal(paymentModal);
    });
});

// Logout button click
logoutBtn.addEventListener('click', () => {
    showModal(logoutConfirmationModal);
});

// Close modals
closeModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        hideModal(paymentModal);
        hideModal(logoutConfirmationModal);
    });
});

// Cancel logout
cancelBtn.addEventListener('click', () => {
    hideModal(logoutConfirmationModal);
});

// Confirm logout
confirmBtn.addEventListener('click', () => {
    // Handle actual logout logic here
    hideModal(logoutConfirmationModal);
    // Redirect to login page or perform logout
    // window.location.href = 'login.html';
});

// Mobile menu toggle
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', toggleSidebar);
}

// Payment completion button
document.querySelector('.pay-now-btn').addEventListener('click', handleSuccessfulPayment);

// Make payment options clickable
const paymentOptions = document.querySelectorAll('.payment-option');
paymentOptions.forEach(option => {
    option.addEventListener('click', () => {
        paymentOptions.forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');
    });
});

// Course dropdown interaction
const courseInput = document.querySelector('.course-input');
const courseOptions = document.querySelectorAll('.course-option');

courseOptions.forEach(option => {
    option.addEventListener('click', () => {
        courseInput.value = option.textContent.trim();
    });
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.course-selector')) {
        document.querySelector('.course-dropdown').style.maxHeight = '';
    }
});

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    initSidebar();
    switchToTab('current');
    
    // Optional: Check if user has active subscriptions from API/localStorage
    // const userSubscriptions = localStorage.getItem('userSubscriptions');
    // if (userSubscriptions && JSON.parse(userSubscriptions).length > 0) {
    //     hasActiveSubscriptions = true;
    // }
});