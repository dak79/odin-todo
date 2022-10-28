export const MixCrud = superclass => class extends superclass {
    add(array) {
        array.push(this);
    }
    
    findId(array, id) {
        return array.find(element => element.id === id);
    }

    findName(array) {
        return array.find(element => element.title.toLowerCase().trim() === this.title.toLowerCase().trim());
    }

    update(property, key, value) {
        return (key in property) ? property[key] = value : false;
    }

    delete(array) {
        const task = this.find(array);
        const index = array.indexOf(task);
        array.splice(index, 1);
    }
}
