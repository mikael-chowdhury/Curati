"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiHelper = void 0;
const axios_1 = __importDefault(require("axios"));
class ApiHelper {
    constructor(client, clientKey, clientSecret) {
        this.client = client;
        this.clientKey = clientKey;
        this.clientSecret = clientSecret;
    }
    getAccessToken() {
        return new Promise((res, rej) => {
            axios_1.default
                .post("https://accounts.spotify.com/api/token", `grant_type=client_credentials&client_id=${this.clientKey}&client_secret=${this.clientSecret}`, {
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
            })
                .catch((error) => {
                console.log(error);
            })
                .then((response) => {
                this.accessToken = response === null || response === void 0 ? void 0 : response.data.access_token;
                res(this.accessToken);
            });
        });
    }
    get(path) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.accessToken === undefined || this.accessToken.trim() === "") {
                throw new Error("Access token is not set, please call and await getAccessToken() first");
            }
            return new Promise((resolve, reject) => axios_1.default
                .get(ApiHelper.API_BASE + path, {
                headers: { Authorization: "Bearer " + this.accessToken },
            })
                .catch(reject)
                .then((response) => resolve(response)));
        });
    }
}
exports.ApiHelper = ApiHelper;
ApiHelper.API_BASE = "https://api.spotify.com/v1";
