"use strict";
import Movie from "../models/Movie.js";
import ArrayList from "./ArrayList.js";
import Stack from "./Stack.js";
class Node {
    constructor(movie) {
        if (movie instanceof Movie) { this.movie = movie; }
        this.izquierda = null;
        this.derecha = null;
        this.factorE = 0;
    }
    getMovie() { return this.movie; }
    setMovie(mov) { if (mov instanceof Movie) this.movie = mov; }
    getIzquierda() { return this.izquierda; }
    getDerecha() { return this.derecha; }
    setIzquierda(izq) { this.izquierda = izq; }
    setDerecha(der) { this.derecha = der; }
    getFactorE() {
        let altDer = 0;
        let altIzq = 0;
        if (this.getDerecha() != null) {
            altDer = this.getDerecha().getAltura();
        }
        if (this.getIzquierda() != null) {
            altIzq = this.getIzquierda().getAltura();
        }
        return (altDer - altIzq);
    }
    setFactorE(fe) { this.factorE = fe; }
    getAltura() {
        let hIzq = 0;
        let hDer = 0;
        if (!(this.getMovie() instanceof Movie)) { return 0; }
        if (this.getIzquierda() != null) { hIzq = this.getIzquierda().getAltura(); }
        else { hIzq = 0; }
        if (this.getDerecha() != null) { hDer = this.getDerecha().getAltura(); }
        else { hDer = 0; }
        return Math.max(hIzq, hDer) + 1;
    }
    toString() { return `${this.movie}`; }
}
class AVL {
    constructor() {
        this.root = null;
    }
    _toDot(nodo) {
        let s = "";
        if (nodo.getIzquierda() != null) {
            s += `\n\t"${nodo}":sw->"${nodo.getIzquierda()}";`;
            s += this._toDot(nodo.getIzquierda());
        }
        if (nodo.getDerecha() != null) {
            s += `\n\t"${nodo}":se->"${nodo.getDerecha()}";`;
            s += this._toDot(nodo.getDerecha());
        }
        return s;
    }

    toGraph(name, tipo) {
        let g = "digraph " + name + "{";
        g += "\n\tsplines=false;";
        g += this._toDot(this.root);
        g += "\n\tlabel = \"Árbol " + tipo + ": " + name + "\";";
        g += "\n}";
        return g;
    }

