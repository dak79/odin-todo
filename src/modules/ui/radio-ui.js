import { appendChildren, setAttributes } from '../helpers';

/**
 * Radio buttons and priority UI.
 * @param { {} } object - Object for retriving information. 
 * @param { string } name - Part of ids, classes, names value.
 * @param { string } legendText - Legend text value.
 * @param { ['low', 'medium', 'high'] } radioLabels - Radio button text.
 * @returns { node } - A fieldset with radio buttons.
 */
export const radioUi = (object, name, legendText, radioLabels) => {
    const fieldset = document.createElement('fieldset');
    setAttributes(fieldset, {
        id: `${name}-fieldset-${object.id}`,
        class: `${name}-fieldset`
    });

    const legend = document.createElement('legend');
    legend.textContent = legendText;

    const wrapper = document.createElement('div');
    setAttributes(wrapper, {
        id: `${name}s-wrapper-${object.id}`,
        class: `${name}s-wrapper`
    });

    radioLabels.map((radioLabel, index )=> {

        const group = document.createElement('div');
            setAttributes(group, {
                id: `${name}-wrapper-${object.id}-${index}`,
                class: `${name}-wrapper`
            });

        const input = document.createElement('input');
        setAttributes(input, {
            type: 'radio',
            id: `${name}-${object.id}-${index}`,
            name: `priority-${object.id}`,
            value: `${radioLabel}`,
            'aria-label': `${radioLabel} radio button`,
            'data-number': `${object.id}`,
            'data-type': `${name}-state`,
            'data-btn': `${name}`
        });

        const label = document.createElement('label');
        setAttributes(label, {
            for: `${name}-${object.id}-${index}`,
            class: `${name}-labels`,
            'data-number': `${object.id}`
        });
        label.textContent = `${radioLabel.charAt(0).toUpperCase() + radioLabel.slice(1) }`;
        
        populateRadio(object, radioLabel, input);
        
        appendChildren(group, [input, label]);

        wrapper.appendChild(group);
    });

    appendChildren(fieldset, [legend, wrapper]);

    return fieldset;
}

/**
 * Populate Radio Buttons.
 * @param { {} } object - Object for retriving informations.
 * @param { node } label - Label to update.
 * @param { node } input - Input 
 */
const populateRadio = (object, label, input) => {
    if (object.priority) {
        if (object.priority === label) {
            input.checked = true;
        } 
    } else {
        if (label === 'medium') {
            input.checked = true
        }
    }
}
