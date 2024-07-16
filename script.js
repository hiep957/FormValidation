const myForm = document.getElementById('myForm');

myForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formElements = [
        { id: 'name', validate: validateName },
        { id: 'email', validate: validateEmail },
        { id: 'password', validate: validatePassword },
        { id: 'confirmPassword', validate: validateConfirmPassword }
    ];

    let isValid = true;

    formElements.forEach(({ id, validate }) => {
        const input = document.getElementById(id);
        const errorElement = input.nextElementSibling;
        const error = validate(input.value.trim());
        if (error) {
            errorElement.textContent = error;
            input.parentNode.classList.add('error');
            input.parentNode.classList.remove('success');
            isValid = false;
        } else {
            errorElement.textContent = '';
            input.parentNode.classList.add('success');
            input.parentNode.classList.remove('error');
        }
    });

    if (isValid) {
        console.log({
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            password: document.getElementById('password').value.trim()
        });
        
    }
});

function validateName(name) {
    return name === '' ? 'Name is required.' : '';
}

function validateEmail(email) {
    if (email === '') {
        return 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return 'Please enter a valid email address.';
    }
    return '';
}

function validatePassword(password) {
    if (password === '') {
        return 'Password is required.';
    } else if (password.length < 8) {
        return 'Password is expected to be at least 8 characters.';
    }
    return '';
}

function validateConfirmPassword(confirmPassword) {
    const password = document.getElementById('password').value.trim();
    if (confirmPassword === '') {
        return 'Confirm Password is required.';
    } else if (confirmPassword !== password) {
        return 'Passwords do not match.';
    }
    return '';
}
