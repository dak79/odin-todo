import { selectNode, setAttributes } from './helpers';

/**
 * 
 * @param { Node } textNode - Node to attach change field. 
 * @param { Object } attrs - Attributes for change fields.
 * @returns { Node[] } - input node / node to update
 */
 export const editInput = (textNode, parentNode, attrs) => {
    const nodeToUpdate = selectNode(`${textNode}`);
    const parent = selectNode(parentNode);
    const input = document.createElement('input');
    const inputValue = nodeToUpdate.textContent;
    setAttributes(input, attrs);
    input.value = inputValue;
    parent.replaceChild(input, nodeToUpdate);
    input.focus();

    return { input, output: nodeToUpdate };
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
    console.log(node);
    const itemToUpdate = updateItem(array, Number(node.dataset.number), propertyName, newValue)
    
    if (newTag) itemToUpdate.tags = itemToUpdate.tags.filter(tag => tag === newTag);
    if (itemToUpdate.type === 'task') itemToUpdate.updateTime();
    node.remove();

    return itemToUpdate
}



/**
 * Find and delete an instance from an array
 * @param { [] } array - Array where instance is.
 * @param { number } id - Id instance to delete.
 * @returns instance to delete
 */
export const deleteItem = (array, id) => {
    const itemToDelete = findItemId(array, Number(id));
    itemToDelete.delete(array, id);

    return itemToDelete;
}

/**
 * Find and update instance.
 * @param { [] } array - Array where instance is.
 * @param { number } id - Id instance to update
 * @param { string } property - Property to update. 
 * @param { string } newValue - New value for property
 * @returns Instance to update.
 */
export const updateItem = (array, id, property, newValue) => {
    const itemToUpdate = findItemId(array, Number(id));
    itemToUpdate.update(property, newValue);

    return itemToUpdate;
}

/**
 * Find an item by id in an array.
 * @param { array } array - Array where to perform search.
 * @param { number } id - Item id to serch for. 
 * @returns { object|undefined } - Object with this id or undefined.
 */
export const findItemId = (array, id) => array.find(element => element.id === id);

/**
 * Find an item by name in an array.
 * @param { array } array - Array where to perform search.
 * @param { string } name - Item name to search for.
 * @returns { object|undefined } - Object with this name or undefind.
 */
export const findItemName = (array, name) => array.find(element => (element.type === 'list') ? element.title.toLowerCase().trim() === name.toLowerCase().trim() : element.toLowerCase().trim() === name.toLowerCase().trim());



