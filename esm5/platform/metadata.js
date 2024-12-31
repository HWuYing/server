import { __awaiter, __decorate, __generator, __metadata, __param, __rest, __spreadArray } from "tslib";
import { Inject, Injectable } from '@hwy-fm/di';
import fs from 'fs';
import yaml from 'js-yaml';
import { flatMap, merge } from 'lodash';
import path from 'path';
import { METADATA_CONFIG, PROJECT_FOLDER } from '../token';
var Metadata = /** @class */ (function () {
    function Metadata(projectFolder, info) {
        if (info === void 0) { info = {}; }
        var filePath = info.filePath, folder = info.folder, config = __rest(info, ["filePath", "folder"]);
        this.metadata = config;
        this.ymlList = this.getYmlList(projectFolder, folder, filePath);
    }
    Metadata.prototype.getYmlList = function (projectFolder, folder, filePaths) {
        if (folder === void 0) { folder = 'resources'; }
        if (filePaths === void 0) { filePaths = []; }
        var isDevelopment = process.env.NODE_ENV === 'development';
        var dirname = path.isAbsolute(folder) ? folder : path.join(projectFolder, isDevelopment ? 'src' : '', folder);
        return flatMap(__spreadArray(['application.yml'], filePaths, true).map(function (item) {
            var filePath = path.isAbsolute(item) ? item : path.join(dirname, item);
            return [filePath].concat(isDevelopment ? [filePath.replace(/(\.dev)?\.yml$/g, '.dev.yml')] : []);
        }));
    };
    Metadata.prototype.loadYml = function (filePath) {
        return fs.existsSync(filePath) ? yaml.load(fs.readFileSync(filePath, 'utf-8')) : {};
    };
    Metadata.prototype.load = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.ymlList.reduce(function (info, ymlPath) { return merge(info, _this.loadYml(ymlPath)); }, this.metadata)];
            });
        });
    };
    Metadata = __decorate([
        Injectable(),
        __param(0, Inject(PROJECT_FOLDER)),
        __param(1, Inject(METADATA_CONFIG)),
        __metadata("design:paramtypes", [String, Object])
    ], Metadata);
    return Metadata;
}());
export { Metadata };
