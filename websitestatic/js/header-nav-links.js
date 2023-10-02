$(document).ready(function () {
    // Add smooth scrolling to all links with hash fragments
    $("a[href^='#']").on('click', function (event) {
        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
            // Prevent default anchor click behavior
            event.preventDefault();

            // Store hash
            var hash = this.hash;

            // Using jQuery's animate() method to add smooth page scroll with a linear easing function
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, {
                duration: 800, // Adjust the duration as needed
                easing: 'linear', // Use a linear easing function for smooth scrolling
                complete: function () {
                    // Add hash (#) to URL when done scrolling (default click behavior)
                    window.location.hash = hash;
                }
            });
        }
    });
});