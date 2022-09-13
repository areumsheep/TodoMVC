class TodoHeader extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({mode: 'open'});

    // TODO style을 가장 아래에서 입력 받을 수는 없을까? 
    // TODO ./header.css 이런 식으로 현재 폴더에 접근할 수는 없을까?
    const style = document.createElement('link');
    style.setAttribute('rel', 'stylesheet');
    style.setAttribute('href', './src/components/TodoHeader/header.css');

    const header = document.createElement('header');
    header.innerHTML =  `
      <h1>todos</h1>
      <input
        class="new-todo"
        placeholder="What needs to be done?"
        autofocus
      />
    `
    
    shadow.append(style);
    shadow.append(header);
  }
}

customElements.define('todo-header', TodoHeader);