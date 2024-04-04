// Перевірка чи користувач увійшов у систему
const currentUser = localStorage.getItem('currentUser');
if (!currentUser) {
  alert('Будь ласка, увійдіть в свій обліковий запис');
  window.location.href = 'index.html'; // Перенаправлення на сторінку входу
}

// Функція для додавання працівника до таблиці та збереження його в локальному сховищі
function addEmployeeToLocalStorage(name, position, salary) {
  const employees = JSON.parse(localStorage.getItem('employees')) || [];
  employees.push({ name, position, salary });
  localStorage.setItem('employees', JSON.stringify(employees));
}

// Функція для відображення працівників у таблиці
function displayEmployeesFromLocalStorage() {
  const employees = JSON.parse(localStorage.getItem('employees')) || [];
  const tbody = document.querySelector('#employeeTable tbody');
  tbody.innerHTML = '';
  employees.forEach((employee, index) => {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
      <td>${employee.name}</td>
      <td>${employee.position}</td>
      <td>${employee.salary}</td>
      <td><button class="editBtn">Редагувати</button> <button class="deleteBtn">Видалити</button></td>
    `;
    tbody.appendChild(newRow);
  });

  // Оновлення фільтра посад після відображення даних
  updatePositionFilter1(employees);
}

// Функція для створення та оновлення фільтра по посадах
function updatePositionFilter1(employees) {
  const positions = employees.map(employee => employee.position);
  const uniquePositions = [...new Set(positions)];

  const selectPosition = document.getElementById('filterPosition1');
  selectPosition.innerHTML = '<option value="">Усі посади</option>'; // Очищення попередніх варіантів

  uniquePositions.forEach(position => {
    const option = document.createElement('option');
    option.textContent = position;
    option.value = position;
    selectPosition.appendChild(option);
  });
}

// Функція для сортування працівників за вибраним стовпцем
function sortEmployees(columnIndex, sortOrder) {
  const employees = JSON.parse(localStorage.getItem('employees')) || [];
  employees.sort((a, b) => {
    const valueA = a[Object.keys(a)[columnIndex]];
    const valueB = b[Object.keys(b)[columnIndex]];
    if (sortOrder === 'asc') {
      return valueA.localeCompare(valueB);
    } else {
      return valueB.localeCompare(valueA);
    }
  });
  localStorage.setItem('employees', JSON.stringify(employees));
  displayEmployeesFromLocalStorage();
}

// Додавання працівників з локального сховища до таблиці при завантаженні сторінки
displayEmployeesFromLocalStorage();

document.getElementById('addEmployeeBtn').addEventListener('click', function() {
  const name = prompt('Введіть ім\'я працівника:');
  const position = prompt('Введіть посаду працівника:');
  const salary = prompt('Введіть зарплату працівника:');
  
  addEmployeeToLocalStorage(name, position, salary); // Збереження нового працівника в локальному сховищі
  displayEmployeesFromLocalStorage(); // Оновлення таблиці з працівниками
});

document.querySelector('#employeeTable').addEventListener('click', function(event) {
  if (event.target.classList.contains('deleteBtn')) {
    if (confirm('Ви впевнені, що хочете видалити цього працівника?')) {
      const employees = JSON.parse(localStorage.getItem('employees')) || [];
      const row = event.target.closest('tr');
      const index = Array.from(row.parentNode.children).indexOf(row);
      employees.splice(index, 1); // Видалення працівника з масиву
      localStorage.setItem('employees', JSON.stringify(employees)); // Оновлення даних в локальному сховищі
      displayEmployeesFromLocalStorage(); // Оновлення таблиці з працівниками
    }
  } else if (event.target.classList.contains('editBtn')) {
    const row = event.target.closest('tr');
    const name = row.children[0].textContent;
    const position = row.children[1].textContent;
    const salary = row.children[2].textContent;

    const newName = prompt('Введіть нове ім\'я працівника:', name);
    const newPosition = prompt('Введіть нову посаду працівника:', position);
    const newSalary = prompt('Введіть нову зарплату працівника:', salary);

    const employees = JSON.parse(localStorage.getItem('employees')) || [];
    const index = Array.from(row.parentNode.children).indexOf(row);
    employees[index] = { name: newName, position: newPosition, salary: newSalary }; // Оновлення даних працівника
    localStorage.setItem('employees', JSON.stringify(employees)); // Оновлення даних в локальному сховищі
    displayEmployeesFromLocalStorage(); // Оновлення таблиці з працівниками
  }
});

// Сортування за натисканням на заголовки стовпців таблиці
document.querySelectorAll('#employeeTable th').forEach((th, index) => {
  th.addEventListener('click', () => {
    const sortOrder = th.dataset.sortOrder === 'asc' ? 'desc' : 'asc';
    sortEmployees(index, sortOrder);
    // Зміна напрямку сортування в атрибуті data-sort-order
    th.dataset.sortOrder = sortOrder;
  });
});

// Фільтрація посад при зміні значення фільтра
document.getElementById('filterPosition1').addEventListener('change', function() {
  const selectedPosition = this.value;
  const employees = JSON.parse(localStorage.getItem('employees')) || [];
  const filteredEmployees = selectedPosition ? employees.filter(employee => employee.position === selectedPosition) : employees;
  const tbody = document.querySelector('#employeeTable tbody');
  tbody.innerHTML = '';
  filteredEmployees.forEach((employee, index) => {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
      <td>${employee.name}</td>
      <td>${employee.position}</td>
      <td>${employee.salary}</td>
      <td><button class="editBtn">Редагувати</button> <button class="deleteBtn">Видалити</button></td>
    `;
    tbody.appendChild(newRow);
  });
});

