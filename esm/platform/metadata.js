import { __awaiter, __decorate, __metadata, __param, __rest } from "tslib";
import { Inject, Injectable } from '@hwy-fm/di';
import fs from 'fs';
import yaml from 'js-yaml';
import { flatMap, merge } from 'lodash';
import path from 'path';
import { METADATA_CONFIG, PROJECT_FOLDER } from '../token';
let Metadata = class Metadata {
    constructor(projectFolder, info = {}) {
        const { filePath, folder } = info, config = __rest(info, ["filePath", "folder"]);
        this.metadata = config;
        this.ymlList = this.getYmlList(projectFolder, folder, filePath);
    }
    getYmlList(projectFolder, folder = 'resources', filePaths = []) {
        const isDevelopment = process.env.NODE_ENV === 'development';
        const dirname = path.isAbsolute(folder) ? folder : path.join(projectFolder, isDevelopment ? 'src' : '', folder);
        return flatMap(['application.yml', ...filePaths].map((item) => {
            const filePath = path.isAbsolute(item) ? item : path.join(dirname, item);
            return [filePath].concat(isDevelopment ? [filePath.replace(/(\.dev)?\.yml$/g, '.dev.yml')] : []);
        }));
    }
    loadYml(filePath) {
        return fs.existsSync(filePath) ? yaml.load(fs.readFileSync(filePath, 'utf-8')) : {};
    }
    load() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.ymlList.reduce((info, ymlPath) => merge(info, this.loadYml(ymlPath)), this.metadata);
        });
    }
};
Metadata = __decorate([
    Injectable(),
    __param(0, Inject(PROJECT_FOLDER)),
    __param(1, Inject(METADATA_CONFIG)),
    __metadata("design:paramtypes", [String, Object])
], Metadata);
export { Metadata };
