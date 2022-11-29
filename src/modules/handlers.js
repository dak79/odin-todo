import { clearListeners, listeners } from './listeners';
import { saveOnEnter } from './helpers';
import { findItemId, saveEditInput, updateItem } from './todo';
import { lists, checkListName, deleteList, addNewList } from './lists/lists';
import { tasks, deleteTask, deleteDate, addNewTask, checkboxState, expandTask, saveNewDescription, priorityValue, newTags } from './task/tasks';
import { showMenu } from './menu/menu';
import { renderLists, editListUi } from './lists/lists-ui';
import { editTaskUi, renderTasks, updateTagsUi } from './task/tasks-ui';

/**
 * Controller for buttons
 * @param { event } event 
 */
export const btnsController = event => {
    event.stopPropagation();
    
    const btn = event.target.dataset.btn;
    const type = event.target.dataset.type;

    console.log(btn, type);
    if (btn === 'delete') {
        (type === 'list') ? deleteList(event) : (type === 'task') ? deleteTask(event) : (type === 'due-date') ? deleteDate(event) : 0;
    } else if (btn === 'title') {
        showMenu(event);
    } else if (btn === 'checkbox') {
        checkboxState(event);
    } else if (btn === 'expand') {
        expandTask(event);
    // } else if (btn === 'edit' || btn === 'new') {
    //     const newItem = (btn === 'edit') ? 
    //                         (type === 'list') ? editListUi(event) : 
    //                         (type === 'task' || type === 'due-date') ? editTaskUi(event) :
    //                         0 
    //                         :
    //                         (type === 'new-list') ? addNewList(event) : 
    //                         (type === 'new-task') ? addNewTask(event) : 
    //                         0;
    //     if (newItem) {
    //         clearListeners(listeners);
    //         controllerListener(newItem, type, saveInput);
    //     }
    } else if (btn === 'new') {
        const newItem = (type === 'new-task')  ? addNewTask(event) : addNewList(event);

        console.log(newItem);
        if (newItem) {
            clearListeners(listeners);
            controllerListener(newItem, type, saveInput)
        }
    
    } else if (btn === 'radio') {
        priorityValue(event);
    } else if (btn === 'item') {
        checklistChecked(event);
    }
    
    if (type === 'description') {
        saveNewDescription(event);
    }

    if (type === 'tags') {
        newTags(event);
    }

}

const controllerListener = (newItem, type, callback) => {
    console.log(newItem, type);
    if (type === 'due-date') {
        newItem.addEventListener('change', () => callback(newItem, type));
    } else {
        newItem.node.addEventListener('focusout', () => callback(newItem, type));
        newItem.node.addEventListener('keyup', saveOnEnter);
    }
    
}

/**
 * Save new item or update an old one.
 * @param { Object } newItem - New item to save.
 * @property { Node } input - New item input node.
 * @property { Node } output - New item output node.
 * @property { Object } instance - New item instance: list|task. 
 * @param { string } type - Button type that fired the event. 
 */
const saveInput = (newItem, type) => {
    console.log(newItem, type);
    if (type === 'new-task') {
        newItem.instance.add(tasks);
        newItem.instance.update('title', newItem.node.value);
        renderTasks(newItem.visualizedOn || 'inbox', false);
    } else {
        const newList = checkListName(newItem);
        
        if (newList) {
            newItem.instance.add(lists);
            newItem.instance.update('title', String(newList));
            updateTagsUi(null);
    
            clearListeners(listeners);
            renderLists(false);
        }
    }
}


    //     if (type === 'list' || type === 'new-list') {
//         const newTitle = checkListName(newItem);
//         if (newTitle) {
//             if (type === 'list') {
//                 saveEditInput(newItem.output, lists, 'title', String(newTitle), null);
//                 updateTagsUi(null);
//             } 
//             

//             clearListeners(listeners);
//             renderLists(false);
//         } 
    
//     } else if (type === 'task' || type === 'new-task') {
//         console.log(newItem.dataset.number);

//         if (type === 'task') {
//             console.log('task');
//         } else {
//             console.log('no task')
//             console.log(Number(newItem.dataset.number))
//             console.log(findItemId(tasks, Number(newItem.dataset.number)))
//             console.log(newItem);
//         }
//         const task = (type === 'task') ? saveEditInput(newItem, tasks, 'title', newItem.value, null) : findItemId(tasks, Number(newItem.dataset.number));

//         console.log(task);

//         if (type === 'new-task') {
//             task.add(tasks);
//             task.update('title', newItem.value);
//         }

//         clearListeners(listeners);
//         renderTasks(task.visualizedOn || 'inbox', false);

//     } else {
//         const taskToUpdate = saveEditInput(newItem.output, tasks, 'dueDate', new Date(newItem.input.value), 'inbox');
        
//         renderTasks(taskToUpdate.visualizedOn || 'inbox', false);
//     }
// }

export const checklistChecked = () => {
    console.log('checked');
}
export const addNewCheck = () => {
    console.log('add new check');
}

export const editChecklist = () => {
    console.log('edit checklist');
}

export const deleteChecklist = () => {
    console.log('delete checklist item')
}