import { checkboxUi } from './checkbox-ui';
import { appendChildren, setAttributes, selectNode } from '../helpers';
import { btnsUi } from './btns-ui';
import { appendInput, textInputUi } from './inputs-ui';
import { populateChecklist } from '../tasks';

/**
 * Create checklist Ui
 * @param { {} } object - Object for retriving data. 
 * @param { string } name - Part of ids and classes atributes value's.  
 * @returns { node } Return a fieldset with a checkbox in it.
 */
export const checklistUi = (object, name) => {
    const fieldset = document.createElement('fieldset');
    setAttributes(fieldset, {
        id: `${name}-fieldset-${object.id}`,
        class: `${name}-fieldset`
    });

    const legend = document.createElement('legend');
    legend.textContent = `${name.charAt(0).toUpperCase() + name.slice(1)}: `;

    const wrapper = document.createElement('div');
    setAttributes(wrapper, {
        id: `${name}-wrapper-${object.id}`,
        class: `${name}s-wrapper`
    });

    if (object.checklist) populateChecklist(object, name, wrapper);

    appendChildren(fieldset, [legend, wrapper]);

    return fieldset;
}

export const createChecklistItem = (object, item, name, wrapper) => {

    if (!wrapper) wrapper = selectNode(`#checklist-wrapper-${object.id}`);
    
    const group = document.createElement('div');
        setAttributes(group, {
                id: `${name}-item-wrapper-${object.id}-${item.id}`,
                class: `${name}-item-wrapper`
            });

        const checkbox = checkboxUi({id: `${object.id}-${item.id}`, type: 'item', title: item.title, complete: item.complete}, 'checklist', 'Checklist item done or not done');

        appendChildren(group, checkbox);

        const btnsWrapper = document.createElement('span');
        setAttributes(btnsWrapper, {
            id: `${item.type}-btns-wrapper-${object.id}-${item.id}`,
            class: `${item.type}-btns-wrapper`
        });

        const btnEditChecklist = btnsUi({id: `${object.id}-${item.id}`, type: `${item.type}`}, 'edit', ['btns', 'checklist-edit-btn', 'svg-btns'], 'Edit this checklist item');
        
        const btnDeleteChecklist = btnsUi({id: `${object.id}-${item.id}`, type: `${item.type}`}, 'delete', ['btns', 'checklist-delete-btn', 'svg-btns'], 'Delete this checklist item');
        
        appendChildren(btnsWrapper, [btnEditChecklist, btnDeleteChecklist])
        group.appendChild(btnsWrapper);

        console.log(group);

        wrapper.appendChild(group);
}

export const addNewCheckUi = (object, item, name, wrapper) => {
    createChecklistItem(object, item, name, wrapper);

    const input = textInputUi(item, 'new', false, 30);
    appendInput(`#checklist-item-wrapper-${object.id}-${item.id} > label`, `#checklist-item-wrapper-${object.id}-${item.id}`, input, false);

    return input;
}
