"use strict";
class Node {
    constructor(value, id) {
        this.value = value;
        this.next = null;
        this.id = id;
    }
    getValue() { return this.value; }
    getNext() { return this.next; }
    setValue(v) { this.value = v; }
    setNext(n) { this.next = n; }
    getId() { return this.id; }
    toString() { return `${this.value}`; }
}
class Stack {
    constructor() {
        this.root = null;
        this.last = null;
        this._ids = 0;
        this.size = 0;
    }
    isEmpty() {
        return this.root == null;
    }
    push(value) {
        let newnode = new Node(value, this._ids);
        if (this.isEmpty()) {
            this.root = newnode;
        } else {
            newnode.setNext(this.root);
            this.root = newnode;
        }
        this.size += 1;
        this._ids += 1;
    }
    pop() {
        if (!this.isEmpty()) {
            const valuer = this.root.getValue();
            this.root = this.root.getNext();
            this.size -= 1;
            return valuer;
        }
    }
    top() {
        if (!this.isEmpty()) {
            return this.root.getValue();
        } else {
            console.log("")
        }
    }
    *iter() {
        let current = this.root;
        while (current != null) {
            yield current.getValue();
            current = current.getNext();
        }
    }

} export default Stack;