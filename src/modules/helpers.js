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
 export const createList = (itemTitles, itemsType, className) => {
    const list = document.createElement('ul');
    list.classList.add(className);

    itemTitles.forEach(title => {
        const listItem = document.createElement('li');
        const listItemContent = itemsType(title);

        listItem.appendChild(listItemContent);
        list.appendChild(listItem);
    });
    
    return list;
}

/**
 * Header Buttons
 * @param { Array } name - Button text content
 * @returns { Node } A button
 */
export const sideButton = (name) => {
    const btn = document.createElement('button');
    setAttributes(btn, {
        type: 'button',
        id: `btn-${name.replace(' ', '-').toLowerCase().trim()}`,
        class: 'btn-menu'
    });
    btn.textContent = name;

    return btn;
}