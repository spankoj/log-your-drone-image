import argon2 from 'argon2';
import cookie from 'cookie';
import { getUserByName, insertSession } from '../../../utils/database';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const username = req.body.username;
    const password = req.body.password;

    const currentUser = await getUserByName(username);
    if (!currentUser) {
      return res.status(401).json({ success: false });
    }
    const match = await argon2.verify(currentUser.password, password);

    if (!match) {
      return res.status(401).json({ success: false });
    }

    const token = crypto.randomBytes(24).toString('base64');

    await insertSession(token, currentUser.id);

    res.setHeader(
      'Set-Cookie',
      cookie.serialize('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 72,
        path: '/',
      }),
    );

    return res.status(200).json({ success: true });
  }
};
export default handler;
