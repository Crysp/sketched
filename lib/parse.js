const fs = require('fs');
const path = require('path');
const jszip = require('jszip');

function readFile(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, (err, res) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(res);
        });
    });
}

function readAndParseFileInZip(zip, filePath) {
    return zip
        .file(filePath)
        .async('string')
        .then(JSON.parse)
}

function getPalette(page) {
    const palette = [];
    const layer = page.layers.find(({ name }) => name.toLowerCase() === 'palette');

    layer.layers.forEach(({ name, style }) => {
        if (style.fills.length === 1) {
            const { color } = style.fills[0];
            palette.push({
                name,
                color: `rgba(${color.red}, ${color.green}, ${color.blue}, ${color.alpha})`,
            });
        }
    });

    return palette;
}

function getTypography(page) {
    const typography = [];
    const layer = page.layers.find(({ name }) => name.toLowerCase() === 'typography');

    layer.layers.forEach(({ name, attributedString, frame }) => {
        if (attributedString.attributes.length === 1) {
            const { name: font, size } = attributedString.attributes[0].attributes.MSAttributedStringFontAttribute.attributes;
            typography.push({
                name,
                font,
                size,
                lineHeight: frame.height,
            });
        }
    });

    return typography;
}

function getSpacers(page) {
    const spacers = [];
    const layer = page.layers.find(({ name }) => name.toLowerCase() === 'spacers');

    layer.layers.forEach(({ name, frame }) => {
        if (frame.width === frame.height) {
            spacers.push({
                name,
                size: frame.width,
            });
        }
    });

    return spacers;
}

async function readSketchFile(filePath) {
    const data = await readFile(filePath);
    const zip = await jszip.loadAsync(data);

    const pagesPromises = [];

    zip
        .folder('pages')
        .forEach(pagePath => {
            pagesPromises.push(readAndParseFileInZip(zip, `pages/${pagePath}`));
        });

    const pages = await Promise.all(pagesPromises);
    const tokenPage = pages.find(({ name }) => name.toLowerCase() === 'tokens');

    return {
        palette: getPalette(tokenPage),
        typography: getTypography(tokenPage),
        spacers: getSpacers(tokenPage),
    };
}

module.exports = function(source, callback) {
    const sourcePath = path.join(process.cwd(), source);
    readSketchFile(sourcePath).then(tokens => {
        if (callback) {
            callback(tokens);
        } else {
            console.log(tokens);
        }
    });
};
