"use strict";
// const catchAsync = (controller) => {
//     return (req, res, next) => {
//         controller(req, res).catch((err) => next(err));
//     };
// };
Object.defineProperty(exports, "__esModule", { value: true });
// module.exports = catchAsync;
const catchAsync = (controller) => {
    return (req, res, next) => {
        controller(req, res).catch((err) => next(err));
    };
};
exports.default = catchAsync;
