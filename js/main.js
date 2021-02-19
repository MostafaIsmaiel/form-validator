const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// Show input error message
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.classList.add('error');
    const small = formControl.querySelector('small');
    small.innerText = message;
}

// Show success outline
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.classList.add('success');
    formControl.classList.remove('error');
}

// Check email validation
function checkEmail(input) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())){
        showSuccess(input);
    } else {
        showError(input, 'Email is not valid');
    }
}

// Check required fields
function checkRequired(inputArr) {
    inputArr.forEach(function (input) {
        const label = input.nextElementSibling.innerText;
        if (input.value.trim() == ''){
            showError(input, `${label} is required`)
        } else {
            showSuccess(input);
        }
    });
}

// Check input length
function checkLength(input, min, max) {
    const label = input.nextElementSibling.innerText;
    if (input.value.length < min) {
        showError(input, `${label} must be at least ${min} characters`);
    } else if (input.value.length > max) {
        showError(input, `${label} must be less than ${max} characters`);
    } else {
        showSuccess(input);
    }
}

// Check passwords match
function checkPasswordMatch(input1, input2) {
    if (input1.value !== input2.value){
        showError(input2, 'Password does not match')
    }
}

// Get fieldname
// function getFieldName(input){
//     return input.id.charAt(0).toUpperCase() + input.id.slice(1);
// }

//Event Listner 
form.addEventListener('submit', function (e) {
    e.preventDefault(); //to prevent it from actually submitting

    checkRequired([username, email, password, password2]);
    checkLength(username, 3, 15);
    checkLength(password, 6, 25);
    checkEmail(email);
    checkPasswordMatch(password, password2);
});