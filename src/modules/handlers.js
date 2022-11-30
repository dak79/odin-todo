import { clearListeners, listeners } from './listeners';
import { saveOnEnter } from './helpers';
import { findItemId } from './todo';
import { lists, checkListName, deleteList, addNewList } from './lists';
import { tasks, deleteTask, deleteDate, addNewTask, checkboxState, expandTask, newTags } from './tasks';
import { showMenu } from './menu';
import { renderLists, editListUi } from './ui/lists-ui';
import { editTaskUi, renderTasks, updatePriorityUi, updateTagsUi } from './ui/tasks-ui';

/**
 * Controller for buttons
 * @param { event } event 
 */
export const btnsController = event => {
    event.stopPropagation();
    
    const btn = event.target.dataset.btn;
    const type = event.target.dataset.type;
    const id = event.target.dataset.number;
    const value = event.target.value;

    console.log(btn, type, id, value);
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
        const task = findItemId(tasks, Number(id));
        task.update('priority', String(value));
        updatePriorityUi(task, `#task-msg-wrapper-${id}`, true);
        console.log(task.priority)
    } 
    
    if (btn === 'item') {
        checklistChecked(event);
    }
    
    if (type === 'description') {
        const newItem = {
            instance: findItemId(tasks, Number(id)),
            value: String(value)
        }

        saveInput(newItem, type);
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

    if (type === 'description') {
        newItem.instance.update('description', newItem.value);  
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