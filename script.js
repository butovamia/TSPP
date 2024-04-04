document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const user = JSON.parse(localStorage.getItem(username));
    if (user && user.password === password) {
      localStorage.setItem('currentUser', username); // Зберігаємо інформацію про входження користувача
      alert(`Ласкаво просимо, ${username}!`);
      window.location.href = 'employees.html'; // Перехід на сторінку з таблицею працівників
    } else {
      alert('Невірне ім\'я користувача або пароль');
    }
  });
  
  
  
  document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const newUsername = document.getElementById('newUsername').value;
    const newPassword = document.getElementById('newPassword').value;
    const role = document.getElementById('role').value;
    localStorage.setItem(newUsername, JSON.stringify({password: newPassword, role: role}));
    alert('Користувача зареєстровано успішно');
  });
  