"use strict";
var simp = {
    /**
     * @param  {Date} date
     * @param  {string} format
     * @returns string
     */
    getFormattedDate: function (date, format, charsObj) {
        if (charsObj === void 0) { charsObj = {
            daysChar: "d",
            monthChar: "m",
            yearsChar: "y",
            hoursChar: "h",
            minutesChar: "mm",
            secondsChar: "s",
            millisecondsChar: "M"
        }; }
        var data_array = [date.getDate(), date.getMonth() + 1, date.getFullYear(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()];
        var keys = Object.keys(charsObj);
        keys.forEach(function (char, index) {
            if (format.indexOf(">" + charsObj[char] + "<") > -1) {
                var format_split1 = format.substring(0, format.indexOf(">" + charsObj[char]));
                var format_split2 = format.substring(format.indexOf(charsObj[char] + "<") + charsObj[char].length + 1);
                format = format_split1 + data_array[index] + format_split2;
            }
        });
        return format;
    },
    getDaysInMonth: function (month, leapYear) {
        if (leapYear === void 0) { leapYear = false; }
        month--;
        var dates = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        var days = dates[month];
        if (month === 1 && leapYear)
            days++;
        return days;
    },
    getEndOfMonth: function (date_input) {
        var days_in_month;
        var month = date_input.getMonth() + 1;
        var year = date_input.getFullYear();
        if ((year % 4 == 0) && (year % 100 != 0) || (year % 400 == 0)) {
            days_in_month = this.getDaysInMonth(month, true);
        }
        else {
            days_in_month = this.getDaysInMonth(month);
        }
        return new Date(year, month - 1, days_in_month, 23, 59, 59, 999);
    },
    getEndOfDay: function (date_input) {
        return new Date(date_input.getFullYear(), date_input.getMonth(), date_input.getDate(), 23, 59, 59, 999);
    },
    getEndOfYear: function (date_input) {
        return new Date(date_input.getFullYear(), 11, 31, 23, 59, 59, 999);
    },
    getTimeBetweenDates: function (date1, date2) {
        var later_date;
        var prior_date;
        var millisecond_difference;
        var milliseconds_in_day = 24 * 60 * 60 * 1000;
        var milliseconds_in_hour = 1000 * 60 * 60;
        var milliseconds_in_minute = 1000 * 60;
        var milliseconds_in_second = 1000;
        var days;
        var hours;
        var minutes;
        var seconds;
        var milliseconds;
        if (date1 > date2) {
            later_date = date1;
            prior_date = date2;
        }
        else {
            later_date = date2;
            prior_date = date1;
        }
        millisecond_difference = later_date - prior_date;
        days = Math.floor(millisecond_difference / milliseconds_in_day);
        millisecond_difference %= milliseconds_in_day;
        hours = Math.floor(millisecond_difference / milliseconds_in_hour);
        millisecond_difference %= milliseconds_in_hour;
        minutes = Math.floor(millisecond_difference / milliseconds_in_minute);
        millisecond_difference %= milliseconds_in_minute;
        seconds = Math.floor(millisecond_difference / milliseconds_in_second);
        millisecond_difference %= milliseconds_in_second;
        milliseconds = millisecond_difference;
        return { days: days, hours: hours, minutes: minutes, seconds: seconds, milliseconds: milliseconds };
    },
    getFormattedTimeBetweenDates: function (date1, date2, format, formatChars) {
        if (formatChars === void 0) { formatChars = {
            daysChar: "d",
            hoursChar: "h",
            minutesChar: "mm",
            secondsChar: "s",
            millisecondsChar: "M"
        }; }
        var dateDiffObj = simp.getTimeBetweenDates(date1, date2);
        var data_array = [dateDiffObj.days, dateDiffObj.hours, dateDiffObj.minutes, dateDiffObj.seconds, dateDiffObj.milliseconds];
        var keys = Object.keys(formatChars);
        keys.forEach(function (char, index) {
            if (format.indexOf(">" + formatChars[char] + "<") > -1) {
                var format_split1 = format.slice(0, format.indexOf(">" + formatChars[char]));
                var format_split2 = format.slice(format.indexOf(formatChars[char] + "<") + formatChars[char].length + 1);
                format = format_split1 + data_array[index] + format_split2;
            }
        });
        return format;
    },
    getDate: function (date) {
        return date.getDate();
    },
    getYear: function (date) {
        return date.getFullYear();
    },
    getMonth: function (date) {
        switch (date.getMonth()) {
            case 0: return "January";
            case 1: return "February";
            case 2: return "March";
            case 3: return "April";
            case 4: return "May";
            case 5: return "June";
            case 6: return "July";
            case 7: return "August";
            case 8: return "September";
            case 9: return "October";
            case 10: return "November";
            case 11: return "December";
        }
    },
    getDay: function (date) {
        switch (date.getDay()) {
            case 0: return "Sunday";
            case 1: return "Monday";
            case 2: return "Tuesday";
            case 3: return "Wednesday";
            case 4: return "Thursday";
            case 5: return "Friday";
            case 6: return "Saturday";
        }
    }
};
exports.__esModule = true;
exports["default"] = simp;
