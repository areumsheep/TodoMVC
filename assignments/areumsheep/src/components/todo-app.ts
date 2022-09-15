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

    this.$input.addEventListener('keyup', this.addTodo);
  }

  // TODO 제네릭으로 받을 수 있는 방법이 있을까?
  addTodo = (e: any) => {
    if(e.keyCode === 13) {
      e.preventDefault();
      if(this.$input.value.length > 0){
        this.#todos.push({title: this.$input.value, isCompleted: false});
        this.$input.value = '';
        this.renderTodoList();
      }
    }
  }
  renderTodoList() {
    this.$todoList.innerHTML = '';
    for(const {title} of this.#todos){
      const template = `
        <div class="view">
          <input class="toggle" type="checkbox">
          <label>${title}</label>
          <button class="destroy"></button>
        </div>
      `;

      const $item = createElement('li', template);
      this.$todoList.append($item);
    }
  }
}

customElements.define('todo-app', TodoApp);