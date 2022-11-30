import { btnsController, addNewCheck, editChecklist, deleteChecklist } from './handlers';
import { saveOnEnter } from './helpers';

export const listeners = [];
export const expandListeners = [];

export const addAppListeners = () => {

    // Menu
    addListener(listeners, '#new-task-btn', 'click', btnsController);
    addListeners(listeners, '.menu-btns', 'click', btnsController);

    // Lists
    addListeners(listeners, '.lists-btns', 'click', btnsController);
    addListeners(listeners, '.svg-btns-delete', 'click', btnsController);
    addListeners(listeners, '.svg-btns-edit', 'click', btnsController);
    addListener(listeners, '#new-lists-btn', 'click', btnsController);

    // Tasks
    addListeners(listeners, '.tasks-checkbox', 'change', btnsController);
    addListeners(listeners, '.expand-btn', 'click', btnsController);
    addListeners(listeners, '.task-due-date', 'click', btnsController);
    addListeners(listeners, '.due-date-delete-btn', 'click', btnsController);
    addListeners(listeners, '.due-date-edit-btn', 'click', btnsController);
    addListeners(listeners, '.task-edit-btn', 'click', btnsController);
    addListeners(listeners, '.task-delete-btn', 'click', btnsController);
}

export const addExpandListener = event => {
    const id = event.target.dataset.number
    console.log(id)
    
    addListener(expandListeners, `#task-description-${id}`, 'focusout', btnsController);
    addListener(expandListeners, `#task-description-${id}`, 'keyup', saveOnEnter);

    addListeners(expandListeners, `input[type='radio'][name='priority-${id}']`, 'change', btnsController);

    addListener(expandListeners, `#task-tags-${id}`, 'change', btnsController);

    addListener(expandListeners, `#checklist-new-btn-${id}`, 'click', addNewCheck);

    addListeners(expandListeners, `[data-type='item-state']`, 'change', btnsController)

    addListeners(expandListeners, '.checklist-edit-btn', 'click', editChecklist);
    addListeners(expandListeners, '.checklist-delete-btn', 'click', deleteChecklist);
}


/**
 * 
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
 * 
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
 * 
 * @param { HTMLClassSelector } selector - Elements to remove event listeners.
 * @param { Event.type } eventType - Type of listeners.
 * @param { Function } callback - Handler.
 */
export const clearListeners = array => {
    console.log(array);
    array.forEach(listener => {
        listener.node.removeEventListener(listener.eventType, listener.callback); 
    })
    array.splice(0);
   
}
