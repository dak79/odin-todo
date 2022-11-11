import { selectNode, setAttributes } from './helpers';

/**
 * 
 * @param { Node } textNode - Node to attach change field. 
 * @param { Object } attrs - Attributes for change fields.
 * @returns { Node[] } - Node to attach change fields / change field node.
 */
 export const editInput = (textNode, parentNode, attrs) => {
    const text = selectNode(`${textNode}`);
    const parent = selectNode(parentNode);
    const input = document.createElement('input');
    const inputValue = text.textContent;
    setAttributes(input, attrs);
    input.value = inputValue;
    parent.replaceChild(input, text);
    input.focus();

    return [text, input];
}

/**
 * 
 * @param { node } node - Node to update. 
 * @param { array } array - Array where item to update is.
 * @param { string } propertyName - Property to update.
 * @param { string|Date } newValue - New value for property.
 * @param { string } newTag - Tag to assign to item.
 */
export const saveEditInput = (node, array, propertyName, newValue, newTag) => {
    const itemToUpdate = findItemId(array, Number(node.dataset.number));
    itemToUpdate.update(propertyName, newValue);

    if (newTag) itemToUpdate.tags = itemToUpdate.tags.filter(tag => tag === newTag);
    if (itemToUpdate.type === 'task') itemToUpdate.updateTime();
    node.remove();

    return itemToUpdate
}

export const newInput = (selectorNode, selectorParentNode, attrs) => {
    const input = document.createElement('input');
    setAttributes(input, attrs);

    const node = selectNode(selectorNode);
    const parentNode = selectNode(selectorParentNode);

    if (parentNode) {
        parentNode.replaceChild(input, node);
    } else {
        node.appendChild(input)
    }

    input.focus();

    return input;
}

export const deleteItem = (array, id) => {
    const itemToDelete = findItemId(array, Number(id));
    itemToDelete.delete(array, id);

    return itemToDelete;
}

export const updateItem = (array, id, property, newValue) => {
    const itemToUpdate = findItemId(array, Number(id));
    itemToUpdate.update(property, newValue);

    return itemToUpdate;
}

/**
 * 
 * @param { array } array - Array where to perform search.
 * @param { number } id - Item id to serch for. 
 * @returns { object|undefined } - Object with this id or undefined.
 */
export const findItemId = (array, id) => array.find(element => element.id === id);

/**
 * 
 * @param { array } array - Array where to perform search.
 * @param { string } name - Item name to search for.
 * @returns { object|undefined } - Object with this name or undefind.
 */
export const findItemName = (array, name) => array.find(element => element.title.toLowerCase().trim() === name.toLowerCase().trim());

