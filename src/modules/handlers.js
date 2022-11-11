import { clearListeners } from './listeners';
import { saveOnEnter } from './helpers';
import { saveEditInput } from './todo';
import { List } from './classes';
import { lists, checkListName, deleteList, addNewList } from './lists/lists';
import { tasks, deleteTask, deleteDate, addNewTask } from './task/tasks';
import { renderLists, editListUi } from './lists/lists-ui';
import { editTaskUi, renderTasks } from './task/tasks-ui';


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
        (type === 'list') ? deleteList(event) : (type === 'task') ? deleteTask(event) : (type === 'due-date') ? deleteDate(event) : 0;
    } else if (btn === 'new-task' || btn === 'new-list') {
        const newItem = (type === 'new-list') ? addNewList(event) : (type === 'new-task') ? addNewTask(event) : 0;

        if (newItem) {
            clearListeners();
            newInputListeners(newItem[0], type, newItem[1])
        }
    }
 
}

// const controllerListener = (type, nodes, newItem, callback) => {
//     console.log(type, nodes);
//     if (type === 'due-date') {
//         nodes[1].addEventListener('change', () => callback(type, nodes));
//     } else {
//         nodes[1].addEventListener('focusout', () => callback(type, nodes, newItem));
//         nodes[1].addEventListener('keyup', saveOnEnter);

//     }
// }

const editListeners = (type, nodes) => {

    console.log(nodes)
    if (type === 'due-date') {
        nodes[1].addEventListener('change', () => saveInput(type, nodes));
    } else {
        nodes[1].addEventListener('focusout', () => saveInput(type, nodes));
        nodes[1].addEventListener('keyup', saveOnEnter);
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
