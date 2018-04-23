'use strict';

const path = require('path');
const mime = require('mime-types');

function parseUrl(string) {
    let format = {};
    let mimeType = mime.lookup(string);

    if(string && (mimeType === "image/jpeg" || mimeType === "image/png")) {
        const fileParts = path.parse(string);
        const resizer = fileParts.name.split("-resized-");

        if(resizer.length > 1){
            let resizeCommand = resizer[1].split("-");
            let resizeDimension = resizeCommand[0].split("x");

            if(resizeDimension.length > 0) {
                format.resize = {
                    width: parseInt(resizeDimension[0]),
                    height: parseInt(resizeDimension[1]),
                    filter: (resizeCommand[1]) ? (resizeCommand[1]) : false
                };
            }

            format.originalKey = fileParts.dir + "/" + resizer[0] + fileParts.ext;
            format.mimeType = mimeType;
        }
    }

    return format;
}

module.exports = parseUrl;