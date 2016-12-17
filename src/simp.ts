interface timeDifferenceObj{
  days:number,
  hours:number;
  minutes:number,
  seconds:number,
  milliseconds:number
  months:number,
  years:number
}
interface dateFormatterChars{
  daysChar:string,
  monthChar:string,
  yearsChar:string,
  hoursChar:string,
  minutesChar:string,
  secondsChar:string,
  millisecondsChar:string,
  fulldayChar:string,
  fullmonthChar:string
}
interface formattedTimeBetweenDatesChars{
  daysChar:string,
  monthsChar:string,
  yearsChar:string,
  hoursChar:string,
  minutesChar:string,
  secondsChar:string,
  millisecondsChar:string
}
let simp = {
  getYear:(date:Date):number=>{
    return date.getFullYear();
  },
  getMonth:(date:Date|number):string=>{
    let switch_var;
    if(typeof date === "number"){
      switch_var = date;
    }
    else if(date instanceof Date){
      switch_var = date.getMonth();
    }
    switch(switch_var){
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
  getDay:(date:Date|number):string=>{
    let switch_var;
    if(typeof date === "number"){
      switch_var = date;
    }
    else if(date instanceof Date){
      switch_var = date.getDay();
    }
    switch(switch_var){
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
  getFormattedDate:(date:Date,format:string,
    charsObj:dateFormatterChars = {
      daysChar:"d",                  
      monthChar:"m",             
      yearsChar:"y",
      hoursChar:"h",
      minutesChar:"mm",
      secondsChar:"s",
      millisecondsChar:"M",
      fulldayChar:"D",
      fullmonthChar:"Mo"              
    }
    ):string=>{
    let data_array = [date.getDate(),date.getMonth()+1,date.getFullYear(),date.getHours(),date.getMinutes(),date.getSeconds(),date.getMilliseconds(),simp.getDay(date),simp.getMonth(date)];
    let keys = Object.keys(charsObj);
    keys.forEach((char,index)=>{
      let indexTracker = 0;
      while(format.indexOf(">"+charsObj[char]+"<") > -1){
        indexTracker = format.indexOf(">"+charsObj[char]+"<");
        let format_split1 = format.substring(0,format.indexOf(">"+charsObj[char]));
        let format_split2 = format.substring(format.indexOf(charsObj[char]+"<")+charsObj[char].length+1);
        format = format_split1 + data_array[index] + format_split2;
      }
    })
    return format;
  },
  manipulate(date:Date){
    let internal_date = date;
    let remove_func;
    let add_func
    add_func = (x,y)=>{
      internal_date = simp.add(internal_date,x,y);
      return {add:add_func,
              remove:remove_func,
              result:()=>{return internal_date}};
    }
    remove_func = (x,y)=>{
      internal_date = simp.add(internal_date,x*-1,y);
      return {add:add_func,
              remove:remove_func,
              result:()=>{return internal_date}}
    }
    return {
      add:add_func,
      remove:remove_func
    }
  },
  add(date:Date,amount:number,type:string){
    let new_date:any = new Date(date.getTime());
    let methods = ["Date","FullYear","Hours","Milliseconds","Minutes","Month","Seconds"];
    let types = ["days","years","hours","milliseconds","minutes","months","seconds"];
    if(type[type.length-1] !== "s")
      type+="s";
    let index = types.indexOf(type);
    if(index === -1)
      throw new Error("Unknown add type.");
    new_date[`set${methods[index]}`](new_date[`get${methods[index]}`]()+amount);
    return new_date;
  },
  getDaysInMonth(month:number,leapYear=false):number{
    month--;
    let dates = [31,28,31,30,31,30,31,31,30,31,30,31];
    let days = dates[month];
    if(month === 1 && leapYear)
      days++;
    return days;  
  },
  isLeapYear(input:number|Date):boolean{
    let toCheck:number;
    if(typeof input === "number")
      toCheck = input;
    if(input instanceof Date)
      toCheck = input.getFullYear();
    return (((toCheck % 4 === 0) && (toCheck % 100 !== 0)) || (toCheck % 400 === 0));
  },
  now():Date{
    return new Date();
  },
  getEnd(date_input:Date,type:string):Date{
    let methods = ["getEndOfDay","getEndOfMonth","getEndOfYear","getEndOfWeek"];
    let inputs = ["day","month","year","week"];
    let index = inputs.indexOf(type);
    if(index === -1)
      throw new Error(`Unknown getEnd input type(${type}))`);
    return simp[methods[index]](date_input);
  },
  getEndOfWeek(date_input:Date):Date{
    let day_offset = 6 - date_input.getDay();
    let type:string = "days";
    return new Date(date_input.getFullYear(),date_input.getMonth(),date_input.getDate()+day_offset,23,59,59,999);
  },
  getEndOfMonth(date_input:Date):Date{
    let days_in_month;
    let month = date_input.getMonth()+1;
    let year = date_input.getFullYear();
    if(simp.isLeapYear(year)){
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
  getStartOfWeek(date_input):Date{
    let day_offset = date_input.getDay();
    return new Date(date_input.getFullYear(),date_input.getMonth(),date_input.getDate() - day_offset,0,0,0,0);
  },
  getStartOfMonth(date_input:Date):Date{
    return new Date(date_input.getFullYear(),date_input.getMonth(),1,0,0,0,0)
  },
  getStartOfYear(date_input:Date):Date{
    return new Date(date_input.getFullYear(),0,1,0,0,0,0);
  },
  getStartOfDay(date_input:Date):Date{
    return new Date(date_input.getFullYear(),date_input.getMonth(),date_input.getDate(),0,0,0,0);
  },
  getStart(date_input,type:string):Date{
    let methods = ["getStartOfDay","getStartOfMonth","getStartOfYear","getStartOfWeek"];
    let inputs = ["day","month","year","week"];
    let index = inputs.indexOf(type);
    if(index === -1)
      throw new Error(`Unknown getStart input type(${type}))`);
    return simp[methods[index]](date_input);
  },
  getTimeBetweenDates:(date1:Date,date2:Date):any=>{
    let later_date:Date;
    let prior_date:Date;
    let millisecond_difference;
    let milliseconds_array = [24 * 60 * 60 * 1000,1000 * 60 * 60,1000 * 60,1000,1]
    let data_names = ["days","hours","minutes","seconds","milliseconds"]
    let data = [];
    let obj_to_return:any = {};
    if(date1 > date2){
      later_date = date1;
      prior_date = date2;
    }
    else{
      later_date = date2;
      prior_date = date1;
    }
    millisecond_difference = <number><any>later_date - <number><any>prior_date;
    milliseconds_array.forEach((val)=>{
      data.push(Math.floor(millisecond_difference/val))
      millisecond_difference %= val;
    })
    data_names.forEach((val,index)=>{
      obj_to_return[val] = data[index];
    });
    let months_calc = [obj_to_return.days,0,0];
    let month_counter = date1.getMonth();
    while(months_calc[0] >= simp.getDaysInMonth(month_counter+1,simp.isLeapYear(date1.getFullYear()+months_calc[2]))){
      months_calc[0]-=simp.getDaysInMonth(month_counter+1,simp.isLeapYear(date1.getFullYear()+months_calc[2]));
      months_calc[1]++;
      month_counter++;
      if(months_calc[1] === 12){
        months_calc[2]++;
        months_calc[1] = 0;
      }
      if(month_counter === 12){
        month_counter = 0;
      }
    }
    obj_to_return.days = months_calc[0];
    obj_to_return.months = months_calc[1];
    obj_to_return.years = months_calc[2];
    return obj_to_return;
  },
  getFormattedTimeBetweenDates:(date1:Date,date2:Date,format:string,formatChars:formattedTimeBetweenDatesChars = {
    daysChar:"d",
    monthsChar:"m",
    yearsChar:"y",
    hoursChar:"h",
    minutesChar:"mm",
    secondsChar:"s",
    millisecondsChar:"M"
  })=>{
    let dateDiffObj:timeDifferenceObj = simp.getTimeBetweenDates(date1,date2);
    let data_array = [dateDiffObj.days,dateDiffObj.months,dateDiffObj.years,dateDiffObj.hours,dateDiffObj.minutes,dateDiffObj.seconds,dateDiffObj.milliseconds];
    let keys = Object.keys(formatChars); 
    keys.forEach((char,index)=>{
      let indexTracker = 0;
      while(format.indexOf(">"+formatChars[char]+"<")>-1){
        indexTracker = format.indexOf(">"+formatChars[char]+"<");
        let format_split1 = format.slice(0,format.indexOf(">"+formatChars[char]));
        let format_split2 = format.slice(format.indexOf(formatChars[char]+"<")+formatChars[char].length+1);
        format = format_split1 + data_array[index] + format_split2;
      }
    })

    return format;
  },
  getDate:(date:Date):number=>{
    return date.getDate();
  }
}

let simpChain = (dateObj = new Date())=>{
  let internal_obj = new Date(dateObj.getTime());
    let methods = {
      add:(x,y)=>{
        internal_obj = simp.add(internal_obj,x,y);
        return internal_obj;
      },
      remove:(x,y)=>{
        internal_obj = simp.add(internal_obj,x*-1,y);
        return methods;
      },
      endOf:(x)=>{
        internal_obj = simp.getEnd(internal_obj,x);
        return methods;
      },
      startOf:(x)=>{
        internal_obj = simp.getStart(internal_obj,x);
        return methods;
      },
      getDay:(x,y)=>{
        return simp.getDay(internal_obj);
      },
      getMonth:(x,y)=>{
        return simp.getMonth(internal_obj);
      },  
      format:(x)=>{
        return simp.getFormattedDate(internal_obj,x);
      },
      result:()=>{
        return internal_obj;
      },
      getDaysInMonth:(x,y)=>{
        return simp.getDaysInMonth(x,y)
      },
      isLeapYear(x){
        return simp.isLeapYear(x)
      },
      now(){
        internal_obj = new Date();
        return methods;
      },
      timeUntil(date_input){
        let data = simp.getTimeBetweenDates(internal_obj,date_input);
        return {data:data,format:(x)=>{return simp.getFormattedTimeBetweenDates(internal_obj,date_input,x)}}
      },
      getTimeBetweenDates:(date1,date2)=>{
        let data = simp.getTimeBetweenDates(date1,date2);
        return {data:data,format:(x)=>{return simp.getFormattedTimeBetweenDates(date1,date2,x)}}
      }
    }
    return methods;
  }
export = simpChain;
