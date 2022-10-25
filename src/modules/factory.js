export const todo = (title, description, dueDate, priority, checklist) => {
    let state = {
        title,
        description,
        dueDate,
        priority,
        checklist
    }
    return Object.assign({}, {state})
}