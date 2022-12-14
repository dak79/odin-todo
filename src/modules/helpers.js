/**
 * Append multiple child to a parent node.
 * @param { Node } parent
 * @param { Array.Node } children
 * @returns - Append all children
 */
export const appendChildren = (parent, children) =>
  children.forEach((child) => parent.appendChild(child));

/**
 * Set multiple attributes for an HTML element.
 * @param { HTMLElement } element
 * @param { {} } attributes
 * @returns - Set attributes to given element
 */
export const setAttributes = (element, attributes) =>
  Object.keys(attributes).forEach((attr) =>
    element.setAttribute(attr, attributes[attr])
  );

/**
 * Create an ul.
 * @param { string } ulClass - Class attribute value
 * @returns { Node } - An ul element.
 */
export const createUl = (ulClass) => {
  const ul = document.createElement('ul');
  ul.classList.add(ulClass);

  return ul;
};

/**
 * Create a li element.
 * @param { {} } object - Object for retriving data.
 * @param { string[] } liClasses - Single/multiple class attribute value.
 * @param { function } item - Function for create li content.
 * @returns { Node } - A li element.
 */
export const createLi = (object, liClasses, item) => {
  const li = document.createElement('li');
  li.id = `list-item-${object.type}-${object.id}`;
  li.classList.add(...liClasses);

  const liContent = item(object);
  appendChildren(li, liContent);

  return li;
};

/**
 * Find an item by id in an array.
 * @param { array } array - Array where to perform search.
 * @param { number } id - Item id to serch for.
 * @returns { object|undefined } - Object with this id or undefined.
 */
export const findItemId = (array, id) =>
  array.find((element) => element.id === id);

/**
 * Find an item by name in an array.
 * @param { array } array - Array where to perform search.
 * @param { string } name - Item name to search for.
 * @returns { object|undefined } - Object with this name or undefind.
 */
export const findItemName = (array, name) =>
  array.find((element) =>
    element.type === 'list'
      ? element.title.toLowerCase().trim() === name.toLowerCase().trim()
      : element.toLowerCase().trim() === name.toLowerCase().trim()
  );

/**
 * Select node.
 * @param { string } selector -  CSS selector for querySelector.
 * @returns { Node } - Selected node.
 */
export const selectNode = (selector) => document.querySelector(selector);

/**
 * Select multiple nodes.
 * @param { string } selector - CSS selector for querySelector.
 * @returns { NodeLists } - Seleceted nodes
 */
export const selectNodes = (selector) => document.querySelectorAll(selector);

/**
 * Remove all node children.
 * @param { Node } node
 * @returns { Node } - Node without children
 */
export const cleanNode = (node) => node.replaceChildren();

/**
 * Remove an HTML element.
 * @param { string } selector - CSS selector for querySelector
 */
export const removeElement = (selector) => {
  const element = document.querySelector(selector);
  element.remove();
};

export const saveOnEnter = (event) => {
  event.preventDefault();
  if (event.keyCode === 13) {
    event.target.blur();
  }
};
