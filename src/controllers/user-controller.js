import UserModel from "../models/user-model.js";

// Ambil seluruh data user
export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.findAll({
      attributes: ["id", "username", "email"],
    });

    if (!users || users.length === 0) {
      return res
        .status(404)
        .json({ error: "Tidak Ada Data User Yang Ditemukan." });
    }

    return res.json(users);
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .json({ errors: "Terjadi Kesalahan Dalam Mengambil Data User" });
  }
};


// export const createUser = async (req, res) => {
//     try {
//         const {username, password, email, namalengkap, alamat} = req.body

//         const cekUsername = await UserModel.findOne({where: {username}})

//         if(cekUsername){
//             return res.status(409).json({errors: "Username sudah digunaion"})
//         }

//         const hash = await encrypt(password)

//         const response = await UserModel.create({
//             username, password: hash, email, namalengkap, alamat
//         })

//         res.status(200).json({message: "Data User berhasil di input", data: response})
//     } catch (e) {
//         console.error(e)
//         res.status(500).json({ errors: e.message})
//     }
// }
