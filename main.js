document.addEventListener('DOMContentLoaded', function(){
    var day = document.getElementById('day');
    var month = document.getElementById('month');
    var year = document.getElementById('year');
    var submit = document.getElementById('submit');
    var inputBox = document.querySelectorAll('input[type="number"]');
    var labels = document.querySelectorAll('.date label');

    var cardResults = document.querySelectorAll(".card-result");

    submit.addEventListener('click', function(event){
        event.preventDefault();

        var userEnteredYear = parseInt(year.value);
        var userEnteredMonth = parseInt(month.value);
        var userEnteredDay = parseInt(day.value);

        var currentDate = new Date();
        var currentYear = currentDate.getFullYear();
        var currentMonth = currentDate.getMonth() + 1;
        var currentDay = currentDate.getDate();

        var errorMessageDay = document.querySelector('.error-message-day');
        var errorMessageMonth = document.querySelector('.error-message-month');
        var errorMessageYear = document.querySelector('.error-message-year');
        
        errorMessageYear.textContent = '';
        errorMessageMonth.textContent = '';
        errorMessageDay.textContent = '';

        var errorMessages = [];

        // Check if any field is empty
        if (!day.value.trim() && !month.value.trim() && !year.value.trim()) {
            errorMessages.push('All fields are required');
            changeStyle();
        } else if (!day.value.trim() || !month.value.trim() || !year.value.trim()) {
            changeStyle();
        } else {
            // Validation checks
            var maxDaysInMonth = new Date(userEnteredYear, userEnteredMonth, 0).getDate();

            if (isNaN(userEnteredDay)) {
                errorMessageDay.textContent = 'The field is required';
            } else if (userEnteredDay < 1 || userEnteredDay > maxDaysInMonth || userEnteredDay > 31) {
                errorMessageDay.textContent = 'Must be a valid day';
                return;
            }

            if (isNaN(userEnteredMonth)) {
                errorMessageMonth.textContent = 'The field is required';
            } else if (userEnteredMonth < 1 || userEnteredMonth > 12) {
                errorMessageMonth.textContent = 'Must be a valid month';
                return;
            }

            if (isNaN(userEnteredYear)) {
                errorMessageYear.textContent = 'The field is required';
            } else if (userEnteredYear > currentYear || (userEnteredYear === currentYear && userEnteredMonth < currentMonth) || (userEnteredYear === currentYear && userEnteredMonth === currentMonth && userEnteredDay < currentDay)) {
                errorMessageYear.textContent = 'Must be a valid year';
                return;
            }
        }

        // Display all error messages
        if (errorMessages.length > 0) {
            errorMessages.forEach(function (message) {
                errorMessageDay.textContent = message;
                errorMessageMonth.textContent = message;
                errorMessageYear.textContent = message;
            });
            return;
        }

        var ageInYears = currentYear - userEnteredYear;
        var ageInMonths = currentMonth - userEnteredMonth;
        var ageInDays = currentDay - userEnteredDay;

        // Adjust for negative values
        if (ageInDays < 0) {
            ageInMonths--;
            ageInDays += maxDaysInMonth;
        }

        if (ageInMonths < 0) {
            ageInYears--;
            ageInMonths += 12;
        }

        var userAgeInYears = document.querySelector('#years');
        userAgeInYears.innerHTML = ageInYears;

        var userAgeInMonths = document.querySelector('#months');
        userAgeInMonths.innerHTML = ageInMonths;

        var userAgeInDays = document.querySelector('#days');
        userAgeInDays.innerHTML = ageInDays;
    });

    function changeStyle() {
        inputBox.forEach(function (input) {
            input.style.borderColor = 'var(--Lightred)';
        });
        labels.forEach(function (label) {
            label.style.color = 'var(--Lightred)';
        });
    };
});
