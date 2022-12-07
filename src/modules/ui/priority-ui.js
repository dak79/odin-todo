import { selectNode, setAttributes } from '../helpers';

export const updatePriorityUi = (task, wrapperMsg, isChanging) => {
    if (isChanging) wrapperMsg = selectNode(wrapperMsg);
    
    if (wrapperMsg.querySelector(`#low-priority-${task.id}`)) wrapperMsg.querySelector(`#low-priority-${task.id}`).remove();
    
    if (wrapperMsg.querySelector(`#high-priority-${task.id}`)) wrapperMsg.querySelector(`#high-priority-${task.id}`).remove();
    
    if (task.priority === 'low') {
        const lowPriority = document.createElement('span');
        setAttributes(lowPriority, {
            id: `low-priority-${task.id}`,
            class: 'low-priority'
        });

        lowPriority.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M7.725 21.75 5.85 19.9l1.25-1.225Q4.325 18.6 2.337 16.5.35 14.4.35 11.45q0-3 2.125-5.113Q4.6 4.225 7.6 4.225h4.575v3.4H7.6q-1.625 0-2.737 1.113Q3.75 9.85 3.75 11.45q0 1.525.963 2.612Q5.675 15.15 7 15.3h.025L5.85 14.125l1.875-1.85 4.725 4.75Zm6.45-3.05v-3.4h9.45v3.4Zm0-5.525v-3.4h9.45v3.4Zm0-5.55v-3.4h9.45v3.4Z"/></svg>`

        wrapperMsg.appendChild(lowPriority);
    }

    if (task.priority === 'high') {
        const highPriority = document.createElement('span');
        setAttributes(highPriority, {
            id: `high-priority-${task.id}`,
            class: 'high-priority'
        });

        highPriority.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M12 22.8q-1.25 0-2.137-.887-.888-.888-.888-2.138t.888-2.138q.887-.887 2.137-.887t2.137.9q.888.9.888 2.15t-.888 2.125Q13.25 22.8 12 22.8Zm-2.675-8.1V1.4h5.35v13.3Z"/></svg>`

        wrapperMsg.appendChild(highPriority);
    }
}