    add(movie) {
        let newnode = new Node(movie);
        let salir = false;
        let der = false;
        let temproot = this.root;
        let altIzq = 0, altDer = 0;
        if (temproot == null) {
            this.root = newnode;
            return true;
        } else if (this.existe(newnode.getMovie())) {
            return false;
        } else {
            while (!salir) {
                if (this.compararDato(newnode.getMovie(), temproot.getMovie()) > 0) {
                    if (temproot.getDerecha() != null) { temproot = temproot.getDerecha(); }
                    else { salir = true; der = true; }
                } else {
                    if (temproot.getIzquierda() != null) {
                        temproot = temproot.getIzquierda();
                    } else { salir = true; }
                }
            }
            if (der) {
                temproot.setDerecha(newnode);
            } else {
                temproot.setIzquierda(newnode);
            }
            while (this.equilibrado(this.root) < 0) {
                temproot = this.padre(temproot);
                if (temproot.getDerecha() == null) {
                    altDer = 0;
                } else {
                    altDer = temproot.getDerecha().getAltura();
                }
                if (temproot.getIzquierda() == null) {
                    altIzq = 0;
                } else {
                    altIzq = temproot.getIzquierda().getAltura();
                }
                let cambiar = this.estructurar(temproot, altIzq, altDer);
                let superior = this.padre(temproot);
                if (this.compararDato(superior.getMovie(), temproot.getMovie()) != 0) {
                    if (superior.getIzquierda() != null && this.compararDato(superior.getIzquierda().getMovie(), temproot.getMovie()) == 0) {
                        superior.setIzquierda(cambiar);
                    } else if (superior.getDerecha() != null && this.compararDato(superior.getDerecha().getMovie(), temproot.getMovie()) == 0) {
                        superior.setDerecha(cambiar);
                    }
                } else {
                    this.root = cambiar;
                }

            }
            return true;
        }
    }
    estructurar(nodo, altIzq, altDer) {
        if (this.extraeFactorE(nodo) == 2) {
            if (this.extraeFactorE(nodo.getDerecha()) == 1 || this.extraeFactorE(nodo.getDerecha()) == 0) {
                nodo = this.rotacionSimpleIzquierda(nodo);
            } else if (this.extraeFactorE(nodo.getDerecha()) == -1) {
                nodo = this.rotacionCompuestaDerecha(nodo);
            }
        } else if (this.extraeFactorE(nodo) == -2) {
            if (this.extraeFactorE(nodo.getIzquierda()) == -1 || this.extraeFactorE(nodo.getDerecha()) == 0) {
                nodo = this.rotacionSimpleDerecha(nodo);
            } else if (this.extraeFactorE(nodo.getIzquierda()) == 1) {
                nodo = this.rotacionCompuestaIzquierda(nodo);
            }
        }
        return nodo;
    }
    extraeFactorE(node) {
        if (node != null) {
            return node.getFactorE();
        } else {
            return 0;
        }
    }
    rotacionSimpleIzquierda(nodo) {
        let nodoTmp = nodo;
        nodo = nodoTmp.getDerecha();
        nodoTmp.setDerecha(nodo.getIzquierda());
        nodo.setIzquierda(nodoTmp);
        return nodo;
    }
    rotacionSimpleDerecha(nodo) {
        let nodoTmp = nodo;
        nodo = nodoTmp.getIzquierda();
        nodoTmp.setIzquierda(nodo.getDerecha());
        nodo.setDerecha(nodoTmp);
        return nodo;
    }
    rotacionCompuestaIzquierda(nodo) {
        let nodoTmp = nodo;
        nodoTmp = rotacionSimpleIzquierda(nodoTmp.getIzquierda());
        nodo.setIzquierda(nodoTmp);
        nodoTmp = rotacionSimpleDerecha(nodo);
        return nodoTmp;
    }
    rotacionCompuestaDerecha(nodo) {
        let nodoTmp = nodo;
        nodoTmp = this.rotacionSimpleDerecha(nodoTmp.getDerecha());
        nodo.setDerecha(nodoTmp);
        nodoTmp = this.rotacionSimpleIzquierda(nodo);
        return nodoTmp;
    }
    equilibrado(n) {
        let hIzq = 0;
        let hDer = 0;
        if (n == null) {
            return 0;
        }
        hIzq = this.equilibrado(n.getIzquierda());
        if (hIzq < 0) {
            return hIzq;
        }
        hDer = this.equilibrado(n.getDerecha());
        if (hDer < 0) {
            return hDer;
        }
        if (Math.abs(hIzq - hDer) > 1) {
            return -1;
        }
        return Math.max(hIzq, hDer) + 1;
    }
    padre(nodo) {
        let raizTmp = this.root;
        let pila = new Stack();
        pila.push(raizTmp);
        while (raizTmp.getDerecha() != null || raizTmp.getIzquierda() != null) {
            if (this.compararDato(nodo.getMovie(), raizTmp.getMovie()) > 0) {
                if (raizTmp.getDerecha() != null) {
                    raizTmp = raizTmp.getDerecha();
                }
            } else if (this.compararDato(nodo.getMovie(), raizTmp.getMovie()) < 0) {
                if (raizTmp.getIzquierda() != null) {
                    raizTmp = raizTmp.getIzquierda();
                }
            }
            if (this.compararDato(nodo.getMovie(), raizTmp.getMovie()) == 0) {
                return pila.pop();
            }

            pila.push(raizTmp);
        }
        return pila.pop();
    }
    existe(movie) {
        let temproot = this.root;
        if (this.isEmpty()) {
            return false;
        }
        if (this.compararDato(movie, temproot.getMovie()) == 0) {
            return true;
        }
        while (temproot.getDerecha() != null || temproot.getIzquierda() != null) {
            if (this.compararDato(movie, temproot.getMovie()) > 0) {
                if (temproot.getDerecha() != null) {
                    temproot = temproot.getDerecha();
                } else {
                    return false;
                }
            } else if (this.compararDato(movie, temproot.getMovie()) < 0) {
                if (temproot.getIzquierda() != null) {
                    temproot = temproot.getIzquierda();
                } else {
                    return false;
                }
            }
            if (this.compararDato(movie, temproot.getMovie()) == 0) {
                return true;
            }
        }
        return false;
    }
    isEmpty() {
        return this.size() == 0;
    }
    size() {
        return this.preOrden().size;
    }
    preOrden() {
        let lista = new ArrayList();
        let nodo = this.root;
        let pila = new Stack();
        while ((nodo != null && nodo.getMovie() != null) || !pila.isEmpty()) {
            if (nodo != null) {
                lista.add(nodo.getMovie());
                pila.push(nodo);
                nodo = nodo.getIzquierda();
            } else {
                nodo = pila.pop();
                nodo = nodo.getDerecha();
            }
        }
        return lista;
    }
    compararDato(movie1, movie2) {
        if (movie1 instanceof Movie && movie2 instanceof Movie) {
            return movie1.getID() - movie2.getID();
        }
    }
    buscar(id) {
        let temproot = this.root;
        if (this.isEmpty()) {
            return null;
        }
        if (this.root.getMovie().getID() == id) {
            return this.root.getMovie();
        }
        while (temproot.getDerecha() != null || temproot.getIzquierda() != null) {
            if ((id - temproot.getMovie().getID()) > 0) {
                if (temproot.getDerecha() != null) {
                    temproot = temproot.getDerecha();
                } else {
                    return null;
                }
            } else if ((id - temproot.getMovie().getID()) < 0) {
                if (temproot.getIzquierda() != null) {
                    temproot = temproot.getIzquierda();
                } else {
                    return null;
                }
            }
            if ((id - temproot.getMovie().getID()) == 0) {
                return temproot.getMovie();
            }
        }
        return null;
    }
}
export default AVL;