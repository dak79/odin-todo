import { addAppListeners, clearListeners } from './listeners';
import { saveOnEnter, selectNode } from './helpers';
import { editInput, findItemId, saveEditInput } from './todo';
import { List, Task } from './classes';
import { lists, checkListName } from './lists/lists';
import { tasks } from './task/tasks';
import { renderLists, newListUi, editList, editListUi } from './lists/lists-ui';
import { editTaskUi, newTaskUi, renderTasks, taskItem } from './task/tasks-ui';

export const btnsController = event => {
    event.stopPropagation();

    const btn = event.target.dataset.btn;
    const type = event.target.dataset.type;

    if (btn === 'edit') {
        const nodes = (type === 'list') ? editListUi(event) : (type === 'task' || type === 'due-date') ? editTaskUi(event) : 0;
        
        if (nodes) {
            clearListeners();
            editListeners(type, nodes);
        }

    } else if (btn === 'delete') {
        deleteBtns(event);
    } else if (btn === 'new-task' || btn === 'new-list') {
        newBtns(event);
    }

    
}

const editBtns = event => {
    event.stopPropagation();

    const type = event.target.dataset.type;
    const nodes = (type === 'list') ? 
                    editListUi(event) : 
                    (type === 'task') ? 
                    editTaskUi(event)
                        
                        : 
                    (type === 'due-date') ? 

                    editDueDateUi(event)
                    
                        
                        : 
                    0;

    if (nodes) {
        clearListeners();
        editListeners(type, nodes);
    }
}

const editListeners = (type, nodes) => {
    if (type === 'due-date') {
        nodes[1].addEventListener('change', () => saveInput(type, nodes));
    } else {
        nodes[1].addEventListener('focusout', () => saveInput(type, nodes));
        nodes[1].addEventListener('keyup', saveOnEnter);
    }
}

const saveInput= (type, nodes) => {
    if (type === 'list') {
        const newTitle = checkListName(nodes[1]);
        if (newTitle) {
            saveEditInput(nodes[0], lists, 'title', String(newTitle), null);
            renderLists(false);
        } 
    } else if (type === 'task') {
            const taskToUpdate = saveEditInput(nodes[0], tasks, 'title', nodes[1].value, null);
            
            renderTasks(taskToUpdate.visualizedOn || 'Inbox', false);
    } else {
        const taskToUpdate = saveEditInput(nodes[0], tasks, 'dueDate', new Date(nodes[1].value), 'inbox');
        
        renderTasks(taskToUpdate.visualizedOn || 'inbox', false);
    }
}

const deleteBtns = event => {
    event.stopPropagation();

    const id = event.target.dataset.number;
    const type = event.target.dataset.type;
    const array = (type === 'list') ? lists : (type === 'task' || type === 'due-date') ? tasks : 0;
    const itemToDelete = findItemId(array, Number(id));

    (type === 'due-date') ? itemToDelete.update('dueDate', null) : itemToDelete.delete(array, id);
    clearListeners();
    
    if (type === 'list') {
        renderLists(false);
    } else if (type === 'task') {
        renderTasks(itemToDelete.visualizedOn || 'inbox', false);
    } else {
        itemToDelete.tags = itemToDelete.tags.filter(tag => tag === 'inbox');
        itemToDelete.updateTime();
        renderTasks(itemToDelete.visualizedOn || 'inbox', false);
    }

}

const newBtns = event => {
    event.stopPropagation();

    const type = event.target.dataset.type;
    if (type === 'new-list') {
        const inputField = newListUi();
        clearListeners();
        newInputListeners(inputField, type, null);
    } else {
        const newTask = new Task();
        const inputField = newTaskUi(newTask);
        clearListeners();
        addAppListeners();
        newInputListeners(inputField, type, newTask);
    }
}

const newInputListeners = (node, type, newItem) => {
    node.addEventListener('focusout', () => saveNewInput(node, type, newItem));
    node.addEventListener('keyup', saveOnEnter);
}

const saveNewInput = (input, type, newItem) => {
    if (type === 'new-list') {
            const newListTitle = checkListName(input);
        
            if (newListTitle) {
                const newList = new List(newListTitle);
                newList.add(lists);
                clearListeners();
                renderLists(false);
            }
    } else {
        newItem.add(tasks);
        newItem.update('title', input.value);
        clearListeners();
        renderTasks(newItem.visualizedOn || 'inbox', false);
    }
}
