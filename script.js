const list = document.getElementById('todo-list');
const itemCountSpan = document.getElementById('item-count');
const uncheckedCountSpan = document.getElementById('unchecked-count');

let todos = JSON.parse(localStorage.getItem('todos')) || [
  { id: 1, text: 'Вивчити HTML', checked: true },
  { id: 2, text: 'Вивчити CSS', checked: true },
  { id: 3, text: 'Вивчити JavaScript', checked: false }
];

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function updateCounter() {
  itemCountSpan.textContent = todos.length;
  const uncheckedCount = todos.filter(todo => !todo.checked).length;
  uncheckedCountSpan.textContent = uncheckedCount;
}

function renderTodo(todo) {
  const checkedAttr = todo.checked ? 'checked' : '';
  const textClass = todo.checked ? 'text-success text-decoration-line-through' : '';

  return `
    <li class="list-group-item">
      <input type="checkbox" class="form-check-input me-2" id="todo-${todo.id}" ${checkedAttr} onchange="checkTodo(${todo.id})" />
      <label for="todo-${todo.id}"><span class="${textClass}">${todo.text}</span></label>
      <button class="btn btn-danger btn-sm float-end" onclick="deleteTodo(${todo.id})">delete</button>
    </li>
  `;
}

function render() {
  const todosHTML = todos.map(todo => renderTodo(todo)).join('');
  list.innerHTML = todosHTML;
  
  updateCounter();
  saveTodos();
}

function newTodo() {
  const text = prompt('Введіть нове завдання:');
  
  if (text && text.trim() !== '') {
    const newId = todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1;
    
    const newTodoItem = {
      id: newId,
      text: text.trim(),
      checked: false 
    };
    
    todos.push(newTodoItem);
    render();
  }
}

function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id);
  render();
}

function checkTodo(id) {
  const todo = todos.find(todo => todo.id === id);
  if (todo) {
    todo.checked = !todo.checked;
    render();
  }
}

render();