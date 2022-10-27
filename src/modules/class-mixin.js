export const MixCrud = superclass => class extends superclass {
    add(array) {
        array.push(this);
    }
    
    find(array) {
        return array.find(element => element.id === this.id);
    }

    update(array, key, value) {
        const task = this.find(array);
        return (key in task) ? task[key] = value : false;
    }

    delete(array) {
        const task = this.find(array);
        const index = array.indexOf(task);
        array.splice(index, 1);
    }
}
