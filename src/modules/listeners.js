import { addNewTask, showMenu } from './menu/menu-handlers';
import { showList, deleteList, editList, addNewList } from './lists/lists-handlers';
import { editItem } from './handlers';
import { checkboxState, expandTask, selectDate, deleteDueDate, btnEditDueDate, editTask, deleteTask } from './task/tasks-handlers';

export const listeners = [];

export const addAppListeners = () => {

    // Menu
    addListener('#btn-new-task', 'click', addNewTask);
    addListeners('.btn-menu', 'click', showMenu);

    // Lists
    addListeners('.btn-lists', 'click', showList);
    addListeners('.svg-btns-delete', 'click', deleteList);
    addListeners('.svg-btns-edit', 'click', editItem);
    addListener('#btn-new-list', 'click', addNewList);

    // Tasks
    addListeners('.tasks-checkbox', 'change', checkboxState);
    addListeners('.expand-btn', 'click', expandTask);
    addListeners('.task-due-date', 'click', editItem);
    addListeners('.due-date-delete-btn', 'click', deleteDueDate);
    addListeners('.due-date-edit-btn', 'click', editItem);
    addListeners('.task-edit-btn', 'click', editItem);
    addListeners('.task-delete-btn', 'click', deleteTask);

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
