/**
 * Populate task description field
 * @param { {} } object - Object for retriving data.
 * @param { Node } input - Node containing value.
 */
export const populateDescription = (object, input) => {
  if (object.description) input.value = object.description;
};
