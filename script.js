const toggle = document.querySelectorAll('.check')
const taskNames = document.querySelectorAll('.task-name')
const taskTimes = document.querySelectorAll('.task-time')
const taskNotes = document.querySelectorAll('.task-note')

toggle.forEach(function(toggle, index) {
    toggle.addEventListener('click', function() {
        if (toggle.checked) {
            taskNames[index].style.opacity= '.60'
            taskTimes[index].style.opacity= '.60'
            taskNotes[index].style.opacity= '.60'
        } else {
            taskNames[index].style.opacity= '1'
            taskTimes[index].style.opacity= '1'
            taskNotes[index].style.opacity= '1'
        }
    })
})