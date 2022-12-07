import { findItemId, selectNode, selectNodes } from './helpers';
import { addExpandListener } from './listeners';
import { expandTaskUi } from './ui/tasks-ui';
import { createChecklistItem } from './ui/checklist-ui';
import { lists } from './lists';


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

/**
 * Populate and update select options.
 * @param { Node|Node[]|null } select - Select node | select nodes | null.
 */
export const updateTagsOptions = select => {
        if (!select) {
                select = selectNodes(`select[name='tags']`);
                select.forEach(box => addSelectOptions(box));
        } else {
                addSelectOptions(select);
        }  
}

/**
* Add select options to select element.
* @param { Node|Node[]|null } select - Select node | select nodes | null. 
*/
const addSelectOptions = select => {
        while (select.options.length > 0){
                select.remove(0);
        }
        
        if (select) {
                select.options.add(new Option('--Choose List--', ''));
                lists.map(list => {
                        let opti = Array.from(select.options).map(opt => opt.text);
                        
                        if(!opti.includes(list.title)) select.options.add(new Option(list.title, list.title));
                });
        }
}

/**
 * Populate and update tags labels.
 * @param { {}|null} object - Object for retriving data. 
 * @param { Node|Node[]|null} label - Label node | label nodes | null
 * @param { string|null} labelText 
 */
 export const updateTagsLabel = (object, label, labelText) =>{
        if (!label) {
                label = selectNodes('.task-tags-labels');
                label.forEach(label => {
                        const id = label.dataset.number;
                        const task = findItemId(tasks, Number(id));
                        addTagsLabel(task, label, `List:`);
                });    
        } else {
                addTagsLabel(object, label, labelText);
        }
}

/**
* Add tags labels
* @param { {}|null} object - Object for retriving data. 
* @param { Node|Node[]|null} label - Label node | label nodes | null
* @param { string|null} labelText 
*/
const addTagsLabel = (object, label, labelText) => {
        label.textContent = '';
        const tagsLabel = object.tags.map(tag => tag.charAt(0).toUpperCase() + tag.slice(1).replace('-', ' ')).join(' - ');
        
        label.textContent = `${labelText} ${tagsLabel}`;
}

/**
 * Populate checkboxes
 * @param { {} } object - Object for retriving informations. 
 * @param { node } input - Input field type checkbox to update. 
 * @param { node } label - Label to update.
 */
export const populateCheckboxes = (object, input, label) => {
        (object.title) ? label.textContent = `${object.title}` : label.textContent = '';
        
        (object.complete) ? input.checked = true : input.checked = false;
}

/**
 * Populate checklist
 * @param { {} } object - Object for retriving informations. 
 * @param { string } name - Part of ids, classes, names attribute values. 
 * @param { Node\ } wrapper - Node to append checklist item.
 */
export const populateChecklist = (object, name, wrapper) => {
        object.checklist.map((item) => {
                createChecklistItem(object, item, name, wrapper);
        });
}

/**
 * Populate task description field
 * @param { {} } object - Object for retriving data. 
 * @param { node } input - Node containing value. 
 */
export const populateDescription = (object, input) => {
        if (object.description) input.value = object.description;
}

/**
 * Populate Radio Buttons.
 * @param { {} } object - Object for retriving informations.
 * @param { node } label - Label to update.
 * @param { node } input - Input 
 */
export const populateRadio = (object, label, input) => {
        if (object.priority) {
                if (object.priority === label) {
                        input.checked = true;
                }
        } else {
                if (label === 'medium') {
                        input.checked = true;
                }
        }
}

