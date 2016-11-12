'use strict'
let simp =  require("../simp.js").default;
let assert = require("chai").assert
describe("Test",()=>{
  it("should format dates",()=>{
    assert.equal(simp.getFormattedDate(new Date("11/11/2016"),">m</>d</>y<"),"11/11/2016");
  }),
  it("should get days in non-leap year month",()=>{
    let dates = [31,28,31,30,31,30,31,31,30,31,30,31];
    dates.forEach((date,index)=>{
      assert.equal(simp.getDaysInMonth(index+1),date);
    })
  }),
  it("should get leap year days in month",()=>{
    assert.equal(simp.getDaysInMonth(2,true),29);
    assert.equal(simp.getDaysInMonth(1),31);
  }),
  it("should get end of month",()=>{
    assert.equal(simp.getFormattedDate(simp.getEndOfMonth(new Date("11/11/2016")),">m<:>d<:>y<:>h<:>mm<:>s<:>M<"),"11:30:2016:23:59:59:999");
  }),
  it("should get end of day",()=>{
    assert.equal(simp.getFormattedDate(simp.getEndOfDay(new Date("11/11/2016")),">m<:>d<:>y<:>h<:>mm<:>s<:>M<"),"11:11:2016:23:59:59:999");
  })
  it("should get end of year",()=>{
    assert.equal(simp.getFormattedDate(simp.getEndOfYear(new Date("11/11/2016")),">m<:>d<:>y<:>h<:>mm<:>s<:>M<"),"12:31:2016:23:59:59:999");
  })
  it("should get time between dates",()=>{
    assert.equal(simp.getTimeBetweenDates(new Date("11/11/2016"),new Date("11/12/2016")).days,1);
    assert.equal(simp.getTimeBetweenDates(new Date("11/11/2016"),new Date("12/11/2016")).days,30);
    assert.equal(simp.getTimeBetweenDates(new Date("11/11/2016"),new Date("11/11/2017")).days,365);
    assert.equal(simp.getTimeBetweenDates(new Date("2/28/2016"),new Date("2/28/2017")).days,366);  
  })
  it("should format time between dates",()=>{
    assert.equal(simp.getFormattedTimeBetweenDates(new Date("11/11/2016"),new Date("11/12/2016"),">d<"),1)
    assert.equal(simp.getFormattedTimeBetweenDates(new Date("2/28/2016"),new Date("2/28/2017"),">d<:>h<:>mm<:>s<:>M<"),"366:0:0:0:0");
  })
  it("should get months",()=>{
    let months_array = ["January","February","March","April","May","June","July","August","September","October","November","December"]
    for(let a = 0;a<12;a++){
      assert.equal(simp.getMonth(new Date(`${a+1}/1/2016`)),months_array[a]);
    }
  })
  it("should get days",()=>{
    let days_array = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    for(let a = 0;a<7;a++){
      let day1 = simp.getDay(new Date(`11/${a+1}/2015`))
      let day2 = days_array[a]
      assert.equal(day1,day2);
    }
  })
})
