import { saveOnEnter, findItemId, selectNode, removeElement } from './helpers';
import { lists, checkListName } from './lists';
import { tasks, expandTask } from './tasks';
import { newTags, updateTagsLabel, updateTagsOptions } from './tags';
import { populateChecklist } from './checklist';
import { renderLists, newListUi } from './ui/lists-ui';
import { newTaskUi, renderTasks } from './ui/tasks-ui';
import { updatePriorityUi } from './ui/priority-ui';

import { currentDesk, updateCurrentDesk } from './menu';
import { Checklist, List, Task } from './classes';
import { addNewCheckUi } from './ui/checklist-ui';
import { appendInput, dateInputUi, textInputUi } from './ui/inputs-ui';
import { addExpandListener, clearListeners, expandListeners } from './listeners';

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
        const newItem = addNewItem(event, type, id);

        if (newItem) newInputListeners(newItem, type);
    }

    if (btn === 'edit') {
        const newItem = editItem(id, type);
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
                newItem.instance.updateTime();
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
    
    if (type === 'new-checklist' || type === 'checklist') {
        const id = (type === 'new-checklist') ? newItem.instance.taskId :
        newItem.id.split('-');
        
        const task = findItemId(tasks, Number((type === 'new-checklist') ? id : id[0]));

        if (type === 'new-checklist') {
            newItem.instance.add(task.checklist);
            newItem.instance.update('title', String(newItem.node.value));
        }
        
        if (type === 'checklist') {
            const checklist = findItemId(task.checklist, Number(id[1]));
            checklist.update('title', String(newItem.node.value));
        }

        const wrapper = selectNode(`#checklist-wrapper-${task.id}`);
        wrapper.innerHTML = '';
        populateChecklist(task, 'checklist', null);
        clearListeners(expandListeners);
        addExpandListener(task.id);
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
    id = (type === 'checklist') ? id.split('-') : id;

    const itemToDelete = findItemId(array, Number((type === 'checklist') ? id[0] : id));
   
    if (type === 'task' || type === 'list') {
        itemToDelete.delete(array);
    }

    if (type === 'due-date') {
        itemToDelete.update('dueDate', null);
        itemToDelete.deleteTimeTags();
        itemToDelete.updateTime();
    }

    if (type === 'checklist') {
        console.log(id);
        const checkToDelete = findItemId(itemToDelete.checklist, Number(id[1]));
        checkToDelete.delete(itemToDelete.checklist);
    }

    if (type === 'list') {
        tasks.map(task => {
            if (task.tags.includes(String(itemToDelete.title.toLowerCase().trim()))) task.deleteTag(itemToDelete.title.toLowerCase().trim());
        });

        updateTagsOptions(null);
        updateTagsLabel(null, null, null);
        renderLists(false);
        renderTasks(currentDesk[0], false);
    } 
    
    if (type === 'task' || type === 'due-date') {
        renderTasks(currentDesk[0], false);
    }

    if (type === 'checklist') {
        const wrapper = selectNode(`#checklist-wrapper-${id[0]}`);
        wrapper.innerHTML = '';
        populateChecklist(itemToDelete, 'checklist', null);
        clearListeners(expandListeners);
        addExpandListener(Number(id[0]));
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
    
    id = (type === 'checkbox-state') ? id : id.split('-');
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

    checkbox.blur();
}

/**
 * Add new task|list|checklist item
 * @param { event } event 
 * @property { Node } node - Input node for update.
 * @property { {} } instance - New task instance.
 * @returns { {} } New task data.
 */
export const addNewItem = (event, type, id) => {
    event.stopPropagation();

    const instance = (type === 'new-task') ? new Task() : (type === 'new-list') ? new List() : new Checklist(id, null);
   
    const input = (type === 'new-task') ? newTaskUi(instance) : (type === 'new-list') ? newListUi(instance) : addNewCheckUi({id}, instance, 'checklist', null)

    return {node: input, instance}

}

/**
 * Edit task|list|checklist
 * @param { number|number[] } id - task or list instance id or array task id and checklist id. 
 * @param { 'task'|'list'|'checklist' } type - Type of object 
 * @returns { [] } - Input node and instance.
 */
const editItem = (id, type) => {
    
    const input = (type === 'task') ? textInputUi({type, id}, 'edit', false, 40) : (type === 'list') ? textInputUi({type}, 'edit', false, 15) : (type === 'checklist') ? textInputUi({type, id}, 'edit', false, 20) : dateInputUi({id});

    const nodes = (type === 'task') ? appendInput(`#checkbox-wrapper-${id} > label`, `#checkbox-wrapper-${id}`, input, true) : (type === 'list') ? appendInput(`#title-list-${id}-btn`, `#list-item-list-${id}`, input, true) :
    (type === 'checklist') ? appendInput(`#checklist-item-wrapper-${id} > label`, `#checklist-item-wrapper-${id}`, input, true) : appendInput(`#task-${id}-due-date`, `#due-date-wrapper-${id}`, input, true);

    if (type === 'list') removeElement(`#btns-lists-${id}`);
        
    if (type === 'task') {
        const btn = selectNode(`#edit-${type}-${id}-btn`);
        btn.classList.add('svg-active');
    }
    
    return nodes;
}
