export function createElement(element = 'template', template: string) {
  const $element = document.createElement(element);
  $element.insertAdjacentHTML("afterbegin", template);
  return $element.cloneNode(true);
}