const fs = require('fs');
const usersDir = __dirname + '/' + '../data/users.json';

module.exports.getRandomUser = (req, res, next) => {
    let users = fs.readFileSync(usersDir);
    let parsedUsers = JSON.parse(users);
    const random = Math.floor(Math.random() * parsedUsers.length);
    res.send(parsedUsers[random])
}

module.exports.getAllUsers = (req, res, next) => {
    let users = fs.readFileSync(usersDir);
    let parsedUsers = JSON.parse(users);
    res.send(parsedUsers)
}
module.exports.postSaveUser = (req, res, next) => {
    let users = fs.readFileSync(usersDir);
    let parsedUsers = JSON.parse(users);
    const lastId = parsedUsers[parsedUsers.length - 1].id;
    const user = req.body;
    user.id = lastId + 1;
    parsedUsers.push(user);
    fs.writeFileSync(usersDir, JSON.stringify(parsedUsers))
    res.send(user)
}
module.exports.patchUpdateUser = (req, res, next) => {
    const user = req.body;
    let users = fs.readFileSync(usersDir);
    let parsedUsers = JSON.parse(users);
    const userIndex = parsedUsers.findIndex((pUser => pUser.id == user.id));
    if (userIndex !== -1) {
        Object.assign(parsedUsers[userIndex], user);
        fs.writeFileSync(usersDir, JSON.stringify(parsedUsers))
        res.send(parsedUsers[userIndex]);
    } else res.send('Wrong User ID')
}
module.exports.patchBulkUpdateUser = (req, res, next) => {
    const bulkUser = req.body;
    let users = fs.readFileSync(usersDir);
    let parsedUsers = JSON.parse(users);
    let s = 0;
    let f = 0;
    for (const user of bulkUser) {
        const userIndex = parsedUsers.findIndex((pUser => pUser.id == user.id));
        if (userIndex !== -1) {
            Object.assign(parsedUsers[userIndex], user);
            fs.writeFileSync(usersDir, JSON.stringify(parsedUsers))
            s++;
        } else f++;
    }
    res.send({ Success: s, Failed: f })
}
module.exports.deleteUser = (req, res, next) => {
    let users = fs.readFileSync(usersDir);
    let parsedUsers = JSON.parse(users);
    const { id } = req.body;
    const remainingUsers = parsedUsers.filter(user => user.id !== id);
    fs.writeFileSync(usersDir, JSON.stringify(remainingUsers))
    res.send(remainingUsers)
}