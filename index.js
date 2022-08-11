// Your code here

function createEmployeeRecord ([firstName, familyName, title, payPerHour]) {
    const employeeArray = [firstName, familyName, title, payPerHour]
    const employeeRecord = {
        firstName: employeeArray[0],
        familyName: employeeArray[1],
        title: employeeArray[2],
        payPerHour: employeeArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employeeRecord
}
// console.log(createEmployeeRecord(["Gray", "Worm", "Security", 1]))

function createEmployeeRecords(arrayOfArrays) {
    return arrayOfArrays.map(createEmployeeRecord)
}
// console.log(createEmployeeRecords([["moe", "sizlak", "barkeep", 2], ["bartholomew", "simpson", "scamp", 3]]))

function createTimeInEvent(employeeRecord, dateStamp){
    const type = 'TimeIn'
    let [date, hour] = dateStamp.split(' ')
    hour = parseInt(hour)
    employeeRecord.timeInEvents.push({type, date, hour})
    return employeeRecord
}

function createTimeOutEvent (employeeRecord, dateStamp){
    const type = 'TimeOut'
    let [date, hour] = dateStamp.split(' ')
    hour = parseInt(hour)
    employeeRecord.timeOutEvents.push({type,date,hour})
    return employeeRecord
}

function hoursWorkedOnDate (employeeRecord, date) {
    let timeIn = employeeRecord.timeInEvents.filter(array => array.date === date).map(array => array.hour)
    let timeOut = employeeRecord.timeOutEvents.filter(array => array.date === date).map(array => array.hour)
    const hoursWorked = timeOut - timeIn
    return hoursWorked / 100
}

function wagesEarnedOnDate (employeeRecord, date) {
    // let timeIn = employeeRecord.timeInEvents.filter(array => array.date === date).map(array => array.hour)
    // let timeOut = employeeRecord.timeOutEvents.map(array => array.hour)
    // const hoursWorked = (timeOut - timeIn) / 100
    // let hourlyRate = employeeRecord.payPerHour
    // return hour
    const daysWages = hoursWorkedOnDate(employeeRecord, date) * employeeRecord.payPerHour
    // console.log(daysWages)
    return daysWages
}

function allWagesFor (employeeRecord) {
    const total = []
    const daysWorked = employeeRecord.timeInEvents.map(item => item.date)
    console.log(daysWorked)
    for(let item of daysWorked){
        // console.log(item)
        total.push(wagesEarnedOnDate(employeeRecord, item))
    }
    // console.log(total)
    return total.reduce((index1, index2) => index1 + index2, 0)
}

function calculatePayroll (arrayOfEmployeeRecords) {
    const allWages = arrayOfEmployeeRecords.map(employeeRecord => allWagesFor(employeeRecord))
    return allWages.reduce((index1, index2) => index1 + index2, 0)
}