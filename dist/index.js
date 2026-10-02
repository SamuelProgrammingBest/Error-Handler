"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("./AppError"));
const errorHandler_1 = require("./errorHandler");
const tryCatch_1 = require("./tryCatch");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/test", (0, tryCatch_1.tryCatch)(async (req, res, next) => {
    await new Promise((resolve, reject) => {
        setTimeout(() => reject(new AppError_1.default("Async db timeout", 400)), 1000);
    });
    res.status(200).json({
        status: "Passed",
        data: "This will not be reached"
    });
}, true));
app.use((0, errorHandler_1.errorHandler)({
    customRules: [
        {
            match: (err) => err.code == "DB_ERROR",
            statusCode: 500,
            message: "Database is currently unavailable"
        }
    ],
    defaultMessage: "Are u serious"
}));
app.listen(3000, () => {
    console.log("Test Sever running");
});
