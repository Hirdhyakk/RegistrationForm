const form = document.querySelector('form'); // Select the form element

form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');

    // Clear any existing error messages
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(message => message.remove());

    let isValid = true;

    // Validate name
    if (!validateName(nameInput.value)) {
        const errorMessage = createErrorMessage('Name must be alphanumeric and have at least 3 characters.');
        nameInput.parentNode.insertBefore(errorMessage, nameInput);
        isValid = false;
    }

    // Validate email
    if (!validateEmail(emailInput.value)) {
        const errorMessage = createErrorMessage('Please enter a valid email address.');
        emailInput.parentNode.insertBefore(errorMessage, emailInput);
        isValid = false;
    } else if (!validateEmailExistence(emailInput.value)) { // New validation
        const errorMessage = createErrorMessage('This email address does not seem to exist. Please try again.');
        emailInput.parentNode.insertBefore(errorMessage, emailInput);
        isValid = false;
    }

    if (isValid) {
        // Perform form submission using your server-side script or logic
        console.log('Form submitted successfully!'); // Simulate form submission

        // Optionally, clear the form or redirect to a confirmation page
        window.location.href = 'sucess.html';
    }
});

function validateName(name) {
    const regex = /^[a-zA-Z0-9 ]{3,}$/;
    return regex.test(name);
}

function validateEmail(email) {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
}

async function validateEmailExistence(email) {
    try {
        const response = await fetch('https://api.example.com/email-validation', { // Replace with your email validation API
            method: 'POST',
            body: JSON.stringify({ email }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
            throw new Error('Email validation API failed');
        }

        const data = await response.json();
        return data.valid;
    } catch (error) {
        console.error('Error validating email:', error);
        return false;
    }
}

function createErrorMessage(message) {
    const errorMessage = document.createElement('p');
    errorMessage.classList.add('error-message');
    errorMessage.textContent = message;
    return errorMessage;
}
