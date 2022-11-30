import { clearListeners, listeners } from './listeners';
import { saveOnEnter } from './helpers';
import { findItemId } from './todo';
import { lists, checkListName, deleteList, addNewList } from './lists';
import { tasks, deleteTask, deleteDate, addNewTask, checkboxState, expandTask, saveNewDescription, priorityValue, newTags } from './tasks';
import { showMenu } from './menu';
import { renderLists, editListUi } from './ui/lists-ui';
import { editTaskUi, renderTasks, updateTagsUi } from './ui/tasks-ui';

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
    } 
    
    if (btn === 'title') {
        showMenu(event);
    } 
    
    if (btn === 'checkbox') {
        checkboxState(event);
    } 
    
    if (btn === 'expand') {
        expandTask(event);
    }

    if (btn === 'new') {
        const newItem = (type === 'new-task')  ? addNewTask(event) : addNewList(event);

        if (newItem) {
            clearListeners(listeners);
            controllerListener(newItem, type)
        }
    }

    if (btn === 'edit') {
        const newItem = (type === 'list') ? editListUi(event) : editTaskUi(event);

        if (newItem) {
            clearListeners(listeners);
            controllerListener(newItem, type)
        }
    }
    
    if (btn === 'radio') {
        priorityValue(event);
    } 
    
    if (btn === 'item') {
        checklistChecked(event);
    }
    
    if (type === 'description') {
        saveNewDescription(event);
    }

    if (type === 'tags') {
        newTags(event);
    }

}

const controllerListener = (newItem, type) => {
    console.log(newItem, type);
    if (type === 'due-date') {
        newItem.node.addEventListener('change', () => saveInput(newItem, type));
    } else {
        newItem.node.addEventListener('focusout', () => saveInput(newItem, type));
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
    if (type === 'new-task' || type === 'task' || type === 'due-date') {
        if (type === 'new-task') {
            newItem.instance.add(tasks);
            newItem.instance.update('title', newItem.node.value);
        }

        if (type === 'task' || type === 'due-date') {
            const taskToUpdate = findItemId(tasks, Number(newItem.id));
            if (type === 'task') {
                taskToUpdate.update('title', String(newItem.node.value));
            } else {
                taskToUpdate.update('dueDate', new Date(newItem.node.value));
                taskToUpdate.tags.map(tag => {
                    if (tag === 'today' || tag === 'this-week' || tag === 'anytime' || tag === 'late') taskToUpdate.deleteTag(tag);
                })
                taskToUpdate.updateTime();
            }
        }

        renderTasks(newItem.visualizedOn || 'inbox', false);
    } 

    
    if (type === 'new-list' || type === 'list') {
        const newList = checkListName(newItem);

        if (newList) {
            if (type === 'new-list') {
                newItem.instance.add(lists);
                newItem.instance.update('title', String(newList));
            }
            
            if (type === 'list') {
                const listToUpdate = findItemId(lists, Number(newItem.id));
                listToUpdate.update('title', String(newList));
            }
            
            updateTagsUi(null);
            clearListeners(listeners);
            renderLists(false);
        }
    }
}

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