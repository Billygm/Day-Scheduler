var currentDay = $('#currentDay')
var container = $('.container')
var currentHour = moment().format('H')

currentDay.text(moment().format('dddd, MMMM Do'))

// loop from 9-17 (9AM-5PM)
for (var i = 9; i <= 17; i++) {
    // translates the time displayed from millitary
    var displayTime = i
    if (i < 12) {
        displayTime = i + 'AM'
    } else if (i === 12) {
        displayTime = i + 'PM'
    } else if (i > 12) {
        displayTime = i - 12 + 'PM'
    } else if (i===24) {
        displayTime = i - 12 + 'AM'
    }
   
    // styles for past, present, and future timeblocks
    var timeblockStyle = ''
    if (i < currentHour) {
        timeblockStyle = 'background-color: #bc4749; color: #f2e8cf'
    } else if (i == currentHour) {
        timeblockStyle = 'background-color: #ffd166; color: #386641'
    } else {
        timeblockStyle = 'background-color: #6a994e; color: #f2e8cf'
    }
    
    var buttonStyle = 'background-color: #073b4c; color: #6a994e'
    var displayStyles = 'display:flex'

    // gets the saved tasks for each hour
    var tasksForHour = localStorage.getItem('hour-' + i)
    if (!tasksForHour) {
        tasksForHour = ''
    }

    // template litteral creating the html elements for the time blocks
    var timeblockEl = `<div class='p-0' style='${displayStyles}'>
    <label class='py-3 border-top border-dark col-1 text-right'>${displayTime}</label>
    <textarea class='form-control p-3 border-dark' id='hour-${i}' style='${timeblockStyle}'>${tasksForHour}</textarea>
    <button class='btn far fa-save border-dark col-1' type='submit' style='${buttonStyle}'></button>
    </div>`
    container.append(timeblockEl)
}

// saves the tasks when the save button is clicked
var scheduledTask
container.on('click', 'button', function () {
    var input = $(this).siblings('textarea').attr('id')
    scheduledTask = $(this).siblings('textarea').val()
    localStorage.setItem(input, scheduledTask)
});