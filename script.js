let memoryStorage = {};
        
        // Mock localStorage functionality
        const storage = {
            setItem: function(key, value) {
                memoryStorage[key] = value;
            },
            getItem: function(key) {
                return memoryStorage[key] || null;
            },
            removeItem: function(key) {
                delete memoryStorage[key];
            }
        };

        // DOM elements
        const form = document.getElementById('loginForm');
        const usernameInput = document.getElementById('username');
        const passwordInput = document.getElementById('password');
        const checkbox = document.getElementById('checkbox');
        const submitBtn = document.getElementById('submit');
        const existingBtn = document.getElementById('existing');

        // Check for existing credentials on page load
        function checkExistingCredentials() {
            const savedUsername = storage.getItem('username');
            const savedPassword = storage.getItem('password');
            
            if (savedUsername && savedPassword) {
                existingBtn.classList.add('visible');
            } else {
                existingBtn.classList.remove('visible');
            }
        }

        // Handle form submission
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = usernameInput.value.trim();
            const password = passwordInput.value.trim();
            
            if (!username || !password) {
                alert('Please enter both username and password');
                return;
            }
            
            // Display login alert
            alert(`Logged in as ${username}`);
            
            // Handle "Remember Me" functionality
            if (checkbox.checked) {
                // Store credentials
                storage.setItem('username', username);
                storage.setItem('password', password);
                existingBtn.classList.add('visible');
            } else {
                // Remove any previously stored credentials
                storage.removeItem('username');
                storage.removeItem('password');
                existingBtn.classList.remove('visible');
            }
            
            // Clear form
            form.reset();
        });

        // Handle existing user login
        existingBtn.addEventListener('click', function() {
            const savedUsername = storage.getItem('username');
            if (savedUsername) {
                alert(`Logged in as ${savedUsername}`);
            }
        });

        // Initialize page
        checkExistingCredentials();