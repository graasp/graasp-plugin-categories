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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
// global
const slonik_1 = require("slonik");
/**
 * Database's first layer of abstraction for Categorys
 */
class CategoryService {
    /**
     * Get all categories
     */
    getAll(dbHandler) {
        return __awaiter(this, void 0, void 0, function* () {
            return (dbHandler
                .query((0, slonik_1.sql) `
        SELECT *
        FROM category_age
      `)
                // TODO: is there a better way?
                .then(({ rows }) => rows.slice(0)));
        });
    }
    /**
     * Get Category matching the given `id` or `null`, if not found.
     * @param id Category's id
     * @param dbHandler Database handler
     */
    get(id, dbHandler) {
        return __awaiter(this, void 0, void 0, function* () {
            return dbHandler
                .query((0, slonik_1.sql) `
        SELECT *
        FROM category_age
        WHERE id = ${id}
      `)
                .then(({ rows }) => rows[0] || null);
        });
    }
}
exports.CategoryService = CategoryService;
