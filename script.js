document.addEventListener('DOMContentLoaded', function () {
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const uniqueCode = document.getElementById('uniqueCode');
    const generateCodeBtn = document.getElementById('generateCodeBtn');
    const signUpBtn = document.getElementById('signUpBtn');
    const errorMessages = document.getElementById('errorMessages');
    const form = document.getElementById('affiliateForm');

    // Enable or disable the signup button based on form validity
    function updateSignUpButtonState() {
        signUpBtn.disabled = !(
            firstName.value &&
            lastName.value &&
            email.value &&
            ageCheckbox.checked &&
            citizenCheckbox.checked
        );
    }

    function updateGenerateButtonState() {
        generateCodeBtn.disabled = !(firstName.value && lastName.value);
    }

    // Add event listeners for the checkboxes and fields
    [firstName, lastName, email, ageCheckbox, citizenCheckbox].forEach(
        (input) => {
            input.addEventListener('input', updateSignUpButtonState);
        }
    );

    // Additional listeners specifically for generateCodeBtn
    [firstName, lastName].forEach((input) => {
        input.addEventListener('input', updateGenerateButtonState);
    });

    // Initial state
    updateGenerateButtonState();

    generateCodeBtn.addEventListener('click', function () {
        let code = (
            firstName.value.slice(0, 3) + lastName.value.slice(0, 3)
        ).toUpperCase();
        code += Math.floor(1000 + Math.random() * 9000); // 4-digit number
        uniqueCode.value = code;
    });

    uniqueCode.addEventListener('focus', function () {
        this.readOnly = false;
    });

    uniqueCode.addEventListener('blur', function () {
        if (!this.value) {
            this.readOnly = true;
        }
    });

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // TODO: Send the data to the server. Check the response to determine if it's successful or has errors.
        //  Clear the form on submission.
        form.reset();
        uniqueCode.readOnly = true;
        errorMessages.textContent = ''; // Clear any errors
    });
});
