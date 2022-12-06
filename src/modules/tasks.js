import { appendChildren, findItemId, selectNode } from './helpers';
import { addExpandListener } from './listeners';
import { expandTaskUi } from './ui/tasks-ui';
import { Checklist } from './classes';
import { updateTagsLabel } from './ui/select-ui';
import { checkboxUi } from './ui/checkbox-ui';

// Tasks database
export const tasks = [];

/**
 * Sort tasks array by due date and id (when due dat is the same).
 * @returns sorted array.
 */
export const orderTaskByDate = () => tasks.sort((firstDate, secondDate) => firstDate.dueDate - secondDate.dueDate || secondDate.id - firstDate.id
);

/**
 * Update array tags according to due date (and new due date).
 * @returns Updated array.
 */
export const updateTimeTasks = () => tasks.map(task => task.updateTime());

/**
 * Expand task.
 * @param { number } id - Task id. 
 */
export const expandTask = id => {
        
        const task = findItemId(tasks, Number(id));
        task.expanded = task.expanded ? false : true;
        const hook = selectNode(`#list-item-task-${id}`);

        if (task.expanded) {
                hook.classList.remove('expand-btn-down');
                hook.classList.add('expand-btn-up');
                const nodes = expandTaskUi(task);
                hook.appendChild(nodes.wrapper);
                addExpandListener(id);
                
        } else {
                hook.classList.remove('expand-btn-up');
                hook.classList.add('expand-btn-down');
                const expandedSection = selectNode(`#expand-wrapper-${id}`);
                if (expandedSection) expandedSection.remove();
        }        
}

/**
 * Update tags when selected.
 * @param { event } event 
 * @param { number } id - Task id. 
 * @param { string } value - Selected value.
 */
export const newTags = (event, id, value) => {
        const task = findItemId(tasks, Number(id));
        const newTag = String(value).toLocaleLowerCase().trim();
        const select = event.target;

        if(!task.tags.includes(newTag)) {
                task.addTag(newTag);
        } else {
                task.deleteTag(newTag);
        }

        updateTagsLabel(null, null, null);
        select.selectedIndex = 0;
        select.blur();
}

export const addNewCheck = event => {
        event.stopPropagation();
        const id = event.target.dataset.number

        const instance = new Checklist();
        console.log(instance); 
        const check = checkboxUi(instance, 'item', 'New checklist item');
        console.log(check);
        console.log('add new check');

        const a = check[1]
        const b = inpu

        const wrapper = selectNode(`#checklist-wrapper-${id}`);
        appendChildren(wrapper, check);
    }
