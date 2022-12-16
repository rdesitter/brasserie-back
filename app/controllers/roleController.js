const { Role } = require('../models');

const roleController = {
    async getRoles(req, res) {
        try {
            const roles = await Role.findAll();
            res.json(roles)
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = roleController;
