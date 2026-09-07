document.addEventListener('DOMContentLoaded', () => {
    // Form Submission Handling
    const emailForm = document.getElementById('signup-form');
    
    if (emailForm) {
        emailForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const emailInput = emailForm.querySelector('input[type="email"]');
            const emailValue = emailInput.value.trim();

            if (emailValue) {
                alert(`Thank you for signing up with ${emailValue}! Check your inbox for access.`);
                emailInput.value = '';
            }
        });
    }

    // Modal Dynamic Interactivity
    const demoButton = document.getElementById('watch-demo-btn');
    const demoModal = document.getElementById('demo-modal');
    const closeModal = document.getElementById('close-modal');

    if (demoButton && demoModal && closeModal) {
        // Open Modal
        demoButton.addEventListener('click', (event) => {
            event.preventDefault();
            demoModal.style.display = 'flex';
        });

        // Close Modal via X Button
        closeModal.addEventListener('click', () => {
            demoModal.style.display = 'none';
        });

        // Close Modal via Outside Overlay Click
        window.addEventListener('click', (event) => {
            if (event.target === demoModal) {
                demoModal.style.display = 'none';
            }
        });
    }
});