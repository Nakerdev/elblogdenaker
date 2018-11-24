jest.mock("../../src/Scripts/Utils/FileSystemWrapper", () => {
    return {
        createPath: jest.fn(),
        existPath: jest.fn()
    }
});

const FolderService = require("../../src/Scripts/Utils/FolderService");
const FileSystemWrapper = require("../../src/Scripts/Utils/FileSystemWrapper");

describe("folder service", () => {

    let dirCreator;

    beforeEach(() => {
        dirCreator = new FolderService("/any/Base/Path", FileSystemWrapper);
    });

    afterEach(() => {
        jest.resetAllMocks()
    });

    it("does not create dir if already exist", () => {
        FileSystemWrapper.existPath
            .mockImplementation(() => {
                return true;
            });

        let finalPath = dirCreator.createDirStructureByDate({articleDate: "10/12/2018"});

        expect(FileSystemWrapper.createPath).not.toHaveBeenCalled();
        expect(finalPath).toBe("/any/Base/Path/2018/12/10")
    });

    it("creates dir structure by date", () => {
        let finalPath = dirCreator.createDirStructureByDate({articleDate: "10/12/2018"});

        expect(FileSystemWrapper.createPath).toHaveBeenCalledWith("/any/Base/Path/2018");
        expect(FileSystemWrapper.createPath).toHaveBeenCalledWith("/any/Base/Path/2018/12");
        expect(FileSystemWrapper.createPath).toHaveBeenCalledWith("/any/Base/Path/2018/12/10");
        expect(finalPath).toBe("/any/Base/Path/2018/12/10")
    });
});