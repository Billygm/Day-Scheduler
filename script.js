var currentDay = $('#currentDay')
var container = $('.container')

var currentHour = moment().format('H')
var today = moment().format('dddd, MMMM Do')
currentDay.text(today)

for (var i = 9; i <= 17; i++) {
    var displayTime = i
    if (i < 12) {
        displayTime = i + ' am'
    } else if (i === 12) {
        displayTime = i + ' pm'
    } else if (i > 12) {
        displayTime = i - 12 + ' pm'
    } else if (i === 24) {
        displayTime = i - 12 + ' am'
    }
    // create an HTML block for each hour of the day
    // saving the current hour to a data atribute so it can be accesssed from an event listener
    var timeblockStyle = ''
    if (i < currentHour) {
        timeblockStyle = 'background-color: gray;'
    } else if (i == currentHour) {
        timeblockStyle = 'background-color: red;'
    } else {
        timeblockStyle = 'background-color: green;'
    }

    var savedValueForHour = localStorage.getItem('hour-' + i)

    var timeblockEl = `<div class=my-3 row align-items-stretch text-right p-0'>
    <label class='p-2 border'>${displayTime}</label>
    <textarea class='form-control col-10' id='hour-${i}' style='${timeblockStyle}'>${savedValueForHour}</textarea>
    <button class='btn border p-2 fas fa-lock' type='submit' id='button-addon2'></button>
    </div>`

    container.append(timeblockEl)


}

var scheduledTask
container.on('click', 'button', function (event) {
    var input = $(this).siblings('textarea').attr('id')
    scheduledTask = $(this).siblings('textarea').val()
    localStorage.setItem(input, scheduledTask)
});