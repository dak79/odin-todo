import { createChecklistItem } from './ui/checklist-ui';
/**
 * Populate checklist
 * @param { {} } object - Object for retriving informations. 
 * @param { string } name - Part of ids, classes, names attribute values. 
 * @param { Node\ } wrapper - Node to append checklist item.
 */
 export const populateChecklist = (object, name, wrapper) => {
    object.checklist.map((item) => {
            createChecklistItem(object, item, name, wrapper);
    });

}
