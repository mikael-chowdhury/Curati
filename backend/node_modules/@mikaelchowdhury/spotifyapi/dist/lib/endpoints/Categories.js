"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Categories {
    constructor(client) {
        this.client = client;
    }
    getBrowseCategories() {
        return new Promise((res, rej) => {
            this.client.apiHelper.get("/browse/categories").then((response) => res(response.data.categories));
        });
    }
    getBrowseCategory(categoryId) {
        return new Promise((res, rej) => {
            this.client.apiHelper.get(`/browse/categories/${categoryId}`).then((response) => res(response.data));
        });
    }
}
exports.default = Categories;
