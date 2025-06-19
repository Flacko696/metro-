function showMessage(element, message, type) {
            const msgElement = document.getElementById(element);
            msgElement.textContent = message;
            msgElement.className = 'auth-message show ' + type;
            
            // Автоматическое скрытие сообщения через 5 секунд
            setTimeout(() => {
                msgElement.classList.remove('show');
            }, 5000);
        }

        document.addEventListener('DOMContentLoaded', function() {
            if (window.location.pathname.includes('calendar.html')) {
                const isLoggedIn = localStorage.getItem('metroEventLoggedIn') === 'true';
                if (!isLoggedIn) {
                    window.location.href = 'login.html';
                }
            }

            // Замените эти значения на ваши реальные логины и пароли
            const validCredentials = {
                'admin': 'password123',
                'user1': 'metro2023',
                'user2': 'event2023'
            };

            const loginForm = document.getElementById('loginForm');
            if (loginForm) {
                loginForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    const username = document.getElementById('username').value;
                    const password = document.getElementById('password').value;
                    
                    if (username && password) {
                        // Проверяем, есть ли такой пользователь и совпадает ли пароль
                        if (validCredentials[username] && validCredentials[username] === password) {
                            localStorage.setItem('metroEventLoggedIn', 'true');
                            localStorage.setItem('metroEventUsername', username);
                            showMessage('loginMessage', 'Вход выполнен успешно! Перенаправление...', 'success');
                            
                            // Перенаправление через 1.5 секунды
                            setTimeout(() => {
                                window.location.href = 'calendar.html';
                            }, 1500);
                        } else {
                            showMessage('loginMessage', 'Неверное имя пользователя или пароль', 'error');
                            document.getElementById('password').value = '';
                        }
                    } else {
                        showMessage('loginMessage', 'Пожалуйста, введите имя пользователя и пароль', 'error');
                    }
                });
            }

            const registerForm = document.getElementById('registerForm');
            if (registerForm) {
                registerForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    const username = document.getElementById('reg-username').value;
                    const email = document.getElementById('reg-email').value;
                    const password = document.getElementById('reg-password').value;
                    
                    if (username && email && password) {
                        // Проверяем, не занято ли имя пользователя
                        if (validCredentials[username]) {
                            showMessage('registerMessage', 'Это имя пользователя уже занято', 'error');
                        } else {
                            // Добавляем нового пользователя
                            validCredentials[username] = password;
                            showMessage('registerMessage', 'Регистрация успешна! Теперь вы можете войти.', 'success');
                            
                            // Очищаем форму
                            registerForm.reset();
                            
                            // Переключаем на форму входа через 2 секунды
                            setTimeout(() => {
                                document.getElementById('showLogin').click();
                            }, 2000);
                        }
                    } else {
                        showMessage('registerMessage', 'Пожалуйста, заполните все поля', 'error');
                    }
                });
            }

            const showRegister = document.getElementById('showRegister');
            const showLogin = document.getElementById('showLogin');
            if (showRegister && showLogin) {
                showRegister.addEventListener('click', function(e) {
                    e.preventDefault();
                    document.querySelector('.form-container').classList.add('hidden');
                    document.querySelector('.register-form').classList.remove('hidden');
                    // Скрываем сообщения при переключении форм
                    document.getElementById('loginMessage').classList.remove('show');
                    document.getElementById('registerMessage').classList.remove('show');
                });
                
                showLogin.addEventListener('click', function(e) {
                    e.preventDefault();
                    document.querySelector('.form-container').classList.remove('hidden');
                    document.querySelector('.register-form').classList.add('hidden');
                    // Скрываем сообщения при переключении форм
                    document.getElementById('loginMessage').classList.remove('show');
                    document.getElementById('registerMessage').classList.remove('show');
                });
            }

            const logoutBtn = document.getElementById('logout');
            if (logoutBtn) {
                logoutBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    localStorage.removeItem('metroEventLoggedIn');
                    localStorage.removeItem('metroEventUsername');
                    window.location.href = 'login.html';
                });
            }
        });