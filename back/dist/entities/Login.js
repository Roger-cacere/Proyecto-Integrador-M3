"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserLogin = exports.loginStatus = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
var loginStatus;
(function (loginStatus) {
    loginStatus["TRUE"] = "true";
    loginStatus["FALSE"] = "false";
})(loginStatus || (exports.loginStatus = loginStatus = {}));
let UserLogin = class UserLogin {
};
exports.UserLogin = UserLogin;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UserLogin.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserLogin.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => User_1.User, user => user.login),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", User_1.User)
], UserLogin.prototype, "user", void 0);
exports.UserLogin = UserLogin = __decorate([
    (0, typeorm_1.Entity)({
        name: "Logins"
    })
], UserLogin);
