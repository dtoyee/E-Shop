import jwt from 'jsonwebtoken'
import crypto from 'crypto'

const generateToken = (payload) => {
  const secretKey = crypto.randomBytes(32).toString('hex');
  const options = {
    expiresIn: '1h',
  };

  const token = jwt.sign(payload, secretKey, options);
  return token;
};

export default generateToken