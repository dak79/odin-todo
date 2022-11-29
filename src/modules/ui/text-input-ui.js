import { setAttributes, selectNode } from '../helpers';


// object = task
// name = description
export const textInputUi = (object, name, withLabel ,maxLength) => {
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

export const populateDescription = (object, input) => {
    if (object.description) input.value = object.description;
}

export const appendTextInput = (selectorNode, selectorParentNode, input, isEdit) => {
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
        
        return { input, output: node }
    }

    return input;
}


/**
 * 
 * @param { Node } textNode - Node to attach change field. 
 * @param { Object } attrs - Attributes for change fields.
 * @returns { Node[] } - input node / node to update
 */
 const editInput = (textNode, parentNode, attrs) => {
    //const nodeToUpdate = selectNode(`${textNode}`);
    //const parent = selectNode(parentNode);
    const input = document.createElement('input');
    const inputValue = nodeToUpdate.textContent;
    setAttributes(input, attrs);
    input.value = inputValue;
    //parent.replaceChild(input, nodeToUpdate);
    input.focus();

    return { input, output: nodeToUpdate };
}