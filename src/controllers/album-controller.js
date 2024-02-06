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

export const getAllAlbum = async (req, res) => {
    try {
        const resAlbum = await AlbumModel.findAll()
        return res.json({data: resAlbum})
    } catch (e) {
        console.error(e);
        res.status(500).json({msg: error.message})
    }
}

export const getAlbumById = async (req, res) => {
    try {
        const idAlbum = req.params.id;
        const resIdAlbum = await AlbumModel.findByPk(idAlbum);
    
        return resIdAlbum
          ? res.status(200).json(resIdAlbum)
          : res.status(404).json({ msg: `ID Album ${idAlbum} Not Found` });
      } catch (e) {
        console.error(e);
        res.status(500).json({ msg: error.message });
      }
}

export const updateAlbum = async (req, res) => {
    try {
        
    } catch (e) {
        console.error(e);
        res.status(500).json({ msg: error.message });
    }
}


