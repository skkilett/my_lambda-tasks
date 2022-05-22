const today = new Date();
export default new class OrderService{
  getData(req){
    return req.body;
  }

  priceOfOne(language){
    return (language == 'en') ? 0.12 : 0.05;
  }

  minPrice(language){
    return (language == 'en') ? 120 : 50;
  }

  fileTypeFactor(fileType){
    return ((fileType == '.doc')||(fileType == '.docx')||(fileType == '.rtf')) ? 1.0 : 1.2;
  }

  getPrice(language,fileType,count){
    const price = count * this.priceOfOne(language) * this.fileTypeFactor(fileType);
    return (price >= this.minPrice(language)) ? price : this.minPrice(language);
  }

  speedOfEdit(language){
    return (language == 'en') ? 333 : 1333;
  } 

  getWorkTime(language,fileType,count){
    const time = (0.5 + count / this.speedOfEdit(language)) * this.fileTypeFactor(fileType);
    return (time >=  1.0) ? time : 1.0;
  }

  getCurrentDate(){
    return Date.now();
  }

  getCurrentTime(){
    return today.getHours() + today.getMinutes() * 10 / 6;
  }

  getDayOfWeek(){
    return (today.getDay() == 0) ? 6 : today.getDay() - 1;
  }

  doneWorkHoursForCurWeek(day,time){
    if (day >= 5) {
      return 45;
    }
    const doneHours = day * 9;
    if (time < 10) {
      return doneHours;
    }else if((time >= 10)&&(time <= 19)){
      return doneHours + (time - 10);
    }else {
      return doneHours + 9;
    }
  }

  getHoursFromMonday(language,fileType,count){
    let workHours = this.getWorkTime(language,fileType,count);
    workHours += this.doneWorkHoursForCurWeek(this.getDayOfWeek(), this.getCurrentTime());
    return workHours;
  }

  prevWeekStart(){
    return new Date(today.getFullYear(), today.getMonth(), today.getDate()- this.getDayOfWeek()).getTime();
  }

  hoursToMillisec(hours){
    return hours * 3600000;
  }

  millisecToSec(millisec){
    return millisec / 1000;
  }

  timeToDeadline(hours){
    return this.hoursToMillisec(hours) + this.prevWeekStart();
  }

  getHoursToDeadline(language,fileType,count){
    let workHours = this.getHoursFromMonday(language,fileType,count);
    const hourPerDay = 9;
    const workingDays = 5;
    const hourInWeek = hourPerDay * workingDays;
    const modOfHours = workHours % hourInWeek;
    const countOfFullWeeks = Math.trunc(workHours / hourInWeek);
    const countOfHours = 10 + (modOfHours % hourPerDay);
    const countOfDays = Math.trunc(modOfHours / hourPerDay);
    const hours = countOfDays * 24 + countOfFullWeeks * 168 + countOfHours;
    return hours;
  }

  deadlineDate(language,fileType,count){
    const hours = this.getHoursToDeadline(language,fileType,count)
    const date =  new Date(this.timeToDeadline(hours));
    return date.toLocaleString();
  }

  resJson(language,fileType,count){
    const hours = this.getHoursToDeadline(language,fileType,count);
    return {
      price: this.getPrice(language,fileType,count),
      time: this.getWorkTime(language,fileType,count),
      deadline: this.millisecToSec(this.timeToDeadline(hours)),
      deadline_date: this.deadlineDate(language,fileType,count)
    }
  }
}

