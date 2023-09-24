console.log('ajax run properly')

$("#login-form").submit(function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get email and password values from the form
    const email = $("#emailinput").val();
    const password = $("#passwordinput").val();

    // Perform an AJAX POST request to the login endpoint
    $.ajax({
        type: "POST",
        url: "/login",
        data: JSON.stringify({ email: email, password: password }),
        contentType: "application/json", // Set the Content-Type
        success: function(response) {
            // Handle the login response from the server
            console.log("Login response:", response);
            $('.popup-wrapper').hide();

            // Redirect to the current page
            window.location.href = window.location.href; // Reloads the current page
        }
    });
});

// Function to handle the registration form submission
$("#register-form").submit(function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get username, email, and password values from the form
    const username = $("#username-input").val();
    const email = $("#email-input").val();
    const password = $("#password-input").val();

    // Perform an AJAX POST request to the registration endpoint
    $.ajax({
        type: "POST",
        url: "/register",
        data: JSON.stringify({ username: username, email: email, password: password }),
        contentType: "application/json", // Set the Content-Type
        success: function(response) {
            // Handle the registration response from the server
            console.log("Registration response:", response);
            $('.popup-wrapper').hide();

            // Redirect to the current page
            window.location.href = window.location.href; // Reloads the current page
        }
    });
});



  
