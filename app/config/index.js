const config = {
    app: {
        port: process.env.PORT || 3000,
    },
    db: {
        uri: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/contactbook" 
    },
    auth: {
        secretKey: process.env.ACCESS_TOKEN_SECRET || "jwttest",
        expired: process.env.ACCESS_TOKEN_LIFE || "10m"
    }
};

module.exports = config;