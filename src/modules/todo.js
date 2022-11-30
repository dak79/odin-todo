import { findItemId } from "./helpers";

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
