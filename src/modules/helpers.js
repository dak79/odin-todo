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
 * Create an unordered list
 * @param { [] } array - Array with items to transform in unordered list 
 * @param { string } desk - Where ul is created. 
 * @param { Function } itemsType - Create li content.
 * @param { string } ulClassName - Class for ul element.
 * @param { string } liIdPrefix - Prefix for id of each li element.
 * @param { string|[] } liClassName - Class or classes for each li elements. 
 * @returns { Nodes } - Unordered list.
 */
 export const createList = (array, desk, itemsType, ulClassName, liIdPrefix, liClassName) => {
    const list = document.createElement('ul');
    list.classList.add(ulClassName);
    
    array.forEach(item => {
        const listType = item.tags.find(tag => tag === desk);
        if (listType) {
            const listItem = document.createElement('li');
    
            listItem.id = `list-item-${liIdPrefix}-${item.id}`;
            if (typeof liClassName === 'string'){
                listItem.classList.add(liClassName);
            } else {
                liClassName.forEach(className => listItem.classList.add(className));
            }
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
