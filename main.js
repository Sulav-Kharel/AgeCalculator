document.addEventListener('DOMContentLoaded', function(){
    var day = document.getElementById('day');
    var month = document.getElementById('month');
    var year = document.getElementById('year');
    var submit = document.getElementById('submit');

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

        // Validation checks
        var maxDaysInMonth = new Date(userEnteredYear, userEnteredMonth, 0).getDate();

        if (userEnteredDay < 1 || userEnteredDay > maxDaysInMonth || userEnteredDay > 31 || isNaN(userEnteredDay)) {
            errorMessageDay.textContent = 'Must be a valid day';
            // errorMessages.push("Must be a valid day");
            return;
        }

        if (userEnteredMonth < 1 || userEnteredMonth > 12 || isNaN(userEnteredMonth)) {
            errorMessageMonth.textContent = 'Must be a valid month';
            // errorMessages.push("Must be a valid month");
            return;
        }

        if (userEnteredYear > currentYear || (userEnteredYear === currentYear && userEnteredMonth < currentMonth) || (userEnteredYear === currentYear && userEnteredMonth === currentMonth && userEnteredDay < currentDay || isNaN(userEnteredYear))) {
            errorMessageYear.textContent = 'Must be a valid year';
            // errorMessages.push("Must be a valid year");
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
});
