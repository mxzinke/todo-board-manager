const database = require('../database');


class Users {
    
    constructor() {
        this.state = {
            users: []
        }

        this.syncUsersDB();
    }

    async syncUsersDB() {
        var usersRequest = await database.query("SELECT uId AS 'userId', email, username FROM users");
        
        if (this.state.users.length !== usersRequest.length) {
            // search created elements
            // TODO: write a diffents-search algorithm

            // search deleted elements

        }
    }

    async find(params) {
        return this.state;
    }

    async get(id, params) {
        var searchedElement = this.state.users.find(e => e.userId === id);
        return searchedElement;
    }
}

module.exports = Users;