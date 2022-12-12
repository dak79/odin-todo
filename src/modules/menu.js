export const currentDesk = ['inbox'];

/**
 * Which desk visualize.
 * @param { string } value - Desk name. 
 */
export const updateCurrentDesk = value => {
    currentDesk.splice(0);
    currentDesk.push(value);
}
