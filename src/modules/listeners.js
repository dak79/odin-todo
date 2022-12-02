import { eventController, addNewCheck, editChecklist, deleteChecklist } from './handlers';
import { saveOnEnter } from './helpers';

export const listeners = [];
export const expandListeners = [];

export const addAppListeners = () => {

    // Menu
    addListener(listeners, '#new-task-btn', 'click', eventController);
    addListeners(listeners, '.menu-btns', 'click', eventController);

    // Lists
    addListeners(listeners, '.lists-btns', 'click', eventController);
    addListeners(listeners, '.svg-btns-delete', 'click', eventController);
    addListeners(listeners, '.svg-btns-edit', 'click', eventController);
    addListener(listeners, '#new-list-btn', 'click', eventController);

    // Tasks
    addListeners(listeners, '.tasks-checkbox', 'change', eventController);
    addListeners(listeners, '.expand-btn', 'click', eventController);
    addListeners(listeners, '.task-due-date', 'click', eventController);
    addListeners(listeners, '.due-date-delete-btn', 'click', eventController);
    addListeners(listeners, '.due-date-edit-btn', 'click', eventController);
    addListeners(listeners, '.task-edit-btn', 'click', eventController);
    addListeners(listeners, '.task-delete-btn', 'click', eventController);
}

export const addExpandListener = id => {

    addListener(expandListeners, `#task-description-${id}`, 'focusout', eventController);
    addListener(expandListeners, `#task-description-${id}`, 'keyup', saveOnEnter);

    addListeners(expandListeners, `input[type='radio'][name='priority-${id}']`, 'change', eventController);

    addListener(expandListeners, `#task-tags-${id}`, 'change', eventController);

    addListener(expandListeners, `#new-checklist-${id}-btn`, 'click', addNewCheck);

    addListeners(expandListeners, `[data-type='item-state']`, 'change', eventController)

    addListeners(expandListeners, '.checklist-edit-btn', 'click', editChecklist);
    addListeners(expandListeners, '.checklist-delete-btn', 'click', deleteChecklist);
}


/**
 * Add event listener to multiple elements and track the listeners added.
 * @param { [] } array - Storage of event listener information.
 * @param { HTMLClassSelector } selector - Elements to attach event listeners.
 * @param { Event.type } eventType - Type of listeners.
 * @param { Function } callback - Handler.
 */
export const addListeners = (array, selector, eventType, callback) => {
    document.querySelectorAll(selector).forEach(node => {
        node.addEventListener(eventType, callback);
        const listener = {
            node,
            selector,
            eventType,
            callback
        };
        array.push(listener);
    });
}

/**
 * Add event listener to a node.
 * @param { [] } array - Storage of event listener information.
 * @param { HTMLIdSelector } selector - Element to attach event listeners.
 * @param { Event.type } eventType - Type of listeners.
 * @param { Function } callback - Handler.
 */
export const addListener = (array, selector, eventType, callback) => {
    const node = document.querySelector(selector)
    node.addEventListener(eventType, callback);
    const listener = {
        node,
        selector,
        eventType,
        callback
    }
    array.push(listener);
}

/**
 * Remove all event listener.
 * @param { [] } array - Storage of all event listener to remove. 
 */
export const clearListeners = array => {
    console.log(array);
    array.forEach(listener => {
        listener.node.removeEventListener(listener.eventType, listener.callback); 
    })

    array.splice(0);   
}
