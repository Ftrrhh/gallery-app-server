import FotoModel from "../models/foto-model.js";
import cloudinary from "../utils/cloudinary.js";

export const createFoto = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ errors: "File foto tidak ditemukan" });
          }

        const { judul_foto, deskripsi_foto } = req.body;

        const tanggal_posting = new Date();

        const result = await cloudinary.uploader.upload(req.file.path);

        const response = await FotoModel.create({
            judul_foto,
            deskripsi_foto,
            tanggal_posting,
            cloudinary_id: result.public_id,
            image_url: result.secure_url
        })
        res.status(200).json({ message: "Berhasil Menambahkan Foto", data: response });
    } catch (e) {
        console.error(e);
        res.status(500).json({ errors: e.message });
    }
} 

