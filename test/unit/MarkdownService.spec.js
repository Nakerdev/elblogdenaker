jest.mock("../../src/Scripts/Utils/ShowdownWrapper", () => {
    return {
        convertToHtml: jest.fn()
    }
});

jest.mock("../../src/Scripts/Utils/FileSystemWrapper", () => {
    return {
        read: jest.fn(),
        createFile: jest.fn()
    }
});

const MarkdownService = require("../../src/Scripts/Utils/MarkdownService");
const ShowdownWrapper = require("../../src/Scripts/Utils/ShowdownWrapper");
const FileSystemWrapper = require("../../src/Scripts/Utils/FileSystemWrapper");

describe("markdown service", () => {

    let markdownService;

    beforeEach(() => {
        markdownService = new MarkdownService({
            showdownWrapper: ShowdownWrapper,
            fileSystemWrapper: FileSystemWrapper
        });
    });

    it("return html from markdown file", () => {
        FileSystemWrapper.read
            .mockImplementation((filePath) => {
                expect(filePath).toEqual({filePath: "markdownFilePath"});
                return "some markdown";
            });
        ShowdownWrapper.convertToHtml
            .mockImplementation((markdown) => {
                expect(markdown).toEqual({markdown: "some markdown"});
                return "some html";
            });

        let html = markdownService.convertToHtmlFromMarkdownFile({
            markdownFilePath: "markdownFilePath"
        });

        expect(html).toBe("some html");
    })
});