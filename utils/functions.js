import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const generateToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};

const hashPassword = async (password) => {
    return await bcrypt.hash(password, 12);
}

const checkPassword = (password, encrypted_password) => {
    return bcrypt.compare(password, encrypted_password);
}

export { generateToken, checkPassword, hashPassword };