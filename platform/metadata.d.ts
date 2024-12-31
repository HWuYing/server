export interface MetadataInfo extends Record<string, any> {
    folder?: string;
    filePath?: string[];
}
export declare class Metadata {
    private ymlList;
    private metadata;
    constructor(projectFolder: string, info?: MetadataInfo);
    protected getYmlList(projectFolder: string, folder?: string, filePaths?: string[]): string[];
    protected loadYml(filePath: string): unknown;
    load(): Promise<any>;
}
