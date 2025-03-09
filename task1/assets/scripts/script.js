document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registrationForm');
    const submitButton = document.getElementById('submitButton');
    
    // Проверка валидности каждого из полей формы:
    // Создаём функцию для проверки валидности
    const validateForm = () => {
        let isFormValid = true;

        // Проверяем введённое имя:
        //Для начала: находим необходимые переменные в документе
        const name = document.getElementById('name');
        const nameError = document.getElementById('nameError');

        //Если введенная информация не соответствует критериям - форма не отправится, если соответствует - отправится
        if (!name.validity.valid) {
            nameError.textContent = 'The name must contain only letters and spaces, from 2 to 20 characters long';
            isValid = false;
        } else {
            nameError.textContent = '';
        }

        // Проверяем электронную почту
        const email = document.getElementById('email');
        const emailError = document.getElementById('emailError');

        if (!email.validity.valid) {
            emailError.textContent = 'Enter the correct email address';
            isValid = false;
        } else {
            emailError.textContent = '';
        }

        // Проверяем возраст
        const age = document.getElementById('age');
        const ageError = document.getElementById('ageError');

        if (!age.validity.valid) {
            ageError.textContent = 'Age is a required field';
            isValid = false;
        } else {
            ageError.textContent = '';
        }

        // Проверяем отмечена ли профессия
        const profession = document.getElementById('profession');
        const professionError = document.getElementById('professionError');

        if (!profession.validity.valid) {
            professionError.textContent = 'Choose a profession';
            isValid = false;
        } else {
            professionError.textContent = '';
        }

        // Проверяем пароль
        const password = document.getElementById('password');
        const passwordError = document.getElementById('passwordError');

        if (!password.validity.valid) {
            passwordError.textContent = 'The password must contain at least 8 characters, one uppercase letter, one lowercase letter and one digit';
            isValid = false;
        } else {
            passwordError.textContent = '';
        }

        // Проверяем согласие на использование данных
        const consent = document.getElementById('consent');
        const consentError = document.getElementById('consentError');
        if (!consent.checked) {
            consentError.textContent = 'Consent to data processing is required';
            isValid = false;
        } else {
            consentError.textContent = '';
        }

        // Под конец - активируем кнопку отправки в случае валидности всех пунктов формы
        submitButton.disabled = !isFormValid; 
    };

    // Вешаем обработчик события
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Отменяем действие по умолчанию

        if (form.checkValidity()) {
            console.log({
                name: form.name.value,
                email: form.email.value,
                age: form.age.value,
                gender: form.gender.value,
                profession: form.profession.value,
                password: form.password.value,
                consent: form.consent.checked,
            });
            form.reset();

            // После отправки формы кнопка снова приходит в неактивное состояние:
            submitButton.disabled = true;
        }
    });

    // Обработчики событий focus и blur для каждого поля ввода формы (т.е. кликаем на любое поле - и вызывается функция, прописанная выше)
    const fields = ['name', 'email', 'age', 'profession', 'password', 'consent'];
    
    fields.forEach(field => {
        const inputField = document.getElementById(field);
        inputField.addEventListener('focus', validateForm);
        inputField.addEventListener('blur', validateForm);
    });

    //Изменение цвета границы при фокусе
    password.addEventListener('focus', function () {
        password.style.border = '3px solid rgb(0, 61, 142)';
    });
    // Восстановление стандартной границы после потери фокуса
    password.addEventListener('blur', function () {
        password.style.border = '';
    });

    email.addEventListener('focus', function () {
        email.style.border = '3px solid rgb(0, 61, 142)';
    });
    email.addEventListener('blur', function () {
        email.style.border = '';
    });

    age.addEventListener('focus', function () {
        age.style.border = '3px solid rgb(0, 61, 142)';
    });
    age.addEventListener('blur', function () {
        age.style.border = '';
    });

    profession.addEventListener('focus', function () {
        profession.style.border = '3px solid rgb(0, 61, 142)';
    });
    profession.addEventListener('blur', function () {
        profession.style.border = '';
    });
});
