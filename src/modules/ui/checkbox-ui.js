import { setAttributes } from '../helpers';
import { populateCheckboxes } from '../checkbox';

/**
 * Create a Checkbox UI
 * @param { {} } object - Object for retriving data. 
 * @param { string } name - Value for composing ids, classes, names, data-type, data-btn attributes
 * @param { string } ariaLabel - Content of aria-label 
 * @returns { Node[] } - Array with input and label for checkboxes
 */
export const checkboxUi = (object, name, ariaLabel) => {
    const input = document.createElement('input');
    setAttributes(input, {
    type: 'checkbox',
    id: `${name}-${object.type}-${object.id}`,
    class: `${object.type}s-${name}`,
    name: `${object.type}-${name}-${object.id}`,
    'aria-label': `${ariaLabel}`,
    'data-number': `${object.id}`,
    'data-type': `${name}-state`,
    'data-btn': `${name}`
    });

    const label = document.createElement('label');
    setAttributes(label, {
        for: `${name}-${object.type}-${object.id}`,
        class: `${object.type}-${name}-labels`,
        'data-number': `${object.id}`
    });

    populateCheckboxes(object, input, label);

    return [input, label];
}
