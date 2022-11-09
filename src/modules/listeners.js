export const listeners = [];

// export const addListsListeners1 = () => {
//     addListeners('.btn-lists', 'click', showList);
//     addListeners('.svg-btns-delete', 'click', deleteList);
//     addListeners('.svg-btns-edit', 'click', editList);
// }

// export const removeListListeners1 = () => {
//     clearListeners('.btn-lists', 'click', showList);
//     clearListeners('.svg-btns-delete', 'click', deleteList);
//     clearListeners('.svg-btns-edit', 'click', editList);
// }

// export const addMenuListeners1 = () => {
//     addListener('#btn-new-task', 'click', addNewTask);
//     addListeners('.btn-menu', 'click', showMenu);
// }

// export const removeMenuListeners1 = () => {
//     clearListener('#btn-new-task', 'click', addNewTask);
//     clearListeners('.btn-menu', 'click', showMenu);
// }

export const addTaskListeners1 = () => {
    addListeners('.tasks-checkbox', 'change', checkboxState);
    addListeners('.expand-btn', 'click', expandTask);
    addListeners('.task-due-date', 'click', selectDate);
    addListeners('.due-date-delete-btn', 'click', deleteDueDate);
    addListeners('.due-date-edit-btn', 'click', btnEditDueDate);
    addListeners('.task-edit-btn', 'click', editTask);
    addListeners('.task-delete-btn', 'click', deleteTask);
} 

export const removeTaskListeners = () => {
    clearListeners('.tasks-checkbox', 'change', checkboxState);
    clearListeners('.expand-btn', 'click', expandTask);
    clearListeners('.task-due-date', 'click', selectDate);
    clearListeners('.due-date-delete-btn', 'click', deleteDueDate);
    clearListeners('.due-date-edit-btn', 'click', btnEditDueDate);
    clearListeners('.task-edit-btn', 'click', editTask);
    clearListeners('.task-delete-btn', 'click', deleteTask);

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