// Перемикання між таблицями працівників та викладачів
document.getElementById('toggleTablesBtn').addEventListener('click', function() {
    const employeeTable = document.getElementById('employeeTable');
    const teacherTable = document.getElementById('teacherTable');
    const filterPositionText = document.getElementById('filterPositionText');
    const filterPosition1 = document.getElementById('filterPosition1');
    const addEmployeeBtn = document.getElementById('addEmployeeBtn');
    const list = document.getElementById('list');
    const addTeacherBtn = document.getElementById('addTeacherBtn');
    const filterForm = document.getElementById('filterForm');
    const list1 = document.getElementById('list1');
    
    if (employeeTable.style.display === 'none') {
      employeeTable.style.display = 'table';
      teacherTable.style.display = 'none';
      addTeacherBtn.style.display = 'none';
      filterForm.style.display = 'none';
      list1.style.display = 'none';
      filterPosition1.style.display = 'block';
      filterPositionText.style.display = 'block';
      addEmployeeBtn.style.display = 'block';
      list.style.display = 'block';
      this.textContent = 'Перемкнути до викладачів';
    } else {
      employeeTable.style.display = 'none';
      teacherTable.style.display = 'table';
      addTeacherBtn.style.display = 'block';
      filterForm.style.display = 'block';
      list1.style.display = 'block';
      filterPosition1.style.display = 'none';
      filterPositionText.style.display = 'none';
      addEmployeeBtn.style.display = 'none';
      list.style.display = 'none';
      this.textContent = 'Перемкнути до працівників';
    }
  });
  
  
  // Функція для додавання викладача до таблиці та збереження його в локальному сховищі
function addTeacherToLocalStorage(name, position, hours, salary) {
    const teachers = JSON.parse(localStorage.getItem('teachers')) || [];
    teachers.push({ name, position, hours, salary });
    localStorage.setItem('teachers', JSON.stringify(teachers));
  }
  
  // Функція для відображення викладачів у таблиці
  function displayTeachersFromLocalStorage() {
    const teachers = JSON.parse(localStorage.getItem('teachers')) || [];
    const tbody = document.querySelector('#teacherTable tbody');
    tbody.innerHTML = '';
    teachers.forEach((teacher, index) => {
      const newRow = document.createElement('tr');
      newRow.innerHTML = `
        <td>${teacher.name}</td>
        <td>${teacher.position}</td>
        <td>${teacher.hours}</td>
        <td>${teacher.salary}</td>
        <td><button class="editTeacherBtn">Редагувати</button> <button class="deleteTeacherBtn">Видалити</button></td>
      `;
      tbody.appendChild(newRow);
    });
  }
  
  // Додавання викладачів з локального сховища до таблиці при завантаженні сторінки
  displayTeachersFromLocalStorage();
  
  // Додавання викладача при натисканні на кнопку "Додати викладача"
  document.getElementById('addTeacherBtn').addEventListener('click', function() {
    const name = prompt('Введіть ПІБ викладача:');
    const position = prompt('Введіть посаду викладача:');
    const hours = prompt('Введіть кількість годин:');
    const salary = hours * 50; // Заробітна плата розраховується від кількості годин
  
    addTeacherToLocalStorage(name, position, hours, salary); // Збереження нового викладача в локальному сховищі
    displayTeachersFromLocalStorage(); // Оновлення таблиці з викладачами
  });
  
  // Видалення викладача при натисканні на кнопку "Видалити"
  document.getElementById('teacherTable').addEventListener('click', function(event) {
    if (event.target.classList.contains('deleteTeacherBtn')) {
      const rowIndex = event.target.closest('tr').rowIndex - 1; // Визначення індексу рядка в таблиці
      const teachers = JSON.parse(localStorage.getItem('teachers')) || [];
      teachers.splice(rowIndex, 1); // Видалення викладача з масиву
      localStorage.setItem('teachers', JSON.stringify(teachers)); // Оновлення даних у локальному сховищі
      displayTeachersFromLocalStorage(); // Оновлення таблиці з викладачами
    }
  });
  
  // Редагування викладача при натисканні на кнопку "Редагувати"
  document.getElementById('teacherTable').addEventListener('click', function(event) {
    if (event.target.classList.contains('editTeacherBtn')) {
      const rowIndex = event.target.closest('tr').rowIndex - 1; // Визначення індексу рядка в таблиці
      const teachers = JSON.parse(localStorage.getItem('teachers')) || [];
      const teacher = teachers[rowIndex]; // Отримання даних викладача
      const newName = prompt('Введіть нове ПІБ викладача:', teacher.name);
      const newPosition = prompt('Введіть нову посаду викладача:', teacher.position);
      const newHours = prompt('Введіть нову кількість годин:', teacher.hours);
      const newSalary = newHours * 50; // Перерахунок заробітної плати
  
      // Оновлення даних викладача
      teachers[rowIndex] = {
        name: newName,
        position: newPosition,
        hours: newHours,
        salary: newSalary
      };
      localStorage.setItem('teachers', JSON.stringify(teachers)); // Оновлення даних у локальному сховищі
      displayTeachersFromLocalStorage(); // Оновлення таблиці з викладачами
    }
  });

  // Функція для фільтрації викладачів за посадою
