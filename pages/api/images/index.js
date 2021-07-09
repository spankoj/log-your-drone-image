import {
  deleteImageById,
  getImages,
  insertImage,
} from '../../../utils/database';

export default async function imagesHandler(req, res) {
  if (req.method === 'GET') {
    const images = await getImages();
    return res.status(200).json({ images: images });
  } else if (req.method === 'POST') {
    const image = await insertImage(req.body.data);
    return res.status(200).json({ image: image });
  } else if (req.method === 'DELETE') {
    const id = JSON.parse(req.body.id);
    const image = await deleteImageById(id);
    return res.status(200).json({ image: image });
  }

  res.status(400).json(null);
}
