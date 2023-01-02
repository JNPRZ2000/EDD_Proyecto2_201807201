"use strict";
import Actor from "../models/Actor.js";
import ArrayList from "./ArrayList.js";
class Nodo {
    constructor(valor) {
        this.valor = valor;
        this.izquierda = null;
        this.derecha = null;
        this.altura = 0;
    }
    getValor() {
        return this.valor;
    }

    getIzquierda() {
        return this.izquierda;
    }

    getDerecha() {
        return this.derecha;
    }
    getAltura() {
        return this.altura;
    }

    setValor(valor) {
        this.valor = valor;
    }
    setIzquierda(izquierda) {
        this.izquierda = izquierda;
    }
    setDerecha(derecha) {
        this.derecha = derecha;
    }

    setAltura(altura) {
        this.altura = altura;
    }

    toString() {
        return `${this.valor}`;
    }
}
class BSTree {

    constructor() {
        this.raiz = null;
    }
    insertar(actor) {
        if (actor instanceof Actor) {
            let nuevo = new Nodo(actor);
            if (this.raiz == null) {
                this.raiz = nuevo;
            } else {
                let actual = this.raiz;
                let previo = null;
                while (actual != null) {
                    previo = actual;
                    if ((actor.getDNI() - actual.getValor().getDNI()) < 0) {
                        actual = actual.getIzquierda();
                    } else {
                        actual = actual.getDerecha();
                    }
                }
                if ((actor.getDNI() - previo.getValor().getDNI()) < 0) {
                    previo.setIzquierda(nuevo);
                } else {
                    previo.setDerecha(nuevo);
                }
            }
        }
    }

    Buscar(valor) {
        return this.Buscar(valor, this.raiz);
    }

    BuscarI(valor, nodo) {
        if (nodo == null) {
            return null;
        }
        if (nodo.getValor().getDNI() == valor) {
            return nodo.getValor();
        } else if (nodo.getValor().getDNI() < valor) {
            return this.BuscarI(valor, nodo.getIzquierda());
        } else {
            return this.BuscarI(valor, nodo.getDerecha());
        }
    }

    inorder() {
        let array = new ArrayList();
        this.inorderI(this.raiz, array);
        return array
    }

    preorder() {
        let array = new ArrayList();
        this.preorderI(this.raiz, array);
        return array;
    }

    posorder() {
        let array = new ArrayList();
        this.posorderI(this.raiz, array);
        return array;
    }

    inorderI(nodo, array) {
        if (nodo != null) {
            this.inorderI(nodo.getIzquierda(), array);
            array.add(nodo.getValor());
            this.inorderI(nodo.getDerecha(), array);
        }
    }

    preorderI(nodo, array) {
        if (nodo != null) {
            array.add(nodo.getValor());
            this.preorderI(nodo.getIzquierda(), array);
            this.preorderI(nodo.getDerecha(), array);
        }
    }

    posorderI(nodo, array) {
        if (nodo != null) {
            this.posorderI(nodo.getIzquierda(), array);
            this.posorderI(nodo.getDerecha(), array);
            array.add(nodo.getValor());
        }
    }

    getRaiz() {
        return raiz;
    }

    toDotI(nodo) {
        let s = "";
        if (nodo.getIzquierda() != null) {
            s += `\n\t"${nodo.getValor()}":sw->"${nodo.getIzquierda().getValor()}";`;
            s += this.toDotI(nodo.getIzquierda());
        }
        if (nodo.getDerecha() != null) {
            s += `\n\t"${nodo.getValor()}":se->"${nodo.getDerecha().getValor()}";`;
            s += this.toDotI(nodo.getDerecha());
        }
        return s;
    }

    toGraph(name, tipo) {
        let g = "digraph " + name + "{";
        g += "\n\tsplines=false;";
        g += this.toDotI(this.raiz);
        g += "\n\tlabel = \"Árbol " + tipo + ": " + name + "\";";
        g += "\n}";
        return g;

    }
}
export default BSTree;