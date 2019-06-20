const database = require('../database');
const hooks = require('./users.hooks');

class Users {
  constructor() {
    this.users = [];

    this.syncUsersDB();
  }

  async syncUsersDB() {
    var usersRequest = await database.query(
      "SELECT uId AS 'userId', email, username, createdOn FROM users"
    );

    this.users = usersRequest;
  }

  async find(params) {
    this.syncUsersDB();
    return this.users;
  }

  async get(id, params) {
    this.syncUsersDB();
    var searchedElement = this.users.find((e) => e.userId === id);
    return searchedElement;
  }

  async patch(id, data, params) {
    this.syncUsersDB();
    // TODO: Add Patch function
    return null;
  }

  async create(data, params) {
    if (
      data.username === undefined ||
      data.password === undefined ||
      data.email === undefined
    ) {
      return {
        error: 422,
        message: 'Required data not fulfilled.'
      };
    }

    await this.syncUsersDB();

    var newUserId = 0;
    this.users.forEach((user) => {
      if (user.userId > newUserId) {
        newUserId = user.userId;
      }
    });
    const creationTime = Date.getTime();
    const sql =
      'INSERT INTO users (uId, email, username, password, createdOn ' +
      "VALUES ('" +
      (newUserId + 1) +
      "', '" +
      data.email +
      "', '" +
      data.username +
      "', '" +
      data.password +
      "', '" +
      creationTime +
      "')";
    database.query(sql);
    const newUser = {
      userId: newUserId + 1,
      email: data.email,
      username: data.username,
      createdOn: creationTime
    };

    return newUser;
  }

  async remove(id, params) {
    database.query("DELETE FROM users WHERE uId = '" + id + "'");
    var removedElementIx = this.users.findIndex((e) => e.userId === id);
    var removedElement = this.users[removedElementIx];

    delete this.users[removedElementIx];
    this.users = this.users.filter((user) => user !== undefined); // deleting undefined array-fields

    return removedElement;
  }
}

module.exports = function(app) {
  app.use('/users', {
    users: new Users()
  });

  const service = app.service('users');
  service.hooks(hooks);
};
