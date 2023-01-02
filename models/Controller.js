"use strict";

import LinkedList from "../tda/LinkedList.js";
import AVL from "../tda/AVL.js";
import Customer from "../models/Customer.js";
import Movie from "./Movie.js";
import Actor from "./Actor.js";
import BSTree from "../tda/BSTree.js";
import HashTable from "../tda/HashTable.js";
import MerkleTree from "../tda/Merkle.js";
//import MerkleTree from "../tda/MerkleTree.js";
class Controller {
    constructor() {
        this.user_list = new LinkedList();
        let admin = new Customer("2354168452525", "Oscar Armin", "EDD", "adming@correo.com", "123", "123");
        admin.setAdmin(true);
        this.user_list.add(admin);
        this.movies_tree = new AVL();
        this.actors_tree = new BSTree();
        this.category_table = new HashTable(20);
        this.merkleTree = new MerkleTree();
        //      this.merkle = new MerkleTree();
    }
    addUser(customer) {
        if (customer instanceof Customer) {
            this.user_list.add(customer);
        }
    }
    addMovie(movie) {
        if (movie instanceof Movie) {
            this.movies_tree.add(movie);
        }
    }
    addActor(actor) {
        if (actor instanceof Actor) {
            this.actors_tree.insertar(actor);
        }
    }
    getActor(dni) {
        return this.actors_tree.Buscar(dni);
    }
    getActorsGraph(name) {
        return this.actors_tree.toGraph(name, "Binary Search");
    }
    getMovie(id) {
        return this.movies_tree.buscar(id);
    }
    getMovies() {
        let movies = this.movies_tree.preOrden();
        movies.orderMovies();
        return movies;
    }
    /**
     * Retorna el grafo AVL de las películas ingresadas
     * @param {*} name 
     */
    getMoviesGraph(name) {
        return this.movies_tree.toGraph(name, "AVL");
    }
    getUserGraph(name) {
        return this.user_list.toGraph(name);
    }
    findUser(username, password) {
        for (let cust of this.user_list.iter()) {
            if (cust instanceof Customer) {
                if (cust.getUsername() == username && cust.getPassword() == password) {
                    return cust;
                }
            }
        }
        return null;
    }
    getCategoryGraph(name) {
        return this.category_table.toHTML(name);
    }
    addCategory(key, value) {
        this.category_table.set(key.toString(), value);
    }
}
export default Controller;