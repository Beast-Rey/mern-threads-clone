"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cloudinary_1 = require("cloudinary");
const helmet_1 = __importDefault(require("helmet"));
const MongoConnection_1 = __importDefault(require("./database/MongoConnection"));
const UserRoutes_1 = __importDefault(require("./routes/UserRoutes"));
const PostRoutes_1 = __importDefault(require("./routes/PostRoutes"));
const logger_1 = __importDefault(require("./logger/logger"));
const ErrorHandling_1 = __importDefault(require("./middleware/ErrorHandling"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.EXPRESS_PORT || 3001;
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
//middleware
app.use((0, helmet_1.default)());
app.use(express_1.default.json({ limit: "50mb" }));
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use((0, morgan_1.default)("dev"));
//routes
app.use("/api/user", UserRoutes_1.default);
app.use("/api/post", PostRoutes_1.default);
app.use(ErrorHandling_1.default);
//mongo db connection
(0, MongoConnection_1.default)();
app.listen(port, () => logger_1.default.info(`Server is up and running on ${port}`));
