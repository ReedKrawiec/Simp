'use strict'
let simp =  require("../simp.js");
let assert = require("chai").assert
describe("Formatting",()=>{
  it("should format dates",()=>{
    assert.equal(simp(new Date("11/11/2016")).format(">m</>d</>y< >D< >m< >Mo<"),"11/11/2016 Friday 11 November")
  }),
  it("should format time between dates",()=>{
    assert.equal(simp(new Date("11/11/2016")).timeUntil(new Date("11/12/2016")).format(">d<"),1);
    assert.equal(simp(new Date("2/28/2016")).timeUntil(new Date("2/28/2017")).format(">y<:>m<:>d<:>h<:>mm<:>s<:>M<"),"1:0:0:0:0:0:0");
  })
})
describe("adding",()=>{
  let to_test = ["day","year","hour","millisecond","minute","month","second"];
  let methods = ["getDate","getFullYear","getHours","getMilliseconds","getMinutes","getMonth","getSeconds"];
  let expectations = [[2,3],[2017,2018],[1,2],[1,2],[1,2],[1,2],[1,2]];
  to_test.forEach((data)=>{
    it(`should add ${data}s`,()=>{
      let index = to_test.indexOf(data);
      assert.equal(simp(new Date("1/1/2016")).add(1,data)[methods[index]](),expectations[index][0]);
      assert.equal(simp(new Date("1/1/2016")).add(2,`${data}s`)[methods[index]](),expectations[index][1]);  
    })
  }) 
})
describe("Checking",()=>{
  it("should check if a year is a leap year",()=>{
    assert.equal(simp().isLeapYear(new Date("1/1/1900")),false);
    assert.equal(simp().isLeapYear(new Date("1/1/1600")),true);
    assert.equal(simp().isLeapYear(2004),true);
    assert.equal(simp().isLeapYear(1993),false);
  })
})
describe("Getting",()=>{
  it("should get days in non-leap year month",()=>{
    let dates = [31,28,31,30,31,30,31,31,30,31,30,31];
    dates.forEach((date,index)=>{
      assert.equal(simp().getDaysInMonth(index+1),date);
    })
  }),
  it("should get leap year days in month",()=>{
    assert.equal(simp().getDaysInMonth(2,true),29);
    assert.equal(simp().getDaysInMonth(1),31);
  }),
  it("should get time between dates",()=>{
    assert.equal(simp(new Date("11/11/2016")).timeUntil(new Date("11/12/2016")).data.days,1);
    assert.equal(simp(new Date("11/11/2016")).timeUntil(new Date("12/11/2016")).data.months,1);
    assert.equal(simp(new Date("2/28/2013")).timeUntil(new Date("2/28/2014")).data.years,1);
    assert.equal(simp(new Date("2/28/2016")).timeUntil(new Date("2/28/2017")).data.years,1);
  })
  it("should get months",()=>{
    let months_array = ["January","February","March","April","May","June","July","August","September","October","November","December"]
    for(let a = 0;a<12;a++){
      assert.equal(simp(new Date(`${a+1}/1/2016`)).getMonth(),months_array[a]);
    }
  })
  it("should get days",()=>{
    let days_array = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    for(let a = 0;a<7;a++){
      let day1 = simp(new Date(`11/${a+1}/2015`)).getDay()
      let day2 = days_array[a];
      assert.equal(day1,day2);
    }
  })
  let inputs = ["day","month","year","week"];
  let results = [new Date("Thu Nov 17 2016 23:59:59").toLocaleString(),new Date("Wed Nov 30 2016 23:59:59").toLocaleString(),new Date("Sat Dec 31 2016 23:59:59").toLocaleString(),new Date("Sat Nov 19 2016 23:59:59").toLocaleString()];
  let test_date = new Date("11/17/2016")
  inputs.forEach((input,index)=>{
    it(`should get the end of a ${input}`,()=>{
      assert.equal(simp(test_date).endOf(inputs[index]).result().toLocaleString(),results[index]);
    })
  })
  let inputs2 = ["day","month","year","week"];
  let results2 = [new Date("Thu Nov 17 2016 0:0:0").toLocaleString(),new Date("Tue Nov 1 2016 0:0:0").toLocaleString(),new Date("Fri Jan 1 2016 0:0:0").toLocaleString(),new Date("Sun Nov 13 2016 0:0:0").toLocaleString()];
  test_date = new Date("11/17/2016")
  inputs2.forEach((input,index)=>{
    it(`should get the start of a ${input}`,()=>{
      assert.equal(simp(test_date).startOf(inputs[index]).result().toLocaleString(),results2[index]);
    })
  })
})
