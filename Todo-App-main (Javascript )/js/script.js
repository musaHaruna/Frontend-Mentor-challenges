const btnTheme = document.querySelector('[data-btn-theme]')
const headerElement = document.querySelector('[data-header]')
const todoTextInput = document.querySelector('[data-todo-input]')
const todoContainerElement = document.querySelector('[data-todo-container]')
const taskTemplate = document.getElementById('task-template')
const tasksLeftElement = document.querySelector('[data-tasks-left]')
const btnClearCompleted = document.querySelector('[data-btn-completed]')
const btnFilterInputs = document.querySelectorAll('[data-radio-input]')
const taskCollection = todoContainerElement.children
let tasksLeft = 0

console.log(taskCollection)
// Toggle between dark/light mode
btnTheme.addEventListener('click', () => {
  document.body.classList.toggle('dark')
  headerElement.classList.toggle('dark')
  btnTheme.classList.toggle('dark')
})

// Add a new todo
todoTextInput.addEventListener('keypress', (e) => {
  const taskName = todoTextInput.value
  if (taskName == null || taskName === '') return
  if (e.key === 'Enter') {
    createTask(taskName)
  }
})

// Remove all tasks completed
btnClearCompleted.addEventListener('click', () => {
  const todoItemsElements = [...taskCollection]
  todoItemsElements.forEach((task) => {
    if (task.classList.contains('completed')) {
      task.remove()
    }
  })
})

// Filter depending on option chosen
btnFilterInputs.forEach((btn) => {
  btn.addEventListener('click', () => {
    const filterValue = btn.dataset.radioInput
    filterTasks(filterValue)
  })
})

function createTask(taskName) {
  const task = taskTemplate.content.cloneNode(true)
  task.querySelector('p').innerText = taskName

  // Mark a task as completed
  const btnCheckbox = task.children[0].children[0].children[0]
  console.log(task.children[0])

  btnCheckbox.addEventListener('click', checkTask)

  // Delete a task
  const btnDelete = task.children[0].children[2]
  btnDelete.addEventListener('click', deleteTask)

  todoContainerElement.append(task)
  todoTextInput.value = null
  updateCount(true)
}

function checkTask(e) {
  const taskContainer = e.target.parentElement.parentElement
  if (!taskContainer.classList.contains('completed')) {
    taskContainer.classList.add('completed')
    updateCount(false)
  } else {
    taskContainer.classList.remove('completed')
    updateCount(true)
  }
}

function deleteTask(e) {
  const taskContainer = e.target.parentElement
  if (!taskContainer.classList.contains('completed')) {
    updateCount(false)
  }
  taskContainer.remove()
}

function updateCount(increment) {
  if (increment) {
    tasksLeft++
    tasksLeftElement.innerText = tasksLeft
  } else {
    tasksLeft--
    tasksLeftElement.innerText = tasksLeft
  }
}

function filterTasks(filterValue) {
  switch (filterValue) {
    case 'active':
      resetFilter()
      displayActiveTasks()
      break
    case 'completed':
      resetFilter()
      displayCompletedTasks()
      break
    default:
      resetFilter()
      break
  }
}

function resetFilter() {
  const todoItemsElements = [...taskCollection]
  todoItemsElements.forEach((todo) => {
    todo.classList.remove('hidden')
  })
}

function displayActiveTasks() {
  const todoItemsElements = [...taskCollection]
  console.log(todoContainerElement)
  todoItemsElements.forEach((todo) => {
    if (todo.classList.contains('completed')) {
      todo.classList.add('hidden')
    }
  })
}

function displayCompletedTasks() {
  const todoItemsElements = [...taskCollection]
  console.log(todoContainerElement)
  todoItemsElements.forEach((todo) => {
    if (!todo.classList.contains('completed')) {
      todo.classList.add('hidden')
    }
  })
}
