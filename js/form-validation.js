// Form Validation JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('bookingForm');
    const formMessage = document.getElementById('formMessage');
    
    if (!form) return;
    
    // Form validation functions
    function validateName(name) {
        return name.trim().length >= 2;
    }
    
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function validatePhone(phone) {
        // Remove all non-digit characters
        const digitsOnly = phone.replace(/\D/g, '');
        return digitsOnly.length >= 10 && digitsOnly.length <= 15;
    }
    
    function validateDate(date) {
        if (!date) return false;
        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return selectedDate >= today;
    }
    
    function validateTime(time) {
        return time !== '';
    }
    
    function validateGuests(guests) {
        return guests !== '';
    }
    
    function showError(input, message) {
        const formGroup = input.parentElement;
        formGroup.classList.add('error');
        formGroup.classList.remove('success');
        
        // Remove existing error message if any
        const existingError = formGroup.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        const errorElement = document.createElement('small');
        errorElement.className = 'error-message';
        errorElement.style.color = 'var(--error-red)';
        errorElement.style.display = 'block';
        errorElement.style.marginTop = 'var(--spacing-xs)';
        errorElement.textContent = message;
        formGroup.appendChild(errorElement);
    }
    
    function showSuccess(input) {
        const formGroup = input.parentElement;
        formGroup.classList.remove('error');
        formGroup.classList.add('success');
        
        // Remove existing error message if any
        const existingError = formGroup.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
    }
    
    function validateForm() {
        let isValid = true;
        
        // Get form values
        const name = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const date = form.date.value;
        const time = form.time.value;
        const guests = form.guests.value;
        
        // Validate each field
        if (!validateName(name)) {
            showError(form.name, 'Please enter a valid name (at least 2 characters)');
            isValid = false;
        } else {
            showSuccess(form.name);
        }
        
        if (!validateEmail(email)) {
            showError(form.email, 'Please enter a valid email address');
            isValid = false;
        } else {
            showSuccess(form.email);
        }
        
        if (!validatePhone(phone)) {
            showError(form.phone, 'Please enter a valid phone number (10-15 digits)');
            isValid = false;
        } else {
            showSuccess(form.phone);
        }
        
        if (!validateDate(date)) {
            showError(form.date, 'Please select a valid date (today or future)');
            isValid = false;
        } else {
            showSuccess(form.date);
        }
        
        if (!validateTime(time)) {
            showError(form.time, 'Please select a time');
            isValid = false;
        } else {
            showSuccess(form.time);
        }
        
        if (!validateGuests(guests)) {
            showError(form.guests, 'Please select number of guests');
            isValid = false;
        } else {
            showSuccess(form.guests);
        }
        
        return isValid;
    }
    
    // Form submission handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            // Show success message
            formMessage.textContent = 'Thank you! Your reservation has been received. We will contact you shortly to confirm your booking.';
            formMessage.className = 'form-message success';
            formMessage.style.display = 'block';
            
            // Reset form
            form.reset();
            
            // Remove success states from all fields
            form.querySelectorAll('.form-group').forEach(group => {
                group.classList.remove('success', 'error');
                const errorMsg = group.querySelector('.error-message');
                if (errorMsg) errorMsg.remove();
            });
            
            // Hide message after 5 seconds
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        } else {
            // Show error message
            formMessage.textContent = 'Please fix the errors highlighted above before submitting.';
            formMessage.className = 'form-message error';
            formMessage.style.display = 'block';
            
            // Hide message after 5 seconds
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        }
    });
    
    // Real-time validation on blur
    form.querySelectorAll('input, select, textarea').forEach(field => {
        field.addEventListener('blur', function() {
            // Only validate if the field has a value or is required
            if (this.value || this.hasAttribute('required')) {
                switch(this.id) {
                    case 'name':
                        if (!validateName(this.value)) {
                            showError(this, 'Please enter a valid name (at least 2 characters)');
                        } else {
                            showSuccess(this);
                        }
                        break;
                    case 'email':
                        if (!validateEmail(this.value)) {
                            showError(this, 'Please enter a valid email address');
                        } else {
                            showSuccess(this);
                        }
                        break;
                    case 'phone':
                        if (!validatePhone(this.value)) {
                            showError(this, 'Please enter a valid phone number (10-15 digits)');
                        } else {
                            showSuccess(this);
                        }
                        break;
                    case 'date':
                        if (!validateDate(this.value)) {
                            showError(this, 'Please select a valid date (today or future)');
                        } else {
                            showSuccess(this);
                        }
                        break;
                    case 'time':
                        if (!validateTime(this.value)) {
                            showError(this, 'Please select a time');
                        } else {
                            showSuccess(this);
                        }
                        break;
                    case 'guests':
                        if (!validateGuests(this.value)) {
                            showError(this, 'Please select number of guests');
                        } else {
                            showSuccess(this);
                        }
                        break;
                }
            }
        });
        
        // Remove error states on input
        field.addEventListener('input', function() {
            const formGroup = this.parentElement;
            if (formGroup.classList.contains('error')) {
                formGroup.classList.remove('error');
                const errorMsg = formGroup.querySelector('.error-message');
                if (errorMsg) errorMsg.remove();
            }
        });
    });
    
    // Set minimum date for date input to today
    const dateInput = form.date;
    if (dateInput) {
        const today = new Date();
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1; // Months start at 0!
        let dd = today.getDate();
        
        if (mm < 10) mm = '0' + mm;
        if (dd < 10) dd = '0' + dd;
        
        const todayString = `${yyyy}-${mm}-${dd}`;
        dateInput.setAttribute('min', todayString);
    }
});