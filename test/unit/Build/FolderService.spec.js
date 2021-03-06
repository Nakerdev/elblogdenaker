import FolderService from "../../../src/Build/Services/FolderService";
import FileSystemWrapper from "../../../src/Build/LibsWrappers/FileSystemWrapper";
import JestUtils from "../../utils/JestUtils";

describe("folder service", () => {

    const BASE_PATH = "/any/Base/Path";
    let folderService, fileSystemWrapper;

    beforeEach(() => {
        fileSystemWrapper = JestUtils.mockAllMethods({obj: FileSystemWrapper()});
        folderService = FolderService({
            articlesDistPath: BASE_PATH,
            fileSystemWrapper: fileSystemWrapper
        });
    });

    afterEach(() => {
        jest.resetAllMocks()
    });

    it("does not create dir if already exist", () => {
        fileSystemWrapper.existPath
            .mockImplementation(() => {
                return true;
            });

        let finalPath = folderService.createDirStructureByDate({articleDate: "10/12/2018"});

        expect(fileSystemWrapper.createPath).not.toHaveBeenCalled();
        expect(finalPath).toBe(`${BASE_PATH}/2018/12/10`)
    });

    it("creates dir structure by date", () => {
        let finalPath = folderService.createDirStructureByDate({articleDate: "10/12/2018"});

        expect(fileSystemWrapper.createPath).toHaveBeenCalledWith({path: BASE_PATH});
        expect(fileSystemWrapper.createPath).toHaveBeenCalledWith({path: `${BASE_PATH}/2018`});
        expect(fileSystemWrapper.createPath).toHaveBeenCalledWith({path: `${BASE_PATH}/2018/12`});
        expect(fileSystemWrapper.createPath).toHaveBeenCalledWith({path: `${BASE_PATH}/2018/12/10`});
        expect(finalPath).toBe(`${BASE_PATH}/2018/12/10`);
    });
});