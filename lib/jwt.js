import jwt from "jsonwebtoken";

export function signJwtToken(payload, options={}) {
    const secret = process.env.JWT_SECRET
    const token = jwt.sign(payload, secret, options);
    return token;
}


export function verifyJwtToken(token) {
    try {
        const secret = process.env.JWT_SECRET;
        // We verify token using jwt then we return the payload
        const payload = jwt.verify(token, secret);
        return payload;
    } catch(error) {
        console.log(error);
        return null;
    }
}