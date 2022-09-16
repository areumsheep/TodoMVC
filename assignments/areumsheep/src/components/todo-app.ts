import {$, createElement} from '../utils';
import { TodoType } from "../types/TodoType";

const template = document.createElement('template');
template.innerHTML = `
  <section class="todoapp">
    <header class="header">
      <h1>todos</h1>
      <input class="new-todo" placeholder="What needs to be done?" autofocus>
    </header>

    <!-- style="display:none" -->
    <section  class="main">
      <input id="toggle-all" class="toggle-all" type="checkbox">
      <label for="toggle-all">Mark all as complete</label>
      <ul class="todo-list">
      </ul>
      <footer class="footer">
        <span class="todo-count"></span>
        <ul class="filters">
          <li>
            <a href="#/" class="selected">All</a>
          </li>
          <li>
            <a href="#/active">Active</a>
          </li>
          <li>
            <a href="#/completed">Completed</a>
          </li>
        </ul>
        <button class="clear-completed">Clear completed</button>
      </footer>
    </section>
  </section>
`

class TodoApp extends HTMLElement {
  // TODO Map이나 Set을 사용해도 좋을 것 같다!
  #todos: TodoType[] = [];
  
  $input: HTMLInputElement;
  $todoList: HTMLUListElement;

  constructor(){
    super();
    const shadow = this.attachShadow({mode: 'open'});

    const style = document.createElement('link');
    style.setAttribute('rel', 'stylesheet');
    style.setAttribute('href', './src/assets/css/todo.css');

    shadow.append(style);
    shadow.append(template.content.cloneNode(true));

    this.$input = $<HTMLInputElement>('.new-todo', shadow);
    this.$todoList = $<HTMLUListElement>('.todo-list', shadow);

    // 할 일 추가 이벤트
    this.$input.addEventListener('keyup', this.addTodo);
    this.$input.addEventListener('focusout', this.addTodo);

    // 할 일 삭제 이벤트
    this.$todoList.addEventListener('click', this.bindTodoList);
  }

  bindTodoList = (e: MouseEvent) => {
    e.preventDefault();
    const target = e.target as HTMLElement;
    if(target.className === 'destroy') {
      const clickedTodo = target.closest('.view');
      const clickedIndex = clickedTodo?.getAttribute('data-id') as string;
      this.deleteTodo(parseInt(clickedIndex));
    }

    this.renderTodoList();
  }
  addTodo = (e: KeyboardEvent | FocusEvent) => {
    if(e instanceof KeyboardEvent) {
      if(e.keyCode !== 13) return;
    }
    e.preventDefault();
    if(this.$input.value.length > 0){
      this.#todos.push({title: this.$input.value, isCompleted: false});
      this.$input.value = '';
      this.renderTodoList();
    }
  }
  deleteTodo = (index: number) => {
    this.#todos.splice(index, 1);
    this.renderTodoList();
  }
  renderTodoList() {
    let index = 0;
    this.$todoList.innerHTML = '';
    for(const {title} of this.#todos){
      const template = `
        <div class="view" data-id=${index}>
          <input class="toggle" type="checkbox">
          <label>${title}</label>
          <button class="destroy"></button>
        </div>
      `;   
      const $item = createElement('li', template);
      this.$todoList.append($item);
      index++;
    }
  }
}

customElements.define('todo-app', TodoApp);