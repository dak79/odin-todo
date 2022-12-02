export const currentDesk = ['inbox'];

export const updateCurrentDesk = value => {
    currentDesk.splice(0);
    currentDesk.push(value);
}