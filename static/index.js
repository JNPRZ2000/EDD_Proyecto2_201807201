import Actor from "../models/Actor.js";
import Controller from "../models/Controller.js"
import Customer from "../models/Customer.js";
import Movie from "../models/Movie.js";
import CardMovie from "../elements/CardMovie.js";
import CardActor from "../elements/CardActor.js";
const controller = new Controller();
//navbar
let navbar = document.getElementById("navbar");
let btnExit = document.getElementById("optionExit");
//Toast
var toastlive = document.getElementById("liveToast");
let toastBody = document.getElementById("toastBody");
//texts
let txtLoginUsername = document.getElementById("txtLoginUsername");
let txtLoginPassword = document.getElementById("txtLoginPassword");
let txtRegisterDpi = document.getElementById("txtRegisterDpi");
let txtRegisterName = document.getElementById("txtRegisterName");
let txtRegisterUsername = document.getElementById("txtRegisterUsername");
let txtRegisterEmail = document.getElementById("txtRegisterEmail");
let txtRegisterPassword = document.getElementById("txtRegisterPassword");
let txtRegisterPhone = document.getElementById("txtRegisterPhone");
//panels
let panelLoginRegister = document.getElementById("panelLoginRegistro");
let panelAdmin = document.getElementById("panelAdmin");
let panelCustomer = document.getElementById("panelUsuario");
let panelPelicula = document.getElementById("panelPelicula");
//buttons
let btnRegister = document.getElementById("btnRegister");
let btnLogin = document.getElementById("btnLogin");
//onclicks
btnExit.onclick = () => {
    panelAdmin.style.display = "none";
    panelCustomer.style.display = "none";
    btnExit.style.display = "none";
    panelPelicula.style.display = "none";
    navbar.textContent = "REGISTRO Y LOGIN";
    panelLoginRegister.style.display = "inline";
}
btnLogin.onclick = () => {
    let alertmsg = "";
    if (txtLoginPassword.value.length == 0) { alertmsg += "- Contraseña"; }
    if (txtLoginUsername.value.length == 0) { alertmsg += "- Nombre de Usuario"; }
    if (alertmsg == "") {
        let userfound = controller.findUser(txtLoginUsername.value, txtLoginPassword.value);
        if (userfound instanceof Customer) {
            if (userfound.isAdmin()) {
                showAdminUI(userfound);
            } else {
                showUserUI(userfound);
            }
        } else {
            var toast = new bootstrap.Toast(toastlive);
            toastBody.textContent = "No se ha encontrado con estos datos";
            toast.show();
        }
    } else {
        var toast = new bootstrap.Toast(toastlive);
        toastBody.textContent = "Los siguientes campos son obligatorios:\n" + alertmsg;
        toast.show();
    }
}
btnRegister.onclick = () => {
    let alertmsg = "";
    if (txtRegisterDpi.value.length == 0) { alertmsg += "- DPI\n"; }
    if (txtRegisterEmail.value.length == 0) { alertmsg += "- EMAIL\n"; }
    if (txtRegisterName.value.length == 0) { alertmsg += "- Nombre Completo\n"; }
    if (txtRegisterPassword.value.length == 0) { alertmsg += "- Contraseña\n"; }
    if (txtRegisterPhone.value.length == 0) { alertmsg += "- Telefono\n"; }
    if (txtRegisterUsername.value.length == 0) { alertmsg += "- Nombre de Usuario\n"; }
    if (alertmsg == "") {
        let newcustomer = new Customer(txtRegisterDpi.value, txtRegisterName.value, txtRegisterUsername.value, txtRegisterEmail.value, txtRegisterPassword.value, txtRegisterPhone.value);
        controller.addUser(newcustomer);
        txtRegisterDpi.value = "";
        txtRegisterEmail.value = "";
        txtRegisterName.value = "";
        txtRegisterPassword.value = "";
        txtRegisterPhone.value = "";
        txtRegisterUsername.value = "";
    } else {
        var toast = new bootstrap.Toast(toastlive);
        toastBody.textContent = "Los siguientes campos son obligatorios:\n" + alertmsg;
        toast.show();
    }
}
//UIS
function showAdminUI(admin) {
    if (admin instanceof Customer) {
        panelLoginRegister.style.display = "none";
        panelAdmin.style.display = "inline";
        btnExit.style.display = "inline";
        navbar.textContent = `ADMINISTRACIÓN: ${admin.getUsername()}`;
        let btnShowGraphUsers = document.getElementById("btnShowGraphUsers");
        btnShowGraphUsers.onclick = () => {
            let graph = controller.getUserGraph("Usuarios");
            d3.select("#graphUsers").graphviz().dot(graph).render();
        }
        let btnPrintUsers = document.getElementById("btnPrintUsers");
        btnPrintUsers.onclick = function () {
            let container = document.getElementById("graphUsers");
            html2canvas(container, { allowTaint: true }).then(function (canvas) {
                var link = document.createElement("a"); document.body.appendChild(link);
                link.download = "userGraph.jpg"; link.href = canvas.toDataURL(); link.target = '_blank'; link.click();
            });
        }
        let inputUsers = document.getElementById("tabUserFile");
        inputUsers.onchange = (evt) => {
            const file = evt.target.files[0];
            if (!file) return;
            const fileReader = new FileReader();
            fileReader.readAsText(file);
            fileReader.onload = () => {
                let jsonObj = JSON.parse(fileReader.result);
                for (let obj of jsonObj) {
                    let newcustomer = new Customer(obj["dpi"], obj["nombre"], obj["nombre_usuario"], "correo", obj["contrasenia"], obj["telefono"]);
                    newcustomer.setAdmin(obj["admin"]);
                    controller.addUser(newcustomer);
                }
                btnShowGraphUsers.click();
            }
            fileReader.onerror = () => {
                alert(fileReader.error);
            }
        }
        let btnShowGraphMovies = document.getElementById("btnShowGraphMovies");
        btnShowGraphMovies.onclick = () => {
            let graph = controller.getMoviesGraph("Películas");
            d3.select("#graphMovies").graphviz().dot(graph).render();
        }
        let btnPrintMovies = document.getElementById("btnPrintMovies");
        btnPrintMovies.onclick = function () {
            let container = document.getElementById("graphMovies");
            html2canvas(container, { allowTaint: true }).then(function (canvas) {
                var link = document.createElement("a"); document.body.appendChild(link);
                link.download = "moviesGraph.jpg"; link.href = canvas.toDataURL(); link.target = '_blank'; link.click();
            });
        }
        let inputMovies = document.getElementById("tabMoviesFile");
        inputMovies.onchange = (evt) => {
            const file = evt.target.files[0];
            if (!file) return;
            const fileReader = new FileReader();
            fileReader.readAsText(file);
            fileReader.onload = () => {
                let jsonObj = JSON.parse(fileReader.result);
                for (let mov of jsonObj) {
                    let newmovie = new Movie(mov["id_pelicula"], mov["nombre_pelicula"], mov["descripcion"], mov["puntuacion_star"], mov["precion_Q"], mov["paginas"], mov["categoria"]);
                    controller.addMovie(newmovie);
                }
                btnShowGraphMovies.click();
            }
            fileReader.onerror = () => {
                alert(fileReader.error);
            }
        }
        let btnShowGraphActors = document.getElementById("btnShowGraphActors");
        btnShowGraphActors.onclick = () => {
            let graph = controller.getActorsGraph("Actores");
            d3.select("#graphActors").graphviz().dot(graph).render();
        }
        let btnPrintActors = document.getElementById("btnPrintActors");
        btnPrintActors.onclick = function () {
            let container = document.getElementById("graphActors");
            html2canvas(container, { allowTaint: true }).then(function (canvas) {
                var link = document.createElement("a"); document.body.appendChild(link);
                link.download = "actorsGraph.jpg"; link.href = canvas.toDataURL(); link.target = '_blank'; link.click();
            });
        }
        let inputActors = document.getElementById("tabActorsFile");
        inputActors.onchange = (evt) => {
            const file = evt.target.files[0];
            if (!file) return;
            const fileReader = new FileReader();
            fileReader.readAsText(file);
            fileReader.onload = () => {
                let jsonObj = JSON.parse(fileReader.result);
                for (let actor of jsonObj) {
                    let newactor = new Actor(actor["dni"], actor["nombre_actor"], actor["correo"], actor["descripcion"]);
                    controller.addActor(newactor);
                }
                btnShowGraphActors.click();
            }
            fileReader.onerror = () => {
                alert(fileReader.error);
            }
        }
        let btnShowGraphCategory = document.getElementById("btnShowGraphCategory");
        btnShowGraphCategory.onclick = () => {
            let graph = controller.getCategoryGraph("CATEGORIAS");
            let g = document.getElementById("graphCategory");
            g.innerHTML += graph;
        }
        let btnPrintTags = document.getElementById("btnPrintTags");
        btnPrintTags.onclick = function () {
            let container = document.getElementById("supergraphCategory");
            html2canvas(container, { allowTaint: true }).then(function (canvas) {
                var link = document.createElement("a"); document.body.appendChild(link);
                link.download = "tagsGraph.jpg"; link.href = canvas.toDataURL(); link.target = '_blank'; link.click();
            });
        }
        let inputCategory = document.getElementById("tabCategoryFile");
        inputCategory.onchange = (evt) => {
            const file = evt.target.files[0];
            if (!file) return;
            const fileReader = new FileReader();
            fileReader.readAsText(file);
            fileReader.onload = () => {
                let jsonObj = JSON.parse(fileReader.result);
                for (let category of jsonObj) {
                    controller.addCategory(category["id_categoria"], category["company"]);
                }
                btnShowGraphCategory.click();
            }
            fileReader.onerror = () => {
                alert(fileReader.error);
            }
        }
        let btnAdminMerkle = document.getElementById("btnAdminMerkle");
        btnAdminMerkle.onclick = function () {
            let bloqueaux = controller.merkleTree.datablock;
            let topaux = controller.merkleTree.tophash;
            controller.merkleTree.auth();
            let graph = controller.merkleTree.toGraph();
            d3.select("#graphMerkle").graphviz().dot(graph).render();
            controller.merkleTree.datablock = bloqueaux;
            controller.merkleTree.tophash = topaux;
        }
    }
}
function showUserUI(user) {
    if (user instanceof Customer) {
        panelAdmin.style.display = "none";
        panelLoginRegister.style.display = "none";
        btnExit.style.display = "inline";
        navbar.textContent = `USUARIO: ${user.getUsername()}`;
        panelCustomer.style.display = "inline";
        //MOVIES
        let movies = controller.getMovies();
        let movieslist = document.getElementById("userMoviesList");
        for (let mov of movies.iter()) {
            let cmov = new CardMovie(user, mov, controller);
            movieslist.appendChild(cmov.element);

        }
        let btnSortMovies = document.getElementById("btnSortMovies");
        btnSortMovies.onclick = () => {
            while (movieslist.hasChildNodes()) {
                movieslist.removeChild(movieslist.firstChild);
            }
            if (btnSortMovies.textContent == "Aa-Zz") {
                btnSortMovies.textContent = "Zz-Aa";
                for (let mov of movies.iterReverse()) {
                    let cmov = new CardMovie(user, mov, controller);
                    movieslist.appendChild(cmov.element);
                }
            } else {
                btnSortMovies.textContent = "Aa-Zz";
                for (let mov of movies.iter()) {
                    let cmov = new CardMovie(user, mov, controller);
                    movieslist.appendChild(cmov.element);
                }
            }
        }
        //ACTORS
        let actorslist = document.getElementById("userActorsList");
        let actors = controller.actors_tree.inorder();
        for (let act of actors.iter()) {
            let nact = new CardActor(act);
            actorslist.appendChild(nact.element);
        }
        let inorden = document.getElementById("radioActorInorden");
        let preorden = document.getElementById("radioActorPreorden");
        let postorden = document.getElementById("radioActorPostorden");
        inorden.onclick = function () {
            actors = controller.actors_tree.inorder();
            while (actorslist.hasChildNodes()) {
                actorslist.removeChild(actorslist.firstChild);
            }
            for (let act of actors.iter()) {
                let nact = new CardActor(act);
                actorslist.appendChild(nact.element);
            }
        }
        preorden.onclick = function () {
            actors = controller.actors_tree.preorder();
            while (actorslist.hasChildNodes()) {
                actorslist.removeChild(actorslist.firstChild);
            }
            for (let act of actors.iter()) {
                let nact = new CardActor(act);
                actorslist.appendChild(nact.element);
            }
        }
        postorden.onclick = function () {
            actors = controller.actors_tree.posorder();
            while (actorslist.hasChildNodes()) {
                actorslist.removeChild(actorslist.firstChild);
            }
            for (let act of actors.iter()) {
                let nact = new CardActor(act);
                actorslist.appendChild(nact.element);
            }
        }
        //TAGS
        let graph = controller.category_table.toHTMLUSER("CATEGORIAS");
        let g = document.getElementById("graphCategoryUser");
        g.innerHTML += graph;
    }
}
//onload
let body = document.getElementById("body");
body.onload = () => {
    panelAdmin.style.display = "none";
    btnExit.style.display = "none";
    panelCustomer.style.display = "none";
    panelPelicula.style.display = "none";
}