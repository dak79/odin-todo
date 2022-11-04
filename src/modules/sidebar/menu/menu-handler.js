import { selectNode, cleanNode } from '../../helpers';
import { renderInbox, renderToday, renderThisWeek } from './menu-render';
export const addNewTask = () => {
    console.log('CLICK NEW TASK');
}

export const showInbox = () => {
    const desk = selectNode('#desk');
    cleanNode(desk);
    renderInbox();
}

export const showToday = () => {
    const desk = selectNode('#desk');
    cleanNode(desk);
    renderToday();
}

export const showThisWeek = () => {
    const desk = selectNode('#desk');
    cleanNode(desk);
    renderThisWeek();
}

export const showAnytime = () => {
    const desk = selectNode('#desk');
    cleanNode(desk);
    console.log('CLICK SHOW ANYTIME');
}