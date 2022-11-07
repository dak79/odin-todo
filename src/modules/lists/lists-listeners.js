import { showList, saveNewList, saveOnEnter, deleteList, editList, saveEditList } from './lists-handlers';
import { selectNodes } from '../helpers';

export const addListenerLists = () => {
    const projects = selectNodes('.btn-lists');
    projects.forEach(project => project.addEventListener('click', showList))

    const deleteProjects = selectNodes('.svg-btns-delete')
    deleteProjects.forEach(btnDelete => btnDelete.addEventListener('click', deleteList));
    
    const editProject = selectNodes('.svg-btns-edit');
    editProject.forEach(btnEdit => btnEdit.addEventListener('click', editList));
}

export const newListListeners = node => {
    node.addEventListener('focusout', saveNewList.bind(this, node));
    node.addEventListener('keyup', saveOnEnter);
}

export const editListListeners = nodes => {
    nodes[1].addEventListener('focusout', saveEditList.bind(this, nodes));
    nodes[1].addEventListener('keyup', saveOnEnter);
}
