const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const contactsRouter = require('./app/routes/contact.route');
const authsRouter = require('./app/routes/auth.route')
const userRouter = require('./app/routes/user.route')
const ApiError = require('./app/api-error');

const app = express();

app.use(
	bodyParser.urlencoded({
		extended: false,
	}),
);
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send({ message: "Welcome to contact book application." });
});

app.use("/api/contacts", contactsRouter);
app.use("/auth", authsRouter);
// app.use("/users", userRouter);

app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
});

app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json(
        { message: err.message || "Internal Server Error", 
    });
});

module.exports = app;