import jwt from "jsonwebtoken";

const Authenticate = (req, res, next) => {
    jwt.verify(req.cookies.usertoken, process.env.SECRET_KEY, (err, payload) => {
        if (err) {
            res.status(401).json({ verified: false });
        } else {
            next();
        }
    });
}

const auth = (req, res, next) => {
    const token = req.header("x-auth-token");
    if (!token)
        return res.status(401).send("Access denied. Not authenticated...");
    try {
        const jwtSecretKey = process.env.JWT_SECRET_KEY;
        const decoded = jwt.verify(token, jwtSecretKey);

        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).send("Invalid auth token...");
    }
};

// For User Profile
const isUser = (req, res, next) => {
    auth(req, res, () => {
        if (req.user._id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            res.status(403).send("Access denied. Not authorized...");
        }
    });
};

// For Admin
const isAdmin = (req, res, next) => {
    auth(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            res.status(403).send("Access denied. Not authorized...");
        }
    });
};



export default {Authenticate, isUser, isAdmin}