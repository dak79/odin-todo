import { tasks } from './tasks';
import { lists } from './lists';
import { findItemId, selectNodes } from './helpers';
import { renderTasks } from './ui/tasks-ui';
import { currentDesk } from './menu';

/**
 * Update tags when selected.
 * @param { event } event
 * @param { number } id - Task id.
 * @param { string } value - Selected value.
 */
export const newTags = (event, id, value) => {
  const task = findItemId(tasks, Number(id));
  const newTag = String(value).toLocaleLowerCase().trim();
  const select = event.target;

  if (!task.tags.includes(newTag)) {
    task.addTag(newTag);
  } else {
    task.deleteTag(newTag);
  }

  renderTasks(currentDesk[0], false);
  updateTagsLabel(null, null, null);
  select.selectedIndex = 0;
  select.blur();
};

/**
 Populate and update tags labels.
* @param { {}|null} object - Object for retriving data. 
* @param { Node|Node[]|null} label - Label node | label nodes | null
* @param { string|null} labelText 
*/
export const updateTagsLabel = (object, label, labelText) => {
  if (!label) {
    label = selectNodes('.task-tags-labels');
    label.forEach((label) => {
      const id = label.dataset.number;
      const task = findItemId(tasks, Number(id));
      addTagsLabel(task, label, `List:`);
    });
  } else {
    addTagsLabel(object, label, labelText);
  }
};

/**
 * Add tags labels
 * @param { {}|null} object - Object for retriving data.
 * @param { Node|Node[]|null} label - Label node | label nodes | null
 * @param { string|null} labelText
 */
const addTagsLabel = (object, label, labelText) => {
  label.textContent = '';
  const tagsLabel = object.tags
    .map((tag) => tag.charAt(0).toUpperCase() + tag.slice(1).replace('-', ' '))
    .join(' - ');

  label.textContent = `${labelText} ${tagsLabel}`;
};

/**
 * Populate and update select options.
 * @param { Node|Node[]|null } select - Select node | select nodes | null.
 */
export const updateTagsOptions = (select) => {
  if (!select) {
    select = selectNodes(`select[name='tags']`);
    select.forEach((box) => addSelectOptions(box));
  } else {
    addSelectOptions(select);
  }
};

/**
 * Add select options to select element.
 * @param { Node|Node[]|null } select - Select node | select nodes | null.
 */
const addSelectOptions = (select) => {
  while (select.options.length > 0) {
    select.remove(0);
  }

  if (select) {
    select.options.add(new Option('--Choose List--', ''));
    lists.map((list) => {
      let opti = Array.from(select.options).map((opt) => opt.text);

      if (!opti.includes(list.title))
        select.options.add(new Option(list.title, list.title));
    });
  }
};
