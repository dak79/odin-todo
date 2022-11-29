import { checkboxUi } from './checkbox-ui';
import { appendChildren, setAttributes } from '../helpers';
import { btnsUi } from './btns-ui';
/**
 * 
 * @param { Object } object - Object for retriving data. 
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

    object.checklist.map((item, index) => {

        const group = document.createElement('div');
        setAttributes(group, {
                id: `${name}-item-wrapper-${object.id}-${index}`,
                class: `${name}-item-wrapper`
            });

        const checkbox = checkboxUi(item, 'item', 'Checklist item done or not done');

        appendChildren(group, checkbox);

        const btnsWrapper = document.createElement('span');
        setAttributes(btnsWrapper, {
            id: `${item.type}-btns-wrapper-${item.id}`,
            class: `${item.type}-btns-wrapper`
        });

        const btnEditChecklist = btnsUi(item, 'checklist', 'edit', 'btns checklist-edit-btn svg-btns', `Edit checklist: ${item.title}`, 'checklist', 'edit', index);

        const btnDeleteChecklist = btnsUi(item, 'checklist', 'delete', 'btns checklist-delete-btn svg-btns', `Delete checklist: ${item.title}`, 'checklist', 'delete', index);
        appendChildren(btnsWrapper, [btnEditChecklist, btnDeleteChecklist])
        group.appendChild(btnsWrapper);

        wrapper.appendChild(group);
    });
    
    appendChildren(fieldset, [legend, wrapper]);

    return fieldset;
}
