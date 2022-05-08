const fs = require('fs');
const resData = [];

fs.readFile('../vacation/vacation.json', 'utf-8', (err, jsonString) => {
  const data = JSON.parse(jsonString);
  for (let i = 0; i < data.length; i++) {
    const id = data[i].user._id;
    const index = resData.indexOf(resData.find((user) => user.userId === id));
    if (index == -1) {
      resData.push({
        userId: id,
        name: data[i].user.name,
        weekendDates: [{
          startDate: data[i].startDate,
          endDate: data[i].endDate
        }]
      })
    }
    else{
      resData[index].weekendDates.push({
        startDate: data[i].startDate,
        endDate: data[i].endDate
      })
    }
  }
  fs.writeFile('../vacation/vacation.json',JSON.stringify(resData, null, 2), err => {
    if (err) {
      console.log(err);
    }
  })
})