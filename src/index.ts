const taskList = document.querySelector<HTMLUListElement>(".taskList")
const task = document.querySelector<HTMLFormElement>(".newTask")
const taskInput = document.querySelector<HTMLInputElement>(".newTask__input")
const taskUrgence = document.querySelector<HTMLInputElement>(".newTask__urg")
const taskImportance = document.querySelector<HTMLInputElement>(".newTask__imp")
let tasksStorage: TaskItem[] = getTasksstorage()
tasksStorage.forEach(addTask)


type TaskItem = {
  title: string;
  urgence: string;
  priority: string;
  completed: boolean;
  date: Date;
}

function saveTasksstorage() {
  localStorage.setItem("Taskslist", JSON.stringify(tasksStorage))
}

function getTasksstorage(): TaskItem[] {
  const Jsonlist = localStorage.getItem("Taskslist")
  if (Jsonlist == null) return []
  return JSON.parse(Jsonlist)
}

task?.addEventListener("submit", e => {
  e.preventDefault()


  if (taskInput?.value =="" || taskInput?.value == null || taskUrgence?.value =="" || taskUrgence == null || taskImportance?.value =="" || taskImportance?.value == null) return

  const newTask: TaskItem = {
    title: taskInput.value,
    urgence: taskUrgence?.value,
    priority: taskImportance?.value,
    completed: false,
    date : new Date()
  }
  tasksStorage.push(newTask)
  saveTasksstorage()

  addTask(newTask)
  taskInput.value = ""

})

// création de chaque item de la liste //
function addTask(item : TaskItem){
  const taskReturn = document.createElement("li")
  const label = document.createElement("label")
  const check = document.createElement("input")
  const deleteit = document.createElement("button")
  deleteit.textContent = "supprimer"
  check.type = "checkbox"
  check.checked = item.completed
  const span1 = document.createElement("span")
  const span2 = document.createElement("span")
  const p = document.createElement("p")
  span1.textContent = "urgence : "
  span2.textContent = "priorité : "
  span1.append(item.urgence)
  span2.append(item.priority)
  p.append(item.title)

  // créer l'item //
  label.append(check, p, span1, span2, deleteit)
  taskReturn.append(label)
  taskList?.append(taskReturn)
  // surveille la modification de la case check //
  check.addEventListener("change", () => {
    item.completed = check.checked
    saveTasksstorage()
  })
  // surveille le bouton supprimer //
  deleteit.addEventListener("click", () => {
    const deleteItem = deleteit.closest("li")
    // deleteItem?.remove();

    tasksStorage = tasksStorage.filter((taskTofind) => taskTofind.title !== deleteItem?.title)
  })

}

