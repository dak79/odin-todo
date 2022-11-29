import { setAttributes } from '../helpers';

/**
 * Create a Checkbox UI
 * @param { Object } object - Object for retriving data. 
 * @param { string } name - Value for composing ids, classes, names, data-type, data-btn attributes
 * @param { string } ariaLabel - Content of aria-label 
 * @returns { Node[] } - Array with input and label for checkboxes
 */
export const checkboxUi = (object, name, ariaLabel) => {
    const input = document.createElement('input');
    setAttributes(input, {
    type: 'checkbox',
    id: `${object.type}-${name}-${object.id}`,
    class: `${object.type}s-${name}`,
    name: `${object.type}-${name}-${object.id}`,
    'aria-label': `${ariaLabel}`,
    'data-number': `${object.id}`,
    'data-type': `${name}-state`,
    'data-btn': `${name}`
    });

    const label = document.createElement('label');
    setAttributes(label, {
        for: `${object.type}-${name}-${object.id}`,
        class: `${object.type}-${name}-labels`,
        'data-number': `${object.id}`
    });

    populateCheckboxes(object, input, label);

    return [input, label];
}

/**
 * Populate checkboxes
 * @param { Object } object - Object for retrivin informations. 
 * @param { node } input - Input field type checkbox to update. 
 * @param { node } label - Label to update.
 */
export const populateCheckboxes = (object, input, label) => {
    (object.title) ? label.textContent = `${object.title}` : label.textContent = '';
    (object.complete) ? input.checked = true : input.checked = false;
}
