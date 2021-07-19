import { v2 as c } from 'cloudinary';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

const endpoint = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const options = {
      cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    };
    c.config(options);
    console.log(req.body);
    // const signedSignature = c.utils.api_sign_request(
    //   req.body,
    //   process.env.CLOUDINARY_API_SECRET!,
    // );
    //Karls example!
  }
};

export default endpoint;

// interface NextConnectApiRequest extends NextApiRequest {
//   files: Express.Multer.File[];
// }
// type ResponseData = ApiResponse<string[], string>;

// const oneMegabyteInBytes = 1000000;
// const outputFolderName = './public/uploads';

// // Returns a Multer instance that provides several methods for generating
// // middleware that process files uploaded in multipart/form-data format.

// const upload = multer({
//   storage: multer.diskStorage({
//     destination: './public/uploads',
//     filename: (req, file, cb) => cb(null, file.originalname),
//   }),
// });

// const apiRoute = nextConnect({
//   onError(
//     error,
//     req: NextConnectApiRequest,
//     res: NextApiResponse<ResponseData>,
//   ) {
//     res
//       .status(501)
//       .json({ error: `Sorry something Happened! ${error.message}` });
//   },
//   onNoMatch(req: NextConnectApiRequest, res: NextApiResponse<ResponseData>) {
//     res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
//   },
// });

// // Returns middleware that processes multiple files sharing the same field name.
// const uploadMiddleware = upload.array('theFiles');

// // Adds the middleware to Next-Connect
// apiRoute.use(uploadMiddleware);

// // Process a POST request
// apiRoute.post(
//   (req: NextConnectApiRequest, res: NextApiResponse<ResponseData>) => {
//     const filenames = fs.readdirSync(outputFolderName);
//     const images = filenames.map((name) => name);

//     res.status(200).json({ data: images });
//   },
// );

// export const config = {
//   api: {
//     bodyParser: false, // Disallow body parsing, consume as stream
//   },
// };

// export default apiRoute;
