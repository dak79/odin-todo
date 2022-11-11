import { addNewTask, showMenu } from './menu/menu-handlers';
import { showList, addNewList } from './lists/lists-handlers';
import { editBtns, deleteBtns, newBtns } from './handlers';
import { checkboxState, expandTask } from './task/tasks-handlers';

export const listeners = [];

export const addAppListeners = () => {

    // Menu
    addListener('#btn-new-task', 'click', newBtns);
    addListeners('.btn-menu', 'click', showMenu);

    // Lists
    addListeners('.btn-lists', 'click', showList);
    addListeners('.svg-btns-delete', 'click', deleteBtns);
    addListeners('.svg-btns-edit', 'click', editBtns);
    addListener('#btn-new-list', 'click', newBtns);

    // Tasks
    addListeners('.tasks-checkbox', 'change', checkboxState);
    addListeners('.expand-btn', 'click', expandTask);
    addListeners('.task-due-date', 'click', editBtns);
    addListeners('.due-date-delete-btn', 'click', deleteBtns);
    addListeners('.due-date-edit-btn', 'click', editBtns);
    addListeners('.task-edit-btn', 'click', editBtns);
    addListeners('.task-delete-btn', 'click', deleteBtns);
}

/**
 * 
 * @param { HTMLClassSelector } selector - Elements to attach event listeners.
 * @param { Event.type } eventType - Type of listeners.
 * @param { Function } callback - Handler.
 */
export const addListeners = (selector, eventType, callback) => {
    document.querySelectorAll(selector).forEach(node => {
        node.addEventListener(eventType, callback);
        const listener = {
            node,
            selector,
            eventType,
            callback
        };
        listeners.push(listener);
    });
}

/**
 * 
 * @param { HTMLIdSelector } selector - Element to attach event listeners.
 * @param { Event.type } eventType - Type of listeners.
 * @param { Function } callback - Handler.
 */
export const addListener = (selector, eventType, callback) => {
    const node = document.querySelector(selector)
    node.addEventListener(eventType, callback);
    const listener = {
        node,
        selector,
        eventType,
        callback
    }
    listeners.push(listener);
}

/**
 * 
 * @param { HTMLClassSelector } selector - Elements to remove event listeners.
 * @param { Event.type } eventType - Type of listeners.
 * @param { Function } callback - Handler.
 */
export const clearListeners = () => {
    console.log(listeners);
    listeners.forEach(listener => {
        listener.node.removeEventListener(listener.eventType, listener.callback); 
    })
    listeners.splice(0);
   
}

/**
 * 
 * @param { HTMLIdSelector } selector - Element to remove event listeners.
 * @param { Event.type } eventType - Type of listeners.
 * @param { Function } callback - Handler.
 */
 const clearListener = (selector, eventType, callback) => {
    document.querySelector(selector).removeEventListener(eventType, callback);
}