function filterTeachersByPosition(position) {
    const teachers = JSON.parse(localStorage.getItem('teachers')) || [];
    return position ? teachers.filter(teacher => teacher.position === position) : teachers;
  }
  
  // Функція для сортування викладачів за певним стовпцем та порядком сортування
  function sortTeachers(columnIndex, order) {
    const teachers = JSON.parse(localStorage.getItem('teachers')) || [];
    
    teachers.sort((a, b) => {
      let comparison = 0;
      if (a[Object.keys(a)[columnIndex]] > b[Object.keys(b)[columnIndex]]) {
        comparison = 1;
      } else if (a[Object.keys(a)[columnIndex]] < b[Object.keys(b)[columnIndex]]) {
        comparison = -1;
      }
      return order === 'asc' ? comparison : -comparison;
    });
    
    localStorage.setItem('teachers', JSON.stringify(teachers));
    displayTeachersFromLocalStorage();
  }
  
  // Оновлення фільтрації при зміні значення фільтра по посаді
  document.getElementById('filterPosition').addEventListener('change', function() {
    const selectedPosition = this.value;
    const filteredTeachers = filterTeachersByPosition(selectedPosition);
    displayTeachers(filteredTeachers);
  });
  
  // Сортування при натисканні на заголовок стовпця
  document.querySelectorAll('#teacherTable th').forEach((th, index) => {
    th.addEventListener('click', () => {
      const sortOrder = th.dataset.sortOrder === 'asc' ? 'desc' : 'asc';
      sortTeachers(index, sortOrder);
      th.dataset.sortOrder = sortOrder;
    });
  });
  
  // Функція для відображення викладачів у таблиці
  function displayTeachers(teachers) {
    const tbody = document.querySelector('#teacherTable tbody');
    tbody.innerHTML = '';
    teachers.forEach((teacher, index) => {
      const newRow = document.createElement('tr');
      newRow.innerHTML = `
        <td>${teacher.name}</td>
        <td>${teacher.position}</td>
        <td>${teacher.hours}</td>
        <td>${teacher.salary}</td>
        <td><button class="editTeacherBtn">Редагувати</button> <button class="deleteTeacherBtn">Видалити</button></td>
      `;
      tbody.appendChild(newRow);
    });
  }

  // Функція для отримання унікальних посад викладачів
function getUniqueTeacherPositions() {
    const teachers = JSON.parse(localStorage.getItem('teachers')) || [];
    const positions = teachers.map(teacher => teacher.position);
    return [...new Set(positions)];
  }
  
  // Оновлення фільтра по посаді з унікальними значеннями
  function updatePositionFilter() {
    const filterPositionSelect = document.getElementById('filterPosition');
    filterPositionSelect.innerHTML = '<option value="">Усі посади</option>';
    const uniquePositions = getUniqueTeacherPositions();
    uniquePositions.forEach(position => {
      const option = document.createElement('option');
      option.value = position;
      option.textContent = position;
      filterPositionSelect.appendChild(option);
    });
  }
  
  // Оновлення фільтра по посаді при завантаженні сторінки
  updatePositionFilter();
  
  // Оновлення фільтрації при зміні значення фільтра по посаді
  document.getElementById('filterPosition').addEventListener('change', function() {
    const selectedPosition = this.value;
    const filteredTeachers = filterTeachersByPosition(selectedPosition);
    displayTeachers(filteredTeachers);
  });
  