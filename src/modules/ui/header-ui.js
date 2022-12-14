import { selectNode, appendChildren } from '../helpers';
import { btnsUi } from './btns-ui';

/**
 * Render header.
 */
export const renderHeader = () => {
  const header = selectNode('#nav-header');
  const logo = createLogo();
  const btnNewTask = btnsUi(
    { type: 'task' },
    'new',
    ['btns', 'round-btns', 'round-btns-big'],
    'Add new task'
  );
  const title = createTitle();

  appendChildren(header, [logo, btnNewTask, title]);
};

const createLogo = () => {
  const logo = document.createElement('div');
  logo.classList.add('nav-logo');
  logo.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#f59e0b" d="M3,5H9V11H3V5M5,7V9H7V7H5M11,7H21V9H11V7M11,15H21V17H11V15M5,20L1.5,16.5L2.91,15.09L5,17.17L9.59,12.59L11,14L5,20Z" /></svg>';

  return logo;
};

const createTitle = () => {
  const title = document.createElement('h1');
  title.classList.add('titles');
  title.textContent = 'ToDo';

  return title;
};
