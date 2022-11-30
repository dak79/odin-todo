import { setAttributes, selectNode } from '../helpers';

/**
 * Create a text input field
 * @param { {} } object - Object for retriving data. 
 * @param { string } name - Part of ids and data-type values. 
 * @param { boolean } withLabel - Create  / Do not create a label. 
 * @param { number } maxLength - Max Length attribute value's.
 * @returns { node|node[] } - An input field|a label and an input field.
 */
export const textInputUi = (object, name, withLabel, maxLength) => {
    const input = document.createElement('input');
        setAttributes(input, {
            type: 'text',
            id: (name === 'description') ? `${object.type}-${name}-${object.id}` : `${object.type}-${name}`,
            class: `input-text`,
            maxLength: `${maxLength}`,
            'data-number':  `${object.id}`,
            'data-type': `${name}`
        });
    
    if (name === 'description') populateDescription(object, input);
    
    if (withLabel) {
        const label = document.createElement('label');
        setAttributes(label, {
            for: `${object.type}-${name}-${object.id}`,
            class: `${object.type}-${name}-label`
        });
        label.textContent = `${name.charAt(0).toUpperCase() + name.slice(1)}: `;

        return [label, input]
    }

    return input;
}

/**
 * Create a date input.
 * @param { {} } object - Object for retriving data.
 * @returns { Node } - A date input.
 */
export const dateInputUi = object => {
    const input = document.createElement('input');
    setAttributes(input, {
        type: 'date',
        id: `new-due-date-${object.id}`,
        class: 'new-due-date input-text',
        'data-number': `${object.id}`
    });

    return input;
}

/**
 * Append new text or date input node and if is an edit, populate it.
 * @param { Node } selectorNode - Node with a new child node|Node to replace
 * @param { Node } selectorParentNode - Parent od SelectorNode in case of replacement.
 * @param { Node } input - New input field. 
 * @param { boolean } isEdit - Update / not update of one input field
 * @returns 
 */
export const appendInput = (selectorNode, selectorParentNode, input, isEdit) => {
    const node = selectNode(selectorNode);
    const parentNode = selectNode(selectorParentNode);

    if (parentNode) {
        parentNode.replaceChild(input, node);
    } else {
        node.appendChild(input)
    }
    
    input.focus();
    
    if (isEdit) {
        input.value = node.textContent;
        const id = node.dataset.number
        
        return { node: input, id }
    }

    return input;
}

/**
 * Populate task description field
 * @param { {} } object - Object for retriving data. 
 * @param { node } input - Node containing value. 
 */
const populateDescription = (object, input) => {
    if (object.description) input.value = object.description;
}
