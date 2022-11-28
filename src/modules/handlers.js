import { clearListeners, listeners } from './listeners';
import { saveOnEnter } from './helpers';
import { saveEditInput } from './todo';
import { lists, checkListName, deleteList, addNewList } from './lists/lists';
import { tasks, deleteTask, deleteDate, addNewTask, checkboxState, expandTask } from './task/tasks';
import { showMenu } from './menu/menu';
import { showList } from './lists/lists-handlers';
import { renderLists, editListUi } from './lists/lists-ui';
import { editTaskUi, renderTasks } from './task/tasks-ui';

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
        if (type === 'menu-title') {
            showMenu(event);
        } else {
            showList(event);
        }
    } else if (btn === 'checkbox') {
        checkboxState(event);
    } else if (btn === 'expand') {
        expandTask(event);
    } else {
        const newItem = (btn === 'edit') ? 
                            (type === 'list') ? editListUi(event) : 
                            (type === 'task' || type === 'due-date') ? editTaskUi(event) :
                            0 
                            :
                            (type === 'new-list') ? addNewList(event) : 
                            (type === 'new-task') ? addNewTask(event) : 
                            0;
        if (newItem) {
            clearListeners(listeners);
            controllerListener(newItem, type, saveInput);
        }
    } 
}

const controllerListener = (newData, type, callback) => {
    console.log(newData, type);
    if (type === 'due-date') {
        newData.input.addEventListener('change', () => callback(newData, type));
    } else {
        newData.input.addEventListener('focusout', () => callback(newData, type));
        newData.input.addEventListener('keyup', saveOnEnter);
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
    if (type === 'list' || type === 'new-list') {
        const newTitle = checkListName(newItem);
        if (newTitle) {
            if (type === 'list') {
                saveEditInput(newItem.output, lists, 'title', String(newTitle), null);
            } else {
                newItem.instance.update('title', String(newTitle))
                newItem.instance.add(lists);
            }

            clearListeners(listeners);
            renderLists(false);
        } 
    
    } else if (type === 'task' || type === 'new-task') {
        const task = (type === 'task') ? saveEditInput(newItem.output, tasks, 'title', newItem.input.value, null) : newItem.instance;

        if (type === 'new-task') {
            task.add(tasks);
            task.update('title', newItem.input.value);
        }

        clearListeners(listeners);
        renderTasks(task.visualizedOn || 'inbox', false);

    } else {
        const taskToUpdate = saveEditInput(newItem.output, tasks, 'dueDate', new Date(newItem.input.value), 'inbox');
        
        renderTasks(taskToUpdate.visualizedOn || 'inbox', false);
    }
}

export const saveNewDescription = () => {
    console.log('new description');
}

export const priorityValue = () => {
    console.log('new value');
}

export const newTags = () => {
    console.log('add new tag');
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