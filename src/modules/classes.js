class TaskBase {
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
        this.constructor.incrementId();
        this.id = this.constructor.id;
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
        if (TaskBase.#isToday(this.dueDate) && (!this.tags.find(tag => tag === 'today'))) this.addTag('today');
        if (TaskBase.#getWeekNumber(new Date()) === TaskBase.#getWeekNumber(this.dueDate) && (!this.tags.find(tag => tag === 'this-week'))) this.addTag('this-week');
        if ((TaskBase.#getWeekNumber(this.dueDate) > TaskBase.#getWeekNumber(new Date()) || !this.dueDate) && (!this.tags.find(tag => tag === 'anytime'))) this.addTag('anytime');
        if (this.dueDate && (TaskBase.#getWeekNumber(this.dueDate) < TaskBase.#getWeekNumber(new Date()) || this.dueDate < new Date()) && (!this.tags.find(tag => tag === 'late'))) this.addTag('late');
    }
}

class ListBase {
    // static #id = 0;
    // static #incrementId() {
    //     this.#id++;
    // }

    constructor(title) {
        this.constructor.incrementId();
        this.type = 'list';
        this.id = this.constructor.id;
        this.title = title;
        this.tags = ['list'];
    }
}

export const MyMixin = superclass => class extends superclass {
    static id = 0;
    static incrementId() {
        this.id++;
    }

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

export class List extends MyMixin(ListBase) {
    constructor(...args) {
        super(...args);
    }
}

export class Task extends MyMixin(TaskBase) {
    constructor(...args) {
        super(...args);
    }
}