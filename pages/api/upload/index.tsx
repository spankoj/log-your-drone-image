/* eslint-disable @typescript-eslint/no-unused-vars */
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
  }
};

export default endpoint;
