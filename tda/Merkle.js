"use strict";
class DataNode {
    constructor(value) { this.value = value; }
    toString() { return `${this.value}`; }
}
class HashNode {
    constructor(hash) { this.hash = hash; this.left = null; this.right = null; }
    toString() { return `${this.hash}`; }
}
var index = 0;
class MerkleTree {
    constructor() {
        this.tophash = null;
        this.size = 0;
        this.datablock = [];
    }
    add(value) {
        this.datablock[this.size] = new DataNode(value);
        this.size += 1;
    }
    createTree(exp) {
        this.tophash = new HashNode(0);
        this._createTree(this.tophash, exp);
    }
    _createTree(tmp, exp) {
        if (exp > 0) {
            tmp.left = new HashNode(0);
            tmp.right = new HashNode(0);
            this._createTree(tmp.left, exp - 1);
            this._createTree(tmp.right, exp - 1);
        }
    }
    _genHash(tmp, n) {
        if (tmp != null) {
            this._genHash(tmp.left, n);
            this._genHash(tmp.right, n);
            if (tmp.left == null && tmp.right == null) {
                tmp.left = this.datablock[n - index--]
                tmp.hash = sha256(`${tmp.left.value}`);
            }
            else { tmp.hash = sha256(`${tmp.left.value}${tmp.right.value}`); }
        }
    }
    auth() {
        console.log(this.datablock);
        var exp = 1;
        while (Math.pow(2, exp) < this.datablock.length) {
            exp += 1;
        }
        for (var i = this.datablock.length; i < Math.pow(2, exp); i++) {
            this.datablock.push(1);
        }
        index = Math.pow(2, exp);
        this.createTree(exp);
        this._genHash(this.tophash, Math.pow(2, exp));
    }
    _toDotI(node) {
        let s = "";
        if (node.left != null) {
            s += `\n\t"${node.hash}":sw->"${node.left.hash}";`;
            s += this._toDotI(node.left);
        }
        if (node.right != null) {
            s += `\n\t"${node.hash}":se->"${node.right.hash}";`
            s += this._toDotI(node.right);
        }
        return s;
    }
    toGraph() {
        let g = "digraph merkle{";
        g += "\n\t splines = false;";
        g += this._toDotI(this.tophash);
        g += "\n\t label = \"ARBOL MERKLE: Películas Alquiladas\";\n}";
        return g;
    }
    clear() {
        this.tophash = null;
        this.datablock = [];
    }
} export default MerkleTree;