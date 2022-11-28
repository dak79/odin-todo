import { showList } from './lists/lists-handlers';
import { btnsController, saveNewDescription, priorityValue, newTags, addNewCheck, editChecklist, deleteChecklist } from './handlers';

export const listeners = [];

export const addAppListeners = () => {

    // Menu
    addListener('#new-task-btn', 'click', btnsController);
    addListeners('.menu-btns', 'click', btnsController);

    // Lists
    addListeners('.lists-btns', 'click', showList);
    addListeners('.svg-btns-delete', 'click', btnsController);
    addListeners('.svg-btns-edit', 'click', btnsController);
    addListener('#new-lists-btn', 'click', btnsController);

    // Tasks
    addListeners('.tasks-checkbox', 'change', btnsController);
    addListeners('.expand-btn', 'click', btnsController);
    addListeners('.task-due-date', 'click', btnsController);
    addListeners('.due-date-delete-btn', 'click', btnsController);
    addListeners('.due-date-edit-btn', 'click', btnsController);
    addListeners('.task-edit-btn', 'click', btnsController);
    addListeners('.task-delete-btn', 'click', btnsController);
}

export const addExpandListener = event => {
    console.log(event.target.dataset.number)
    addListener(`#task-description-${event.target.dataset.number}`, 'focusout', saveNewDescription);

    addListeners(`input[type='radio'][name='priority-${event.target.dataset.number}']`, 'change', priorityValue);

    addListener(`#task-tags-${event.target.dataset.number}`, 'change', newTags);

    addListener(`#checklist-new-btn-${event.target.dataset.number}`, 'click', addNewCheck);

    addListeners('.checklist-edit-btn', 'click', editChecklist);
    addListeners('.checklist-delete-btn', 'click', deleteChecklist);


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
