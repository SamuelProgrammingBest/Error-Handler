"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (config) => {
    return (err, req, res, next) => {
        let configErrors = config.customRules;
        let defaultMessage = config.defaultMessage;
        for (let i = 0; i < configErrors.length; i++) {
            const error = configErrors[i];
            const { match, statusCode, message } = error;
            if (match(err)) {
                return res.status(statusCode).send({
                    status: String(statusCode).startsWith("4") ? "fail" : "error",
                    message
                });
            }
        }
        return res.status(500).send({
            status: "error",
            message: defaultMessage ? defaultMessage : "Internal Server Error"
        });
    };
};
exports.errorHandler = errorHandler;
