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
 export const createList = (itemTitles, itemsType, ulClassName, liClassName) => {
    const list = document.createElement('ul');
    list.classList.add(ulClassName);

    itemTitles.forEach(title => {
        const listItem = document.createElement('li');
        listItem.classList.add(liClassName);
        const listItemContent = itemsType(title);

        listItemContent.forEach(item => listItem.appendChild(item));
        list.appendChild(listItem);
    });
    
    return list;
}

/**
 * SideBar Buttons
 * @param { Object } name - Button text content
 * @returns { Node } A button
 */
export const navBtn = (name) => {
    const btn = document.createElement('button');
    setAttributes(btn, {
        type: 'button',
        id: `btn-${name.title.replace(' ', '-').toLowerCase().trim()}`,
        class: 'btn-menu'
    });
    btn.textContent = name.title;

    return [btn];
}

export const selectNode = selector => document.querySelector(selector);
export const selectNodes = selector => document.querySelectorAll(selector);

export const cleanNode = node => node.replaceChildren();
