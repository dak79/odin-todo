import { selectNode, cleanNode, appendChildren } from "../../helpers";
import { listHeader, createListsUi } from "./lists-ui";

export const renderLists = () => {
    const section = selectNode('#side-section-lists');
    const displayHeader = listHeader();
    const displayLists = createListsUi();
    cleanNode(section);
    appendChildren(section, [displayHeader, displayLists]);
}