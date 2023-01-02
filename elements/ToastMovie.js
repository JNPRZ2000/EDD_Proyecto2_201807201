"use strict";
import Movie from "../models/Movie.js";
import Customer from "../models/Customer.js";
class ToastMovie {
    constructor(movie, user) {
        this.element = this._addElements(movie, user);
    }
    _addElements(movie, user) {
        if (movie instanceof Movie && user instanceof Customer) {
            let toast = document.createElement("div"); toast.className = "position-fixed bottom-0 end-0 p-3"; toast.style.zIndex = "11";
            let subtoast = document.createElement("div");
            subtoast.className = "toast";
            subtoast.role = "alert";
            subtoast.ariaLive = "assertive";
            subtoast.ariaAtomic = "true";
            let header = document.createElement("div");
            header.className = "toast-header";
            let title = document.createElement("strong");
            title.className = "me-auto"; title.textContent = `${movie.getNombre()}`;
            
        }
        return document.createElement("div");
    }
} export default ToastMovie;