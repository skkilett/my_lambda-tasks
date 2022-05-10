const fs = require('fs');
const resData = [];
const map = new Map();

fs.readFile('../vacation/vacation.json', 'utf-8', (err, jsonString) => {
  const data = JSON.parse(jsonString);
  for (let i = 0; i < data.length; i++) {
    const id = data[i]._id;

    if (map.has(id))
    {
      map.get(id).weekendDates.push({
        startDate: data[i].startDate,
        endDate: data[i].endDate
      })
    }
    else
    {
      map.set(id, {
          id: data[i].user._id,
          name: data[i].user.name,
          weekendDates: [{
            startDate: data[i].startDate,
            endDate: data[i].endDate
          }]
        });
    }
  }
  fs.writeFile('../vacation/vacation.json',JSON.stringify([...map.values()], null, 2), err => {
    if (err) {
      console.log(err);
    }
  })
})