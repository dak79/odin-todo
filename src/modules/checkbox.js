/**
 * Populate checkboxes
 * @param { {} } object - Object for retriving informations.
 * @param { node } input - Input field type checkbox to update.
 * @param { node } label - Label to update.
 */
export const populateCheckboxes = (object, input, label) => {
  object.title
    ? (label.textContent = `${object.title}`)
    : (label.textContent = '');

  object.complete ? (input.checked = true) : (input.checked = false);
};
