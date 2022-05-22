import OrderService from './service.js';


describe("price", () => {

  test("price en doc", () => {
    expect(OrderService.getPrice('en','.doc',2000)).toBe(240);
  });
  test("price uk doc", () => {
    expect(OrderService.getPrice('uk','.doc',2000)).toBe(100);
  });
  test("price uk html", () => {
    expect(OrderService.getPrice('uk','html',2000)).toBe(120);
  });
  test("min price uk doc", () => {
    expect(OrderService.getPrice('uk','.doc',15)).toBe(50);
  });
});
describe("work time", () => {

  test("time uk doc", () => {
    expect(OrderService.getWorkTime('uk','.doc',13330)).toBe(10.5);
  });
  test("time en doc", () => {
    expect(OrderService.getWorkTime('en','.doc',3330)).toBe(10.5);
  });
  test("time en html", () => {
    expect(OrderService.getWorkTime('en','html',3330)).toBe(12.6);
  });
  test("min time en html", () => {
    expect(OrderService.getWorkTime('en','html',15)).toBe(1.0);
  });
});

describe("doneWorkHoursForCurWeek", () => {

  test("Friday 12:00", () => {
    expect(OrderService.doneWorkHoursForCurWeek(4,12)).toBe(38);
  });
  test("Saturday 12:00", () => {
    expect(OrderService.doneWorkHoursForCurWeek(5,12)).toBe(45);
  });
  test("Friday 20:00", () => {
    expect(OrderService.doneWorkHoursForCurWeek(4,20)).toBe(45);
  });
  test("Monday 12:00", () => {
    expect(OrderService.doneWorkHoursForCurWeek(0,12)).toBe(2);
  });
});

describe("getDayOfWeek", () => {

  test("Sanday", () => {
    expect(OrderService.getDayOfWeek()).toBe(6);
  });

});
describe("getHoursToDeadline", () => {

  test("en,.doc,3330", () => {
    expect(OrderService.getHoursToDeadline('en','.doc',3330)).toBe(203.5);
  });

});