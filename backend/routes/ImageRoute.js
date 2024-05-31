import express from 'express';
import multer from 'multer';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../config/firebase.js';

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router()


// Upload image
router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const file = req.file;
        const storageRef = ref(storage, file.originalname);
        await uploadBytes(storageRef, file.buffer);
        const fileURL = await getDownloadURL(storageRef);
        res.status(200).send({ url: fileURL });
      } catch (error) {
        res.status(500).send({ error: error.message });
      }
  });



export {router}