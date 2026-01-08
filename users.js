// users.js

// This array will store registered users
const users = [];

// Function to get all users
function getAllUsers() {
    return users;
}

// Function to add a new user
function addUser(users) {
    users.push(users);
    return users;
}

// Export the functions so other files can use them
module.exports = {
    getAllUsers,
    addUser
};