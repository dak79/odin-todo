import { createProjectsUi } from './lists-ui';
import { selectNode, cleanNode } from '../helpers';

export const renderLists = () => {
    const section = selectNode('#side-section-lists');
    const updateList = createProjectsUi();
    cleanNode(section);
    section.appendChild(updateList);
}
