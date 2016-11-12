interface timeDifferenceObj{
  days:number,
  hours:number;
  minutes:number,
  seconds:number,
  milliseconds:number
}
interface dateFormatterChars{
  daysChar:string,
  monthChar:string,
  yearsChar:string,
  hoursChar:string,
  minutesChar:string,
  secondsChar:string,
  millisecondsChar:string
}
interface formattedTimeBetweenDatesChars{
  daysChar:string,
  hoursChar:string,
  minutesChar:string,
  secondsChar:string,
  millisecondsChar:string
}
let simp = {
  /**
   * @param  {Date} date
   * @param  {string} format
   * @returns string
   */
  getFormattedDate:(date:Date,format:string,
    charsObj:dateFormatterChars = {
      daysChar:"d",
      monthChar:"m",
      yearsChar:"y",
      hoursChar:"h",
      minutesChar:"mm",
      secondsChar:"s",
      millisecondsChar:"M"
    }
    ):string=>{
    let data_array = [date.getDate(),date.getMonth()+1,date.getFullYear(),date.getHours(),date.getMinutes(),date.getSeconds(),date.getMilliseconds()];
    let keys = Object.keys(charsObj);
    keys.forEach((char,index)=>{
      if(format.indexOf(">"+charsObj[char]+"<") > -1){
        let format_split1 = format.substring(0,format.indexOf(">"+charsObj[char]));
        let format_split2 = format.substring(format.indexOf(charsObj[char]+"<")+charsObj[char].length+1);
        format = format_split1 + data_array[index] + format_split2;
      }
    })
    return format;
  },
  getDaysInMonth(month:number,leapYear=false):number{
    month--;
    let dates = [31,28,31,30,31,30,31,31,30,31,30,31];
    let days = dates[month];
    if(month === 1 && leapYear)
      days++;
    return days;  
  },
  getEndOfMonth(date_input:Date):Date{
    let days_in_month;
    let month = date_input.getMonth()+1;
    let year = date_input.getFullYear();
    if((year % 4 == 0) && (year % 100 != 0) || (year % 400 == 0)){
      days_in_month = this.getDaysInMonth(month,true)
    }
    else{
      days_in_month = this.getDaysInMonth(month);
    }
    return new Date(year,month-1,days_in_month,23,59,59,999);
  },
  getEndOfDay(date_input):Date{
    return new Date(date_input.getFullYear(),date_input.getMonth(),date_input.getDate(),23,59,59,999);
  },
  getEndOfYear(date_input):Date{
    return new Date(date_input.getFullYear(),11,31,23,59,59,999);
  },
  getTimeBetweenDates:(date1:Date,date2:Date):timeDifferenceObj=>{
    let later_date:Date;
    let prior_date:Date;
    let millisecond_difference;
    let milliseconds_in_day:number = 24 * 60 * 60 * 1000;
    let milliseconds_in_hour:number = 1000 * 60 * 60;
    let milliseconds_in_minute:number = 1000 * 60;
    let milliseconds_in_second:number = 1000;
    let days:number;
    let hours:number;
    let minutes:number;
    let seconds:number;
    let milliseconds:number;
    if(date1 > date2){
      later_date = date1;
      prior_date = date2;
    }
    else{
      later_date = date2;
      prior_date = date1;
    }
    millisecond_difference = <number><any>later_date - <number><any>prior_date;
    days = Math.floor(millisecond_difference/milliseconds_in_day);
    millisecond_difference %= milliseconds_in_day;
    hours = Math.floor(millisecond_difference/milliseconds_in_hour);
    millisecond_difference %= milliseconds_in_hour;
    minutes = Math.floor(millisecond_difference/milliseconds_in_minute);
    millisecond_difference %= milliseconds_in_minute;
    seconds = Math.floor(millisecond_difference/milliseconds_in_second);
    millisecond_difference %= milliseconds_in_second;
    milliseconds = millisecond_difference;
    return {days,hours,minutes,seconds,milliseconds}
  },
  getFormattedTimeBetweenDates:(date1:Date,date2:Date,format:string,formatChars:formattedTimeBetweenDatesChars = {
    daysChar:"d",
    hoursChar:"h",
    minutesChar:"mm",
    secondsChar:"s",
    millisecondsChar:"M"
  })=>{
    let dateDiffObj:timeDifferenceObj = simp.getTimeBetweenDates(date1,date2);
    let data_array = [dateDiffObj.days,dateDiffObj.hours,dateDiffObj.minutes,dateDiffObj.seconds,dateDiffObj.milliseconds];
    let keys = Object.keys(formatChars); 
    keys.forEach((char,index)=>{
      if(format.indexOf(">"+formatChars[char]+"<")>-1){
        let format_split1 = format.slice(0,format.indexOf(">"+formatChars[char]));
        let format_split2 = format.slice(format.indexOf(formatChars[char]+"<")+formatChars[char].length+1);
        format = format_split1 + data_array[index] + format_split2;
      }
    })

    return format;
  },
  getDate:(date:Date):number=>{
    return date.getDate();
  },
  getYear:(date:Date):number=>{
    return date.getFullYear();
  },
  getMonth:(date:Date):string=>{
    switch(date.getMonth() - 1){
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
  getDay:(date:Date):string=>{
    switch(date.getDay()){
      case 0: return "Sunday";
      case 1: return "Monday";
      case 2: return "Tuesday";
      case 3: return "Wednesday";
      case 4: return "Thursday";
      case 5: return "Friday";
      case 6: return "Saturday";
    }
  }
}

export default simp;