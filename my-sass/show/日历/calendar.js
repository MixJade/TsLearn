const defaultDate = new Date()
const $ = id => document.getElementById(id);
window.onload = () => init();

let year, month, dateString

const init = () => {
    const defaultYear = defaultDate.getFullYear();
    const defaultMonth = defaultDate.getMonth() + 1;
    setDate(defaultYear, defaultMonth);
    listenEvents();
}

const listenEvents = () => {
    // dom
    const lastMonthButton = $('lastMonth');
    const nextMonthButton = $('nextMonth');
    // last month
    lastMonthButton.addEventListener('click', () => {
        if (month === 1) {
            month = 12;
            year--;
        } else {
            month--;
        }
        setDate(year, month);
    });
    // next month
    nextMonthButton.addEventListener('click', () => {
        if (month === 12) {
            month = 1;
            year++;
        } else {
            month++
        }
        setDate(year, month);
    });
}

const setDate = (yearVar, monthVar) => {
    year = yearVar;
    month = monthVar;
    // the only place to do renders
    renderCurrentDate();
    renderDates();
}

const renderCurrentDate = () => {
    const currentDateEL = $('currentDate');
    dateString = getDateString(year, month);
    currentDateEL.textContent = dateString;
}

const getLastMonthInfo = () => {
    let lastMonth = month - 1;
    let yearOfLastMonth = year;
    if (lastMonth === 0) {
        lastMonth = 12;
        yearOfLastMonth -= 1;
    }
    let dayCountInLastMonth = getDayCount(yearOfLastMonth, lastMonth);

    return {
        lastMonth,
        yearOfLastMonth,
        dayCountInLastMonth
    }
}

const getNextMonthInfo = () => {
    let nextMonth = month + 1;
    let yearOfNextMonth = year;
    if (nextMonth === 13) {
        nextMonth = 1;
        yearOfNextMonth += 1;
    }
    let dayCountInNextMonth = getDayCount(yearOfNextMonth, nextMonth);

    return {
        nextMonth,
        yearOfNextMonth,
        dayCountInNextMonth
    }
}

const getDateString = (year, month) => `${year}-${month}`;

const renderDates = () => {
    // DOM
    const datesEL = document.getElementById('dates');
    datesEL.innerHTML = '';
    const dayCountInCurrentMonth = getDayCount(year, month);
    const firstDay = getDayOfFirstDate();
    const {lastMonth, yearOfLastMonth, dayCountInLastMonth} = getLastMonthInfo();
    const {nextMonth, yearOfNextMonth} = getNextMonthInfo();

    for (let i = 1; i <= 42; i++) {
        const dateEL = document.createElement('div');
        dateEL.classList.add('date');
        let dateString;
        let date;
        let isThisMonth = false;
        if (firstDay > 1 && i < firstDay) {
            // dates in last month
            date = dayCountInLastMonth - (firstDay - i) + 1;
            dateString = getDateString(yearOfLastMonth, lastMonth);
        } else if (i >= dayCountInCurrentMonth + firstDay) {
            // dates in next month
            date = i - (dayCountInCurrentMonth + firstDay) + 1;
            dateString = getDateString(yearOfNextMonth, nextMonth);
        } else {
            // dates in current month
            date = i - firstDay + 1;
            dateString = `${year}-${month}-${date}`;
            dateEL.classList.add('currentMonth');
            isThisMonth = true;
        }
        dateEL.textContent = date;
        dateEL.title = dateString;
        // 满足某个条件后，插入记录
        if (isThisMonth) {
            dateEL.innerHTML += `
        <span class="count">2</span>
        <span class="out">-2000</span>
        <span class="in">+2000</span>
        `
        }
        datesEL.append(dateEL);
    }
}

const getDayCount = (year, month) => {
    return new Date(year, month, 0).getDate();
}

const getDayOfFirstDate = () => {
    let day = new Date(year, month - 1, 1).getDay();
    return day === 0 ? 7 : day;
}