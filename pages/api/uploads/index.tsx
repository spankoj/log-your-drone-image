import fs from 'fs';
import multer from 'multer';
import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { ApiResponse } from '../../../models/ApiResponse';

interface NextConnectApiRequest extends NextApiRequest {
  files: Express.Multer.File[];
}
type ResponseData = ApiResponse<string[], string>;

const oneMegabyteInBytes = 1000000;
const outputFolderName = './public/uploads';

// Returns a Multer instance that provides several methods for generating
// middleware that process files uploaded in multipart/form-data format.

const upload = multer({
  storage: multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, cb) => cb(null, file.originalname),
  }),
});

const apiRoute = nextConnect({
  onError(
    error,
    req: NextConnectApiRequest,
    res: NextApiResponse<ResponseData>,
  ) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req: NextConnectApiRequest, res: NextApiResponse<ResponseData>) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

// Returns middleware that processes multiple files sharing the same field name.
const uploadMiddleware = upload.array('theFiles');

// Adds the middleware to Next-Connect
apiRoute.use(uploadMiddleware);

// Process a POST request
apiRoute.post(
  (req: NextConnectApiRequest, res: NextApiResponse<ResponseData>) => {
    const filenames = fs.readdirSync(outputFolderName);
    const images = filenames.map((name) => name);

    res.status(200).json({ data: images });
  },
);

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};

export default apiRoute;
