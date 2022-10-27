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
 export const createList = (itemTitles, itemsType, itemClasses, className) => {
    const list = document.createElement('ul');
    list.classList.add(className);

    itemTitles.forEach(title => {
        const listItem = document.createElement('li');
        const listItemContent = itemsType(title, itemClasses);

        listItem.appendChild(listItemContent);
        list.appendChild(listItem);
    });
    
    return list;
}

/**
 * SideBar Buttons
 * @param { Object } name - Button text content
 * @returns { Node } A button
 */
export const sideBtn = (name, itemClasses) => {
    const btn = document.createElement('button');
    setAttributes(btn, {
        type: 'button',
        id: `btn-${name.title.replace(' ', '-').toLowerCase().trim()}`,
        class: itemClasses
    });
    btn.textContent = name.title;

    return btn;
}

export const selectNode = selector => document.querySelector(selector);
export const selectNodes = selector => document.querySelectorAll(selector);

export const cleanNode = node => node.replaceChildren();

