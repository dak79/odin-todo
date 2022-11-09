import { selectNode, setAttributes } from './helpers';

/**
 * 
 * @param { Node } textNode - Node to attach change field. 
 * @param { Object } attrs - Attributes for change fields.
 * @returns { Node[] } - Node to attach change fields / change field node.
 */
 export const edit = (textNode, parentNode, attrs) => {
    const text = selectNode(`${textNode}`);
    console.log(text);
    const parent = selectNode(parentNode);
    const input = document.createElement('input');
    const inputValue = text.textContent;
    setAttributes(input, attrs);
    input.value = inputValue;
    parent.replaceChild(input, text);
    input.focus();

    return [text, input];
}

/**
 * 
 * @param { node } node - Node to update. 
 * @param { array } array - Array where item to update is.
 * @param { string } propertyName - Property to update.
 * @param { string|Date } newValue - New value for property.
 * @param { string } newTag - Tag to assign to item.
 */
export const saveEdit = (node, array, propertyName, newValue, newTag) => {
    const itemToUpdate = findItemId(array, Number(node.dataset.number));
    itemToUpdate.update(propertyName, newValue);

    if (newTag) itemToUpdate.tags = itemToUpdate.tags.filter(tag => tag === newTag);
    if (itemToUpdate.type === 'task') itemToUpdate.updateTime();
    node.remove();

    return itemToUpdate
}

/**
 * 
 * @param { array } array - Array where to perform search.
 * @param { number } id - Item id to serch for. 
 * @returns { object|undefined } - Object with this id or undefined.
 */
export const findItemId = (array, id) => array.find(element => element.id === id);

/**
 * 
 * @param { array } array - Array where to perform search.
 * @param { string } name - Item name to search for.
 * @returns { object|undefined } - Object with this name or undefind.
 */
export const findItemName = (array, name) => array.find(element => element.title.toLowerCase().trim() === name.toLowerCase().trim());

// /**
//  * 
//  * @param { HTMLClassSelector } selector - Elements to attach event listeners.
//  * @param { Event.type } eventType - Type of listeners.
//  * @param { Function } callback - Handler.
//  */
//  const addListeners = (selector, eventType, callback) => {
//     document.querySelectorAll(selector).forEach(node => node.addEventListener(eventType, callback));
// }

// /**
//  * 
//  * @param { HTMLIdSelector } selector - Element to attach event listeners.
//  * @param { Event.type } eventType - Type of listeners.
//  * @param { Function } callback - Handler.
//  */
// const addListener = (selector, eventType, callback) => {
//     document.querySelector(selector).addEventListener(eventType, callback);
// }

// /**
//  * 
//  * @param { HTMLClassSelector } selector - Elements to remove event listeners.
//  * @param { Event.type } eventType - Type of listeners.
//  * @param { Function } callback - Handler.
//  */
// export const clearListeners = (selector, eventType, callback) => {
//     document.querySelectorAll(selector).forEach(node => node.removeEventListener(eventType, callback));
// }

// /**
//  * 
//  * @param { HTMLIdSelector } selector - Element to remove event listeners.
//  * @param { Event.type } eventType - Type of listeners.
//  * @param { Function } callback - Handler.
//  */
//  const clearListener = (selector, eventType, callback) => {
//     document.querySelector(selector).removeEventListener(eventType, callback);
// }