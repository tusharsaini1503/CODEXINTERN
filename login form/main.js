
        // Get form elements
        const loginToggle = document.getElementById('loginToggle');
        const registerToggle = document.getElementById('registerToggle');
        const loginForm = document.getElementById('loginForm');
        const registerForm = document.getElementById('registerForm');
        const headerText = document.getElementById('headerText');

        // Email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const mobileRegex = /^[0-9]{10}$/;

        // Toggle between login and register forms
        loginToggle.addEventListener('click', function() {
            showLoginForm();
        });

        registerToggle.addEventListener('click', function() {
            showRegisterForm();
        });

        function showLoginForm() {
            loginToggle.classList.add('active');
            registerToggle.classList.remove('active');
            loginForm.classList.add('active');
            registerForm.classList.remove('active');
            headerText.textContent = 'Please sign in to your account';
        }

        function showRegisterForm() {
            registerToggle.classList.add('active');
            loginToggle.classList.remove('active');
            registerForm.classList.add('active');
            loginForm.classList.remove('active');
            headerText.textContent = 'Create your new account';
        }

        // Password toggle functionality
        setupPasswordToggle('toggleLoginPassword', 'loginPassword');
        setupPasswordToggle('toggleCreatePassword', 'createPassword');
        setupPasswordToggle('toggleConfirmPassword', 'confirmPassword');

        function setupPasswordToggle(toggleId, inputId) {
            const toggle = document.getElementById(toggleId);
            const input = document.getElementById(inputId);
            
            toggle.addEventListener('click', function() {
                const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
                input.setAttribute('type', type);
                this.textContent = type === 'password' ? '👁️' : '🙈';
            });
        }

        // Validation functions
        function showError(input, errorElement, message) {
            input.classList.remove('success');
            input.classList.add('error');
            errorElement.textContent = message;
            errorElement.classList.add('show');
        }

        function showSuccess(input, errorElement) {
            input.classList.remove('error');
            input.classList.add('success');
            errorElement.textContent = '';
            errorElement.classList.remove('show');
        }

        function validateEmail(email, errorElement) {
            if (email === '') {
                showError(document.getElementById(errorElement.id.replace('Error', '')), errorElement, 'Email is required');
                return false;
            } else if (!emailRegex.test(email)) {
                showError(document.getElementById(errorElement.id.replace('Error', '')), errorElement, 'Please enter a valid email address');
                return false;
            } else {
                showSuccess(document.getElementById(errorElement.id.replace('Error', '')), errorElement);
                return true;
            }
        }

        function validatePassword(password, errorElement, inputId) {
            const input = document.getElementById(inputId);
            if (password === '') {
                showError(input, errorElement, 'Password is required');
                return false;
            } else if (password.length < 8) {
                showError(input, errorElement, 'Password must be at least 8 characters long');
                return false;
            } else if (!/(?=.*[a-z])(?=.*[A-Z])/.test(password)) {
                showError(input, errorElement, 'Password must contain both uppercase and lowercase letters');
                return false;
            } else if (!/(?=.*\d)/.test(password)) {
                showError(input, errorElement, 'Password must contain at least one number');
                return false;
            } else if (!/(?=.*[!@#$%^&*])/.test(password)) {
                showError(input, errorElement, 'Password must contain at least one special character');
                return false;
            } else {
                showSuccess(input, errorElement);
                return true;
            }
        }

        // Login form validation and submission
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('loginEmail').value.trim();
            const password = document.getElementById('loginPassword').value;
            
            const isEmailValid = validateEmail(email, document.getElementById('loginEmailError'));
            const isPasswordValid = password !== '' && password.length >= 6;
            
            if (!isPasswordValid) {
                showError(document.getElementById('loginPassword'), document.getElementById('loginPasswordError'), 'Password is required');
            } else {
                showSuccess(document.getElementById('loginPassword'), document.getElementById('loginPasswordError'));
            }
            
            if (isEmailValid && isPasswordValid) {
                if (email === 'demo@example.com' && password === 'Demo123') {
                    alert('✅ Login Successful! Welcome back, ' + email);
                    loginForm.reset();
                    clearValidation(['loginEmail', 'loginPassword']);
                } else {
                    alert('❌ Login Failed! Invalid credentials.\n\nDemo credentials:\nEmail: demo@example.com\nPassword: Demo123');
                }
            } else {
                document.querySelector('.form-container').classList.add('shake');
                setTimeout(() => {
                    document.querySelector('.form-container').classList.remove('shake');
                }, 500);
                alert('❌ Please fix the validation errors before submitting!');
            }
        });

        // Register form validation and submission
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                firstName: document.getElementById('firstName').value.trim(),
                lastName: document.getElementById('lastName').value.trim(),
                email: document.getElementById('registerEmail').value.trim(),
                mobile: document.getElementById('mobileNumber').value.trim(),
                gender: document.getElementById('gender').value,
                dob: document.getElementById('dateOfBirth').value,
                password: document.getElementById('createPassword').value,
                confirmPassword: document.getElementById('confirmPassword').value
            };

            let isValid = true;

            // Validate first name
            if (formData.firstName === '') {
                showError(document.getElementById('firstName'), document.getElementById('firstNameError'), 'First name is required');
                isValid = false;
            } else if (formData.firstName.length < 2) {
                showError(document.getElementById('firstName'), document.getElementById('firstNameError'), 'First name must be at least 2 characters');
                isValid = false;
            } else {
                showSuccess(document.getElementById('firstName'), document.getElementById('firstNameError'));
            }

            // Validate last name
            if (formData.lastName === '') {
                showError(document.getElementById('lastName'), document.getElementById('lastNameError'), 'Last name is required');
                isValid = false;
            } else if (formData.lastName.length < 2) {
                showError(document.getElementById('lastName'), document.getElementById('lastNameError'), 'Last name must be at least 2 characters');
                isValid = false;
            } else {
                showSuccess(document.getElementById('lastName'), document.getElementById('lastNameError'));
            }

            // Validate email
            if (!validateEmail(formData.email, document.getElementById('registerEmailError'))) {
                isValid = false;
            }

            // Validate mobile
            if (formData.mobile === '') {
                showError(document.getElementById('mobileNumber'), document.getElementById('mobileError'), 'Mobile number is required');
                isValid = false;
            } else if (!mobileRegex.test(formData.mobile)) {
                showError(document.getElementById('mobileNumber'), document.getElementById('mobileError'), 'Please enter a valid 10-digit mobile number');
                isValid = false;
            } else {
                showSuccess(document.getElementById('mobileNumber'), document.getElementById('mobileError'));
            }

            // Validate gender
            if (formData.gender === '') {
                showError(document.getElementById('gender'), document.getElementById('genderError'), 'Please select your gender');
                isValid = false;
            } else {
                showSuccess(document.getElementById('gender'), document.getElementById('genderError'));
            }

            // Validate date of birth
            if (formData.dob === '') {
                showError(document.getElementById('dateOfBirth'), document.getElementById('dobError'), 'Date of birth is required');
                isValid = false;
            } else {
                const today = new Date();
                const birthDate = new Date(formData.dob);
                const age = today.getFullYear() - birthDate.getFullYear();
                if (age < 13) {
                    showError(document.getElementById('dateOfBirth'), document.getElementById('dobError'), 'You must be at least 13 years old');
                    isValid = false;
                } else {
                    showSuccess(document.getElementById('dateOfBirth'), document.getElementById('dobError'));
                }
            }

            // Validate password
            if (!validatePassword(formData.password, document.getElementById('createPasswordError'), 'createPassword')) {
                isValid = false;
            }

            // Validate confirm password
            if (formData.confirmPassword === '') {
                showError(document.getElementById('confirmPassword'), document.getElementById('confirmPasswordError'), 'Please confirm your password');
                isValid = false;
            } else if (formData.password !== formData.confirmPassword) {
                showError(document.getElementById('confirmPassword'), document.getElementById('confirmPasswordError'), 'Passwords do not match');
                isValid = false;
            } else if (formData.password === formData.confirmPassword && formData.password !== '') {
                showSuccess(document.getElementById('confirmPassword'), document.getElementById('confirmPasswordError'));
            }

            if (isValid) {
                alert(`✅ Registration Successful!\n\nWelcome ${formData.firstName} ${formData.lastName}!\nEmail: ${formData.email}\nMobile: ${formData.mobile}\n\nYou can now login with your credentials.`);
                registerForm.reset();
                clearValidation(['firstName', 'lastName', 'registerEmail', 'mobileNumber', 'gender', 'dateOfBirth', 'createPassword', 'confirmPassword']);
                showLoginForm();
            } else {
                document.querySelector('.form-container').classList.add('shake');
                setTimeout(() => {
                    document.querySelector('.form-container').classList.remove('shake');
                }, 500);
                alert('❌ Please fix all validation errors before submitting!');
            }
        });

        function clearValidation(inputIds) {
            inputIds.forEach(id => {
                document.getElementById(id).classList.remove('error', 'success');
            });
        }
