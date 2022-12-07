/**
 * Populate Radio Buttons.
 * @param { {} } object - Object for retriving informations.
 * @param { node } label - Label to update.
 * @param { node } input - Input 
 */
 export const populateRadio = (object, label, input) => {
    if (object.priority) {
            if (object.priority === label) {
                    input.checked = true;
            }
    } else {
            if (label === 'medium') {
                    input.checked = true;
            }
    }
}
