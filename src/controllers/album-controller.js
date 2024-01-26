import AlbumModel from "../models/album-model.js";

export const createAlbum = async (req, res) => {
    try {
        const { nama_album, deskripsi } = req.body; // Destruksi req.body
        
        const tanggal_dibuat = new Date();

        const response = await AlbumModel.create({
            nama_album, 
            deskripsi, 
            tanggal_dibuat 
        });

        res.status(200).json({ message: "Berhasil Membuat Album", data: response });
    } catch (e) {
        console.error(e);
        res.status(500).json({ errors: e.message });
    }
}
