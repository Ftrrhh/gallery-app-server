import FotoModel from "../models/foto-model.js";
import cloudinary from "../utils/cloudinary.js";

export const createFoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ errors: "File foto tidak ditemukan" });
    }

    const { judul_foto, deskripsi_foto, albumId } = req.body;

    const tanggal_posting = new Date();

    const result = await cloudinary.uploader.upload(req.file.path);

    const response = await FotoModel.create({
      judul_foto,
      deskripsi_foto,
      tanggal_posting,
      albumId,
      cloudinary_id: result.public_id,
      image_url: result.secure_url,
    });
    res
      .status(200)
      .json({ message: "Berhasil Menambahkan Foto", data: response });
  } catch (e) {
    console.error(e);
    res.status(500).json({ errors: e.message });
  }
}

export const getAllFoto = async (req, res) => {
  try {
    const resFoto = await FotoModel.findAll();
    return res.json({data: resFoto });
  } catch (e) {
    console.error(e);
    res.status(500).json({ errors: "Tidak Ada Data Foto" });
  }
}

export const getFotoById = async (req, res) => {
  try {
    const idFoto = req.params.id;
    const resIdFoto = await FotoModel.findByPk(idFoto);

    return resIdFoto
      ? res.status(200).json(resIdFoto)
      : res.status(404).json({ msg: `ID Foto ${idFoto} Not Found` });
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: error.message });
  }
}
