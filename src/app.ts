interface Todo {
    id: number;
    title: string;
    completed: boolean;
}
class TodoList {
    todos: Todo[] = [];

    addTodo(title: string): void {
        const newTodo: Todo = {
            id: Date.now(),
            title,
            completed: false,
        };
        this.todos.push(newTodo);
    }

    removeTodo(id: number): void {
        this.todos = this.todos.filter(todo => todo.id !== id);
    }

    toggleComplete(id: number): void {
        const todo = this.todos.find(todo => todo.id === id);
        if (todo) {
            todo.completed = !todo.completed;
        }
    }
}
const todoList = new TodoList();

const inputElement = document.getElementById('new-todo') as HTMLInputElement;
const addButton = document.getElementById('add-todo') as HTMLButtonElement;
const listElement = document.getElementById('todo-list') as HTMLUListElement;

addButton.addEventListener('click', () => {
    if (inputElement.value.trim()) {
        todoList.addTodo(inputElement.value);
        inputElement.value = '';
        renderTodos();
    }
});
function renderTodos(): void {
    listElement.innerHTML = '';  // 清空现有列表
    todoList.todos.forEach(todo => {
        const li = document.createElement('li');
        li.textContent = todo.title;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '删除';
        deleteButton.addEventListener('click', () => {
            todoList.removeTodo(todo.id);
            renderTodos();
        });
        li.appendChild(deleteButton);
        listElement.appendChild(li);
    });
}

