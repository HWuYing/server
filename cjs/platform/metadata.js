"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Metadata = void 0;
var tslib_1 = require("tslib");
var di_1 = require("@hwy-fm/di");
var fs_1 = tslib_1.__importDefault(require("fs"));
var js_yaml_1 = tslib_1.__importDefault(require("js-yaml"));
var lodash_1 = require("lodash");
var path_1 = tslib_1.__importDefault(require("path"));
var token_1 = require("../token");
var Metadata = /** @class */ (function () {
    function Metadata(projectFolder, info) {
        if (info === void 0) { info = {}; }
        var filePath = info.filePath, folder = info.folder, config = tslib_1.__rest(info, ["filePath", "folder"]);
        this.metadata = config;
        this.ymlList = this.getYmlList(projectFolder, folder, filePath);
    }
    Metadata.prototype.getYmlList = function (projectFolder, folder, filePaths) {
        if (folder === void 0) { folder = 'resources'; }
        if (filePaths === void 0) { filePaths = []; }
        var isDevelopment = process.env.NODE_ENV === 'development';
        var dirname = path_1.default.isAbsolute(folder) ? folder : path_1.default.join(projectFolder, isDevelopment ? 'src' : '', folder);
        return (0, lodash_1.flatMap)(tslib_1.__spreadArray(['application.yml'], filePaths, true).map(function (item) {
            var filePath = path_1.default.isAbsolute(item) ? item : path_1.default.join(dirname, item);
            return [filePath].concat(isDevelopment ? [filePath.replace(/(\.dev)?\.yml$/g, '.dev.yml')] : []);
        }));
    };
    Metadata.prototype.loadYml = function (filePath) {
        return fs_1.default.existsSync(filePath) ? js_yaml_1.default.load(fs_1.default.readFileSync(filePath, 'utf-8')) : {};
    };
    Metadata.prototype.load = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.ymlList.reduce(function (info, ymlPath) { return (0, lodash_1.merge)(info, _this.loadYml(ymlPath)); }, this.metadata)];
            });
        });
    };
    Metadata = tslib_1.__decorate([
        (0, di_1.Injectable)(),
        tslib_1.__param(0, (0, di_1.Inject)(token_1.PROJECT_FOLDER)),
        tslib_1.__param(1, (0, di_1.Inject)(token_1.METADATA_CONFIG)),
        tslib_1.__metadata("design:paramtypes", [String, Object])
    ], Metadata);
    return Metadata;
}());
exports.Metadata = Metadata;
