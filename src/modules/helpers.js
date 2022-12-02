/**
 * Append multiple child to a parent node.
 * @param { Node } parent 
 * @param { Array.Node } children 
 * @returns - Append all children
 */
export const appendChildren = (parent, children) => children.forEach(child => parent.appendChild(child));

/**
 * Set multiple attributes for an HTML element.
 * @param { HTMLElement } element 
 * @param { {} } attributes 
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
        // const listType = item.tags.find(tag => tag === desk);
        // if (listType) {
        //     const listItem = document.createElement('li');
    
        //     listItem.id = `list-item-${liIdPrefix}-${item.id}`;
        //     if (typeof liClassName === 'string'){
        //         listItem.classList.add(liClassName);
        //     } else {
        //         liClassName.forEach(className => listItem.classList.add(className));
        //     }
        //     const arrayContents = itemsType(item);
    
        //     arrayContents.forEach(content => listItem.appendChild(content));
        //     list.appendChild(listItem);
        // }
        
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
        
    });
    
    return list;
}

//const todoes = createList(tasks, desk, taskItem, 'tasks', 'task', ['task-item', 'items']);
// ulClassName = 'tasks'
export const createUl = (ulClass) => {
    const ul = document.createElement('ul');
    ul.classList.add(ulClass);
    return ul
}

// Object = task instance.
// liClasses = ['task-item', 'items']
// liPopulate = taskItem
export const createLi = (object, liClasses, item) => {
    const li = document.createElement('li');
    li.id = `list-item-${object.type}-${object.id}`;
    li.classList.add(...liClasses);

    const liContent = item(object);
    appendChildren(li, liContent);

    return li
}

/**
 * Find an item by id in an array.
 * @param { array } array - Array where to perform search.
 * @param { number } id - Item id to serch for. 
 * @returns { object|undefined } - Object with this id or undefined.
 */
export const findItemId = (array, id) => array.find(element => element.id === id);

/**
 * Find an item by name in an array.
 * @param { array } array - Array where to perform search.
 * @param { string } name - Item name to search for.
 * @returns { object|undefined } - Object with this name or undefind.
 */
export const findItemName = (array, name) => array.find(element => (element.type === 'list') ? element.title.toLowerCase().trim() === name.toLowerCase().trim() : element.toLowerCase().trim() === name.toLowerCase().trim());

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
