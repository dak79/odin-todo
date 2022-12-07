import { setAttributes } from '../helpers';
import { updateTagsLabel, updateTagsOptions } from '../tags';

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

    return [label, select];
}
