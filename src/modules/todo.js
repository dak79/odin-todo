import { selectNode, setAttributes } from './helpers';

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



