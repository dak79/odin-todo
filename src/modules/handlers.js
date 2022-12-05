import { saveOnEnter, findItemId, selectNode } from './helpers';
import { lists, checkListName, addNewList } from './lists';
import { tasks, addNewTask, expandTask, newTags } from './tasks';
import { renderLists, editListUi } from './ui/lists-ui';
import { editTaskUi, renderTasks, updatePriorityUi } from './ui/tasks-ui';
import { updateTagsOptions, updateTagsLabel } from './ui/select-ui';
import { currentDesk, updateCurrentDesk } from './menu';

/**
 * Controller for events.
 * @param { event } event 
 */
export const eventController = event => {
    event.stopPropagation();
    
    const btn = event.target.dataset.btn;
    const type = event.target.dataset.type;
    const id = event.target.dataset.number;
    const value = event.target.value;
    const desk = event.target.dataset.name;

    if (btn === 'delete') {
        deleteItem(event, id, type);
    } 
    
    if (btn === 'title') {
        updateCurrentDesk(desk);
        renderTasks(currentDesk[0], false);
    } 
    
    if (btn === 'checkbox' || btn === 'checklist') {
        checkboxState(id, type, btn, value, desk);
    } 
    
    if (btn === 'expand') {
        expandTask(id);
    }

    if (btn === 'new') {
        const newItem = (type === 'new-task') ? addNewTask(event) : addNewList(event);

        if (newItem) newInputListeners(newItem, type);
    }

    if (btn === 'edit') {
        const newItem = (type === 'list') ? editListUi(id, type) : editTaskUi(id, type);

        if (newItem) newInputListeners(newItem, type); 
    }
    
    if (btn === 'radio') {
        const task = findItemId(tasks, Number(id));
        task.update('priority', String(value));
        updatePriorityUi(task, `#task-msg-wrapper-${id}`, true);
    } 
    
    if (type === 'description') {
        const newItem = {
            instance: findItemId(tasks, Number(id)),
            value: String(value)
        }

        saveInput(newItem, type);
    }

    if (type === 'tags') {
        newTags(event, id, value);
    }
}

/**
 * Add listeners to new input fields
 * @param { {} } newItem - Object for retriving data. 
 * @param { string } type - Value of data-type 
 */
const newInputListeners = (newItem, type) => {
    if (type === 'due-date') {
        newItem.node.addEventListener('change', () => saveInput(newItem, type));
    } else {
        newItem.node.addEventListener('focusout', () => saveInput(newItem, type));
        newItem.node.addEventListener('keyup', saveOnEnter);
    }  
}

/**
 * Save or update new input text or input date.
 * @param { {} } newItem - New item to save.
 * @property { Node } node - New item input node.
 * @property { Object } instance - New item instance. 
 * @property { number } id - New item instance id.
 * @param { string } type - Button type that fired the event. 
 */
const saveInput = (newItem, type) => {
    if (type === 'new-task' || type === 'task' || type === 'due-date') {
        if (type === 'new-task') {
            newItem.instance.add(tasks);
            newItem.instance.update('title', newItem.node.value);

            if (!newItem.instance.tags.includes(currentDesk[0])) newItem.instance.addTag(String(currentDesk[0]));
            
            if (currentDesk[0] === 'today') {
                newItem.instance.deleteTimeTags();
                newItem.instance.update('dueDate', new Date());
            };

            renderTasks(currentDesk[0], false);
        }

        if (type === 'task' || type === 'due-date') {
            const taskToUpdate = findItemId(tasks, Number(newItem.id));
            if (type === 'task') {
                taskToUpdate.update('title', String(newItem.node.value));
            } else {
                taskToUpdate.deleteTimeTags();
                taskToUpdate.update('dueDate', new Date(newItem.node.value));
                taskToUpdate.updateTime();
            }

            renderTasks(currentDesk[0], false);
        }  
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
                tasks.map(task => {
                    if (task.tags.includes(String(listToUpdate.title.toLowerCase().trim()))) task.updateTag(listToUpdate.title.toLowerCase().trim(), String(newList).toLocaleLowerCase().trim());
                })
                listToUpdate.update('title', String(newList));
            }
            
            updateTagsOptions(null);
            updateTagsLabel(null, null, null);
            renderLists(false);
        }
    }
}

const deleteItem = (event, id, type) => {
    event.stopPropagation();
    const array = (type === 'list') ? lists : tasks;
    const itemToDelete = findItemId(array, Number(id));
   
    if (type === 'task' || type === 'list') {
        itemToDelete.delete(array);
    }

    if (type === 'due-date') {
        itemToDelete.update('dueDate', null);
        itemToDelete.deleteTimeTags();
        itemToDelete.updateTime();
    }

    if (type === 'list') {
        tasks.map(task => {
            if (task.tags.includes(String(itemToDelete.title.toLowerCase().trim()))) task.deleteTag(itemToDelete.title.toLowerCase().trim());
        });

        updateTagsOptions(null);
        updateTagsLabel(null, null, null);
        renderLists(false);
        renderTasks(currentDesk[0], false);
    } else {
        renderTasks(currentDesk[0], false);
    }
}

/**
 * Manage checkbox state.
 * @param { number|number[] } id - Checkbox id or checklist ids 
 * @param { 'checkbox-state'|'checklist-state'} type - Which checkbox fired the event  
 * @param { 'checkbox'|'checklist' } btn - Button that fire event
 */
 const checkboxState = (id, type, btn) => {
    const checkbox = selectNode(`#${btn}-${(btn === 'checkbox') ? 'task' : 'item'}-${id}`);
    
    const isCompleted = checkbox.checked ? true : false;
    
    id = (type === 'checkbox-state') ? id : id.split('-')
    const task = (type === 'checkbox-state') ? findItemId(tasks, Number(id)) : findItemId(findItemId(tasks, Number(id[0])).checklist, Number(id[1])); 
    task.update('complete', isCompleted);
    
    if (type === 'checkbox-state') {
        if (isCompleted) {
            task.addTag('complete');
            task.deleteTag('inbox');
            task.deleteTimeTags();
        } else {
            task.deleteTag('complete');
            task.addTag('inbox');
            task.updateTime();
        }
        
        setTimeout(() => renderTasks(currentDesk[0], false), 1000);   
    }
}

export const addNewCheck = () => {
    console.log('add new check');
}

export const editChecklist = () => {
    console.log('edit checklist');
}

export const deleteChecklist = () => {
    console.log('delete checklist item');
}