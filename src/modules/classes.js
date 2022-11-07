class TaskProperty {
    static #id = 0;
    static #incrementId() {
        this.#id++;
    }

    
    static #isToday(date) {
        const today = new Date();
        return date ? date.toLocaleDateString() === today.toLocaleDateString() ? true : false : false;
    }

    static #getWeekNumber(date) {
        const currentDate = date;
        const startDate = date ? new Date(date.getFullYear(), 0, 1) : false;
        const days = Math.ceil((currentDate - startDate) / (24 * 60 * 60 * 1000));
        const weekNumber = Math.floor(days/7);
        
        return weekNumber; 

    }

    constructor(title, description, dueDate, priority, checklist){
        this.type = 'task';
        TaskProperty.#incrementId();
        this.id = TaskProperty.#id;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.complete = false;
        this.tags = ['inbox'];
        this.updateTime();
        this.visualizedOn = '';
        this.priority = priority;
        this.checklist = checklist;
    }  

    addTag(value) {
        this.tags.push(value);
    } 

    deleteTag(value) {
        const index = this.tags.findIndex(tag => tag === value);
        if (index >= 0) this.tags.splice(index, 1);
    }

    updateTime() {
        if (TaskProperty.#isToday(this.dueDate) && (!this.tags.find(tag => tag === 'today'))) this.addTag('today');
        if (TaskProperty.#getWeekNumber(new Date()) === TaskProperty.#getWeekNumber(this.dueDate) && (!this.tags.find(tag => tag === 'this-week'))) this.addTag('this-week');
        if ((TaskProperty.#getWeekNumber(this.dueDate) > TaskProperty.#getWeekNumber(new Date()) || !this.dueDate) && (!this.tags.find(tag => tag === 'anytime'))) this.addTag('anytime');
        if (this.dueDate && (TaskProperty.#getWeekNumber(this.dueDate) < TaskProperty.#getWeekNumber(new Date()) || this.dueDate < new Date()) && (!this.tags.find(tag => tag === 'late'))) this.addTag('late');
    }
}

export const MixCrud = superclass => class extends superclass {
    // USED BY LIST AND TASK
    add(array) {
        array.push(this);
    }
    
    // // USED BY LIST
    // findId(array, id) {
    //     return array.find(element => element.id === id);
    // }

    // // USED BY LIST
    // findName(array) {
    //     return array.find(element => element.title.toLowerCase().trim() === this.title.toLowerCase().trim());
    // }

    // USED BY LIST
    update(key, value) {
        return (key in this) ? this[key] = value : false;
    }

    // USED BY LIST
    delete(array) {    
        const index = array.indexOf(this);
        array.splice(index, 1);
    }
}

export class Task extends MixCrud(TaskProperty) {
    constructor(...args) {
        super(...args);
    }
}