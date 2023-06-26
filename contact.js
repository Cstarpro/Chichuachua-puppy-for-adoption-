$(document).ready(function() {
	
	// Handle form submission
	$('#contact-form').submit(function(event) {
		event.preventDefault();
		
		// Validate form input
		var name = $('#name').val();
		var email = $('#email').val();
		var message = $('#message').val();
		var errors = [];
		
		if (name.length < 3) {
			errors.push('Please enter a valid name.');
		}
		if (!email.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i)) {
			errors.push('Please enter a valid email address.');
		}
		if (message.length < 10) {
			errors.push('Please enter a message of at least 10 characters.');
		}
		
		// If form input is valid, submit form via AJAX
		if (errors.length == 0) {
			$.ajax({
				type: 'POST',
				url: 'process-contact.php',
				data: $(this).serialize(),
				success: function(response) {
					$('.form-status').removeClass('error').addClass('success').html(response);
					$('#contact-form')[0].reset();
				},
				error: function(response) {
					$('.form-status').removeClass('success').addClass('error').html(response);
				}
			});
		}
		
		// If form input is invalid, display error messages
		else {
			var errorString = '';
			for (i = 0; i < errors.length; i++) {
				errorString += errors[i] + '<br>';
			}
			$('.form-status').removeClass('success').addClass('error').html(errorString);
		}
		
	});
	
});
```