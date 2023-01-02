"use strict";
class Customer {
    /**
     * CLIENTE
     * @param {*} dpi 
     * @param {*} name 
     * @param {*} username 
     * @param {*} email 
     * @param {*} password 
     * @param {*} phone 
     */
    constructor(dpi, name, username, email, password, phone) {
        this.dpi = dpi;
        this.name = `${name}`;
        this.username = `${username}`;
        this.email = `${email}`;
        this.password = `${password}`;
        this.phone = phone;
        this.admin = false;
    }
    getDPI() { return this.dpi; }
    getName() { return this.name; }
    getUsername() { return this.username; }
    getEmail() { return this.email; }
    getPassword() { return this.password; }
    getPhone() { return this.phone; }
    isAdmin() { return this.admin; }
    setAdmin(admin) { this.admin = admin; }
    toString() {
        return `DPI: ${this.dpi}\nName: ${this.name}\nUsername: ${this.username}\nEmail: ${this.email}\nPassword: ${this.password}\nPhone: ${this.password}`;
    }
}
export default Customer;