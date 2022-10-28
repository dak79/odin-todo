import { selectNode } from "./helpers";

export const btnNewListDisabled = (isStyled) => {
    const newListBtn = selectNode('#btn-new-list');
    newListBtn.disabled = true;
    if (isStyled) newListBtn.classList.add('btn-footer-disabled');
}

export const btnNewListEnabled = (wasStyled) => {
    const newListBtn = selectNode('#btn-new-list');
    newListBtn.disabled = false;
    if (wasStyled) newListBtn.classList.remove('btn-footer-disabled');
}