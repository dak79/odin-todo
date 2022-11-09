/**
 * 
 * @param { Node } parent 
 * @param { Array.Node } children 
 * @returns - Append all children
 */
export const appendChildren = (parent, children) => children.forEach(child => parent.appendChild(child));

/**
 * 
 * @param { HTML element } element 
 * @param { Object } attributes 
 * @returns - Set attributes to given element
 */
export const setAttributes = (element, attributes) => Object.keys(attributes).forEach(attr => element.setAttribute(attr, attributes[attr]));

/**
 * Create a list
 * @param { Array.String } itemTitles - Create li textContent
 * @param { Function } itemsType - Create different nested HTML in li elements
 * @param { String } className - Ul class
 * @returns { Node } An unordered list
 */
 export const createList = (array, type, itemsType, ulClassName, liIdPrefix, liClassName) => {
    const list = document.createElement('ul');
    list.classList.add(ulClassName);
    
    array.forEach(item => {
        const listType = item.tags.find(tag => tag === type);
        if (listType) {
            const listItem = document.createElement('li');
    
            listItem.id = `list-item-${liIdPrefix}-${item.id}`;
            listItem.classList.add(liClassName);
            const arrayContents = itemsType(item);
    
            arrayContents.forEach(content => listItem.appendChild(content));
            list.appendChild(listItem);
        }
    });
    
    return list;
}

export const selectNode = selector => document.querySelector(selector);
export const selectNodes = selector => document.querySelectorAll(selector);
export const cleanNode = node => node.replaceChildren();

export const formatDate = date => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${String(year)}`;
}

export const removeElement = selector => {
    const element = document.querySelector(selector);
    element.remove();
}

export const saveOnEnter = event => {
    event.preventDefault();
    if (event.keyCode === 13) {
        event.target.blur();
    }
}
