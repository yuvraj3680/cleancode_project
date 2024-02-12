document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    // Basic validation - check if the fields are not empty
    var username = document.getElementById('login-username').value;
    var password = document.getElementById('login-password').value;

    if (!username || !password) {
        alert('Please enter both username and password.');
    } else {
        // Add your login logic here
        alert('Login successful!');
    }
});

document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();
    // Basic validation - check if the fields are not empty
    var username = document.getElementById('signup-username').value;
    var email = document.getElementById('signup-email').value;
    var password = document.getElementById('signup-password').value;
    var confirmPassword = document.getElementById('confirm-password').value;

    if (!username || !email || !password || !confirmPassword) {
        alert('Please fill in all the fields.');
    } else if (password !== confirmPassword) {
        alert('Passwords do not match.');
    } else {
        // Add your signup logic here
        alert('Signup successful!');
    }
});
