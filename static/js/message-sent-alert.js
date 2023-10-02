function onSubmit() {
    // Show a custom-styled alert using SweetAlert2
    Swal.fire({
        title: 'Success!',
        text: 'Message has been delivered!',
        icon: 'success',
        timer: 3000, // Display for 2 seconds
        showConfirmButton: false
    }).then(() => {
        // Redirect to the index page after displaying the alert
        window.location.href = "/";
    });

    // To prevent the form from submitting and reloading the page immediately, return false
    return false;
}

