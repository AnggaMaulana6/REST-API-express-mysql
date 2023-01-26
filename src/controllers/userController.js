const UserModel = require('../models/M_Users');

const getAllUsers = async (req, res) => {
    try {
        const [data] = await UserModel.getAllUsers();
    
        res.json({
            message: 'GET All Users Success',
            data: data
        })       
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessge: error,
        })
    }
}

const createNewUser = async (req, res) => {
    const {body} = req;

    if(!body.name || !body.email || !body.address) {
        return res.status(400).json({
            message: 'Anda mengirimkan data yang salah',
            data: null
        })
    }
    try {
        await UserModel.createNewUser(body);
        res.json({
            message: 'CREATE new user Success',
            data: req.body
        })
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessge: error,
        })
    }
}

const updateUser = async (req, res) => {
    const {idUser} = req.params;
    const {body} = req;
    try {
        await UserModel.updateUser(body, idUser);
        res.json({
            message: 'UPDATE user Success',
            data: {
                id: idUser,
                ...body
            },
        })
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessge: error,
        })
    }
}

const deleteUser = async (req, res) => {
    const {idUser} = req.params;
    try {
        await UserModel.deleteUser(idUser)
        res.json({
            message: 'DELETE user Success',
            data: null
        })
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessge: error,
        })
    }
}

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
}