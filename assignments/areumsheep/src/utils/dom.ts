export const $ = <T extends HTMLElement>(selector: string, parent: Document | ShadowRoot) => {
  const element = parent.querySelector(selector) as T;
  return element;
}