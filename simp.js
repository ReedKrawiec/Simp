"use strict";
var simp = {
    getYear: function (date) {
        return date.getFullYear();
    },
    getMonth: function (date) {
        var switch_var;
        if (typeof date === "number") {
            switch_var = date;
        }
        else if (date instanceof Date) {
            switch_var = date.getMonth();
        }
        switch (switch_var) {
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
        var switch_var;
        if (typeof date === "number") {
            switch_var = date;
        }
        else if (date instanceof Date) {
            switch_var = date.getDay();
        }
        switch (switch_var) {
            case 0: return "Sunday";
            case 1: return "Monday";
            case 2: return "Tuesday";
            case 3: return "Wednesday";
            case 4: return "Thursday";
            case 5: return "Friday";
            case 6: return "Saturday";
        }
    },
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
            millisecondsChar: "M",
            fulldayChar: "D",
            fullmonthChar: "Mo"
        }; }
        var data_array = [date.getDate(), date.getMonth() + 1, date.getFullYear(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds(), simp.getDay(date), simp.getMonth(date)];
        var keys = Object.keys(charsObj);
        keys.forEach(function (char, index) {
            var indexTracker = 0;
            while (format.indexOf(">" + charsObj[char] + "<") > -1) {
                indexTracker = format.indexOf(">" + charsObj[char] + "<");
                var format_split1 = format.substring(0, format.indexOf(">" + charsObj[char]));
                var format_split2 = format.substring(format.indexOf(charsObj[char] + "<") + charsObj[char].length + 1);
                format = format_split1 + data_array[index] + format_split2;
            }
        });
        return format;
    },
    manipulate: function (date) {
        var internal_date = date;
        var remove_func;
        var add_func;
        add_func = function (x, y) {
            internal_date = simp.add(internal_date, x, y);
            return { add: add_func,
                remove: remove_func,
                result: function () { return internal_date; } };
        };
        remove_func = function (x, y) {
            internal_date = simp.add(internal_date, x * -1, y);
            return { add: add_func,
                remove: remove_func,
                result: function () { return internal_date; } };
        };
        return {
            add: add_func,
            remove: remove_func
        };
    },
    add: function (date, amount, type) {
        var new_date = new Date(date.getTime());
        var methods = ["Date", "FullYear", "Hours", "Milliseconds", "Minutes", "Month", "Seconds"];
        var types = ["days", "years", "hours", "milliseconds", "minutes", "months", "seconds"];
        if (type[type.length - 1] !== "s")
            type += "s";
        var index = types.indexOf(type);
        if (index === -1)
            throw new Error("Unknown add type.");
        new_date["set" + methods[index]](new_date["get" + methods[index]]() + amount);
        return new_date;
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
    isLeapYear: function (input) {
        var toCheck;
        if (typeof input === "number")
            toCheck = input;
        if (input instanceof Date)
            toCheck = input.getFullYear();
        return (((toCheck % 4 === 0) && (toCheck % 100 !== 0)) || (toCheck % 400 === 0));
    },
    now: function () {
        return new Date();
    },
    getEnd: function (date_input, type) {
        var methods = ["getEndOfDay", "getEndOfMonth", "getEndOfYear", "getEndOfWeek"];
        var inputs = ["day", "month", "year", "week"];
        var index = inputs.indexOf(type);
        if (index === -1)
            throw new Error("Unknown getEnd input type(" + type + "))");
        return simp[methods[index]](date_input);
    },
    getEndOfWeek: function (date_input) {
        var day_offset = 6 - date_input.getDay();
        var type = "days";
        return new Date(date_input.getFullYear(), date_input.getMonth(), date_input.getDate() + day_offset, 23, 59, 59, 999);
    },
    getEndOfMonth: function (date_input) {
        var days_in_month;
        var month = date_input.getMonth() + 1;
        var year = date_input.getFullYear();
        if (simp.isLeapYear(year)) {
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
    getStartOfWeek: function (date_input) {
        var day_offset = date_input.getDay();
        return new Date(date_input.getFullYear(), date_input.getMonth(), date_input.getDate() - day_offset, 0, 0, 0, 0);
    },
    getStartOfMonth: function (date_input) {
        return new Date(date_input.getFullYear(), date_input.getMonth(), 1, 0, 0, 0, 0);
    },
    getStartOfYear: function (date_input) {
        return new Date(date_input.getFullYear(), 0, 1, 0, 0, 0, 0);
    },
    getStartOfDay: function (date_input) {
        return new Date(date_input.getFullYear(), date_input.getMonth(), date_input.getDate(), 0, 0, 0, 0);
    },
    getStart: function (date_input, type) {
        var methods = ["getStartOfDay", "getStartOfMonth", "getStartOfYear", "getStartOfWeek"];
        var inputs = ["day", "month", "year", "week"];
        var index = inputs.indexOf(type);
        if (index === -1)
            throw new Error("Unknown getStart input type(" + type + "))");
        return simp[methods[index]](date_input);
    },
    getTimeBetweenDates: function (date1, date2) {
        var later_date;
        var prior_date;
        var millisecond_difference;
        var milliseconds_array = [24 * 60 * 60 * 1000, 1000 * 60 * 60, 1000 * 60, 1000, 1];
        var data_names = ["days", "hours", "minutes", "seconds", "milliseconds"];
        var data = [];
        var obj_to_return = {};
        if (date1 > date2) {
            later_date = date1;
            prior_date = date2;
        }
        else {
            later_date = date2;
            prior_date = date1;
        }
        millisecond_difference = later_date - prior_date;
        milliseconds_array.forEach(function (val) {
            data.push(Math.floor(millisecond_difference / val));
            millisecond_difference %= val;
        });
        data_names.forEach(function (val, index) {
            obj_to_return[val] = data[index];
        });
        var months_calc = [obj_to_return.days, 0, 0];
        var month_counter = date1.getMonth();
        while (months_calc[0] >= simp.getDaysInMonth(month_counter + 1, simp.isLeapYear(date1.getFullYear() + months_calc[2]))) {
            months_calc[0] -= simp.getDaysInMonth(month_counter + 1, simp.isLeapYear(date1.getFullYear() + months_calc[2]));
            months_calc[1]++;
            month_counter++;
            if (months_calc[1] === 12) {
                months_calc[2]++;
                months_calc[1] = 0;
            }
            if (month_counter === 12) {
                month_counter = 0;
            }
        }
        obj_to_return.days = months_calc[0];
        obj_to_return.months = months_calc[1];
        obj_to_return.years = months_calc[2];
        return obj_to_return;
    },
    getFormattedTimeBetweenDates: function (date1, date2, format, formatChars) {
        if (formatChars === void 0) { formatChars = {
            daysChar: "d",
            monthsChar: "m",
            yearsChar: "y",
            hoursChar: "h",
            minutesChar: "mm",
            secondsChar: "s",
            millisecondsChar: "M"
        }; }
        var dateDiffObj = simp.getTimeBetweenDates(date1, date2);
        var data_array = [dateDiffObj.days, dateDiffObj.months, dateDiffObj.years, dateDiffObj.hours, dateDiffObj.minutes, dateDiffObj.seconds, dateDiffObj.milliseconds];
        var keys = Object.keys(formatChars);
        keys.forEach(function (char, index) {
            var indexTracker = 0;
            while (format.indexOf(">" + formatChars[char] + "<") > -1) {
                indexTracker = format.indexOf(">" + formatChars[char] + "<");
                var format_split1 = format.slice(0, format.indexOf(">" + formatChars[char]));
                var format_split2 = format.slice(format.indexOf(formatChars[char] + "<") + formatChars[char].length + 1);
                format = format_split1 + data_array[index] + format_split2;
            }
        });
        return format;
    },
    getDate: function (date) {
        return date.getDate();
    }
};
var simpChain = function (dateObj) {
    if (dateObj === void 0) { dateObj = new Date(); }
    var internal_obj = new Date(dateObj.getTime());
    var methods = {
        add: function (x, y) {
            internal_obj = simp.add(internal_obj, x, y);
            return internal_obj;
        },
        remove: function (x, y) {
            internal_obj = simp.add(internal_obj, x * -1, y);
            return methods;
        },
        endOf: function (x) {
            internal_obj = simp.getEnd(internal_obj, x);
            return methods;
        },
        startOf: function (x) {
            internal_obj = simp.getStart(internal_obj, x);
            return methods;
        },
        getDay: function (x, y) {
            return simp.getDay(internal_obj);
        },
        getMonth: function (x, y) {
            return simp.getMonth(internal_obj);
        },
        format: function (x) {
            return simp.getFormattedDate(internal_obj, x);
        },
        result: function () {
            return internal_obj;
        },
        getDaysInMonth: function (x, y) {
            return simp.getDaysInMonth(x, y);
        },
        isLeapYear: function (x) {
            return simp.isLeapYear(x);
        },
        now: function () {
            internal_obj = new Date();
            return methods;
        },
        timeUntil: function (date_input) {
            var data = simp.getTimeBetweenDates(internal_obj, date_input);
            return { data: data, format: function (x) { return simp.getFormattedTimeBetweenDates(internal_obj, date_input, x); } };
        },
        getTimeBetweenDates: function (date1, date2) {
            var data = simp.getTimeBetweenDates(date1, date2);
            return { data: data, format: function (x) { return simp.getFormattedTimeBetweenDates(date1, date2, x); } };
        }
    };
    return methods;
};
module.exports = simpChain;
//# sourceMappingURL=simp.js.map