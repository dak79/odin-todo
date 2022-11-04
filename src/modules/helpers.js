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
 export const createList = (itemTitles, itemsType, ulClassName, liIdPrefix, liClassName) => {
    const list = document.createElement('ul');
    list.classList.add(ulClassName);
    
    itemTitles.forEach(title => {
        const listItem = document.createElement('li');

        listItem.id = `list-item-${liIdPrefix}-${title.id}`;
        listItem.classList.add(liClassName);
        const listItemContent = itemsType(title);

        listItemContent.forEach(item => listItem.appendChild(item));
        list.appendChild(listItem);
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

    return `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${String(year)}`
}

export const filterTodayTask = array => {
    const today = new Date();
    
    return array.filter(item => item.dueDate ? item.dueDate.toLocaleDateString() === today.toLocaleDateString() : 0)
}

export const filterThisWeekTask = array => {
    const thisWeek = getWeekNumber(new Date);
    return array.filter(item => getWeekNumber(item.dueDate) === thisWeek);
}

export const filterAnytimeTask = array => {
    const thisWeek = getWeekNumber(new Date);

    return array.filter(item => getWeekNumber(item.dueDate) > thisWeek || !item.dueDate);
}

const getWeekNumber = date => {
    const currentDate = date
    
    const startDate = date ? new Date(currentDate.getFullYear(), 0, 1) : 0;
    const days = Math.ceil((currentDate - startDate) / (24 * 60 * 60 * 1000))
    const weekNumber = Math.floor(days/7);
    
    return weekNumber
}
