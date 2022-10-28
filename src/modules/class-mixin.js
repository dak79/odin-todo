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

    delete(array, id) {    
        const index = array.indexOf(id);
        array.splice(index, 1);
    }
}
