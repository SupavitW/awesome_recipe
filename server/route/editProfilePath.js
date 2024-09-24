const express = require('express');
const editProfileRouter = express.Router();
const Users = require('../db').Users;
const {passwordHash, comparePasswords, sanitizeInput} = require('../helper/helper')

editProfileRouter.put('/:option',  async(req, res, next) => {
    try {
        const { option } = req.params;
        // Edit firstname & lastname
        if (option === 'name') { 
            const {firstname, lastname} = req.body;
            // Call function to sanitize input
            if(!sanitizeInput('editName', {firstname, lastname})) {
                const invalidInput = new Error('Invalid user input');
                invalidInput.status = 400;
                throw invalidInput;
            }
            // Edit user's info
            await Users.update(
                {firstname: firstname, lastname: lastname}, 
                {where: {username: req.username}});
            res.status(200).json({firstname, lastname});
        //Edit password
        } else { 
            const {oldPassword, newPassword} = req.body;
            // Find old password to compare to authenticate user again
            const user = await Users.findOne({where: {username: req.username}});
            if(!await comparePasswords(oldPassword, user.password)) {
                const incorrectPass = new Error('Wrong password');
                incorrectPass.status = 400;
                throw incorrectPass;
            }
            // Call function to sanitize input
            if(!sanitizeInput('editPassword', newPassword)) {
                const invalidInput = new Error('Invalid user input');
                invalidInput.status = 400;
                throw invalidInput;
            }
            // Edit's user password
            const hashedPassword = await passwordHash(newPassword, 10);
            await Users.update(
                {password: hashedPassword},
                {where: {username: req.username}});
            res.status(200).json({"msg": "User's info updated"});
        }
    } catch(err) {
        next(err);
    }
});

module.exports = editProfileRouter;