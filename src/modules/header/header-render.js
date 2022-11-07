import { selectNode, appendChildren } from "../helpers";
import { createLogo, createTitle, createBtnNewTask } from "./header-ui";
export const renderHeader = () => {
    const header = selectNode('#side-header');
    const logo = createLogo();
    const btnNewTask = createBtnNewTask();
    const title = createTitle();

    appendChildren(header, [logo, btnNewTask, title]);
}