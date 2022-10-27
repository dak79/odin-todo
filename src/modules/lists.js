import { renderLists } from "./ui-renders";
import { showList, saveNewList, saveNewListEnter, deleteList, editList } from "./handlers";
import { List } from "./classes";
import { lists } from "./todo";
import { selectNode, selectNodes } from "./helpers";

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

    const deleteProjects = selectNodes('.btn-lists-delete')
    deleteProjects.forEach(btnDelete => btnDelete.addEventListener('click', deleteList));
    const editProject = selectNodes('.btn-lists-edit');
    editProject.forEach(btnEdit => btnEdit.addEventListener('click', editList));
}

export const newListEvent = () => {
    const newTitle = selectNode('#new-list-title');
    newTitle.addEventListener('focusout', saveNewList);
    newTitle.addEventListener('keyup', saveNewListEnter);
}
