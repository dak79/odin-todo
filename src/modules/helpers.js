
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

export const listsBtn = (name) => {
    const btnTitle = document.createElement('button');
    setAttributes(btnTitle, {
        type: 'button',
        id: `btn-${name.title.replace(' ', '-').toLowerCase().trim()}`,
        class: 'btn-lists'
    });
    btnTitle.textContent = name.title;

    const wrapper = document.createElement('span');
    wrapper.classList.add('btns-lists');
    
    const btnEdit = document.createElement('button');
    setAttributes(btnEdit, {
        type: 'button',
        class: 'btn-menu btn-lists-edit',
    });
    btnEdit.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M14.06,9L15,9.94L5.92,19H5V18.08L14.06,9M17.66,3C17.41,3 17.15,3.1 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18.17,3.09 17.92,3 17.66,3M14.06,6.19L3,17.25V21H6.75L17.81,9.94L14.06,6.19Z" /></svg>'
    
    const btnDelete = document.createElement('button');
    setAttributes(btnDelete, {
        type: 'button',
        class: 'btn-menu btn-lists-delete'
    });
    btnDelete.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" /></svg>'

    appendChildren(wrapper, [btnEdit, btnDelete])
   
    return [btnTitle, wrapper];
}

export const selectNode = selector => document.querySelector(selector);
export const selectNodes = selector => document.querySelectorAll(selector);

export const cleanNode = node => node.replaceChildren();

