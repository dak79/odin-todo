import { setAttributes, selectNodes, findItemId } from '../helpers';
import { lists } from '../lists';
import { tasks } from '../tasks';

/**
 * Create tags ui.
 * @param { {} } object - Object for retriving data. 
 * @param { string } name - Part of value of ids, classes, name and data-type attributes.  
 * @param { string } labelText - label.textContent value. 
 * @returns { node[] } - A label and a select nodes.
 */
export const tagsUi = (object, name, labelText) => {
    const label = document.createElement('label');
    setAttributes(label, {
        for: `${object.type}-${name}-${object.id}`,
        class: `${object.type}-${name}-labels`,
        'data-number': `${object.id}`
    });
    updateTagsLabel(object, label, labelText);

    const select = document.createElement('select');
    setAttributes(select, {
        id: `${object.type}-${name}-${object.id}`,
        class: `${object.type}-${name}`,
        name: `${name}`,
        'data-number': `${object.id}`,
        'data-type': `${name}`
    });
    updateTagsOptions(select);

    return [label, select]
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
        select.remove(0)
    }

    if (select) {
        select.options.add(new Option('--Choose List--', ''));
        lists.map(list => {
            let opti = Array.from(select.options).map(opt => opt.text);
              
            if(!opti.includes(list.title)) select.options.add(new Option(list.title, list.title))
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
        addTagsLabel(object, label, labelText)
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
