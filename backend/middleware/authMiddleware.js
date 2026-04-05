import jwt from 'jsonwebtoken';

const protect = (requiredRole) => {
    return (req, res, next) => {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Not authorized, no token" });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            if (decoded.role !== requiredRole) {
                return res.status(403).json({ message: "Role not verified" });
            }

            req.user = decoded;
            next();

        } catch (error) {
            res.status(401).json({ message: "Token is not valid" });
        }

    }
}

export default protect;