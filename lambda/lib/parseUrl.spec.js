const pUrl = require('./parseUrl');

describe('parseUrl', () => {
    test('should return `{}` for no resize command', () => {
        const actual = pUrl();
        const expected = {};
        expect(actual).toEqual(expected);
    });

    test('should identify jpg image and detect resize command of a typical content image', () => {
        const actual = pUrl('path/to/file/IMG_9250-resized-300x200.JPG');
        let expected = {};
            expected.mimeType = "image/jpeg";
            expected.resize = {
                width: 300,
                height: 200,
                filter: false
            };
            expected.originalKey = "path/to/file/IMG_9250.JPG";

        expect(actual).toEqual(expected);
    });

    test('should identify jpg image and detect resize command of a typical blur thumbnail', () => {
        const actual = pUrl('path/to/file/IMG_9250-resized-50x50-b.JPG');
        let expected = {};
        expected.mimeType = "image/jpeg";
        expected.resize = {
            width: 50,
            height: 50,
            filter: "b"
        };
        expected.originalKey = "path/to/file/IMG_9250.JPG";

        expect(actual).toEqual(expected);
    });

    test('should identify png image and detect resize command of a typical banner image', () => {
        const actual = pUrl('path/to/file/banner-20180425-resized-600x200.png');
        let expected = {};
        expected.mimeType = "image/png";
        expected.resize = {
            width: 600,
            height: 200,
            filter: false
        };
        expected.originalKey = "path/to/file/banner-20180425.png";

        expect(actual).toEqual(expected);
    });

    test('should identify png image located at root', () => {
        const actual = pUrl('banner-20180425-resized-600x200.png');
        let expected = {};
        expected.mimeType = "image/png";
        expected.resize = {
            width: 600,
            height: 200,
            filter: false
        };
        expected.originalKey = "banner-20180425.png";

        expect(actual).toEqual(expected);
    });
});
