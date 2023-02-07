import { v4 as uuidV4} from "uuid";

const taskList = document.querySelector<HTMLUListElement>(".taskList")
const task = document.querySelector<HTMLFormElement>(".newTask")
const taskInput = document.querySelector<HTMLInputElement>(".newTask__input")
const taskUrgence = document.querySelector<HTMLInputElement>(".newTask__urg")
const taskImportance = document.querySelector<HTMLInputElement>(".newTask__imp")
// accès au tableau d'objet des tâches // 
let tasksStorage: TaskItem[] = getTasksstorage()
console.log(tasksStorage)
// affiche au rechargement les tâches enregistrées dans local Storage //
tasksStorage.forEach(addTask)

// modèle de l'objet TaskItem // 
type TaskItem = {
  id: string;
  title: string;
  urgence: string;
  priority: string;
  completed: boolean;
  date: Date;
}

// enregistre la tâche dans le localStorage //
function saveTasksstorage() {
  localStorage.setItem("Taskslist", JSON.stringify(tasksStorage))
}
// retourne les objets JSON en javascript //
function getTasksstorage(): TaskItem[] {
  const Jsonlist = localStorage.getItem("Taskslist")
  if (Jsonlist == null) return []
  return JSON.parse(Jsonlist)
}
// surveille la création d'une tâche et créer chaque tâche //
task?.addEventListener("submit", e => {
  e.preventDefault()

  if (taskInput?.value =="" || taskInput?.value == null || taskUrgence?.value =="" || taskUrgence == null || taskImportance?.value =="" || taskImportance?.value == null) return

  const newTask: TaskItem = {
    id: uuidV4(),
    title: taskInput.value,
    urgence: taskUrgence?.value,
    priority: taskImportance?.value,
    completed: false,
    date : new Date()
  }
  // complète le tableau taskStorage // 
  tasksStorage.push(newTask)
  saveTasksstorage()
  // créer la tâche HTML //
  addTask(newTask)
  taskInput.value = ""

})

// création de chaque item de la liste //
function addTask(item : TaskItem){
  const taskReturn = document.createElement("li")

  const label = document.createElement("label")
  label.setAttribute("data-id", item.id)

  const check = document.createElement("input")
  check.type = "checkbox"
  check.checked = item.completed

  const deleteit = document.createElement("button")
  deleteit.textContent = "supprimer"

  const span1 = document.createElement("span")
  const span2 = document.createElement("span")
  const span3 = document.createElement("span")
  span2.textContent = "urgence : "
  span3.textContent = "importance : "
  span1.append(item.title)
  span2.append(item.urgence)
  span3.append(item.priority)

  // créer la nouvelle tâche //
  label.append(check, span1, span2, span3, deleteit)
  taskReturn.append(label)
  taskList?.append(taskReturn)
  // surveille la modification de la case check //
  check.addEventListener("change", () => {
    item.completed = check.checked
    saveTasksstorage()
  })
  // surveille le bouton supprimer //
  deleteit.addEventListener("click", () => {
    const deleteItem = deleteit.closest("label")
    const deleteItemId = deleteItem?.dataset.id
    deleteItem?.remove();
    // filtre le localStorage pour ne garder que les tâches non supprimées //
    tasksStorage = tasksStorage.filter((taskTofind) => taskTofind.id !== deleteItemId)
    localStorage.setItem("Taskslist", JSON.stringify(tasksStorage))
  })

}

