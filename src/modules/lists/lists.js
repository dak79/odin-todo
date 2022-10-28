import { renderLists } from './lists-render';
import { showList, saveNewList, saveOnEnter, deleteList, editList, saveEditList } from './lists-handlers';
import { List } from './list-class';
import { selectNode, selectNodes } from '../helpers';

export const lists = [];

export const defaultList = () => {
    const life = new List('Life');
    const work = new List('Work');

    life.add(lists);
    work.add(lists); 
    renderLists();
    addListenerLists();
}

export const addListenerLists = () => {
    const projects = selectNodes('.btn-lists');
    projects.forEach(project => project.addEventListener('click', showList))

    const deleteProjects = selectNodes('.svg-btn-delete')
    deleteProjects.forEach(btnDelete => btnDelete.addEventListener('click', deleteList));
    
    const editProject = selectNodes('.svg-btn-edit');
    editProject.forEach(btnEdit => btnEdit.addEventListener('click', editList));
}

export const newListListeners = () => {
    const newTitle = selectNode('#new-list-title');
    newTitle.addEventListener('focusout', saveNewList);
    newTitle.addEventListener('keyup', saveOnEnter);
}

export const editListListeners = nodes => {
    nodes[1].addEventListener('focusout', saveEditList.bind(this, nodes));
    nodes[1].addEventListener('keyup', saveOnEnter);
}
