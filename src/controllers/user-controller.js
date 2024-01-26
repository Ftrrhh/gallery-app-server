import UserModel from "../models/user-model.js"

export const createUser = async (req, res) => {
    try {
        const {username, password, email, namalengkap, alamat} = req.body

        const cekUsername = await UserModel.findAll({where: {username}})

        if(cekUsername){
            res.status(409).json({errors: "Username sudah digunaion"})
        }
    
        const response = await UserModel.create({
            username, password, email, namalengkap, alamat
        })

        res.status(200).json({message: "Data User berhasil di input", data: response})
    } catch (e) {
        console.error(e)
        res.status(500).json({ errors: e.message})
    }
}