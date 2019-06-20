//https://appdividend.com/2019/02/14/node-express-image-upload-and-resize-tutorial-example/
const sharp = require('sharp');
const uuidv4 = require('uuid/v4');
const path = require('path');

const WIDTH = 120;
const HEIGHT =120;

class Resize{
    constructor(folder) {
        this.folder = folder;
    }
    async save(buffer) {
        const filename = Resize.filename();
        const filepath = this.filepath(filename);

        await sharp(buffer)
            .resize(WIDTH, HEIGHT, {
                //Redimensionne l'image par rapport au centre
                fit: sharp.fit.inside,
                withoutEnlargement: true
            })
            .toFile(filepath);

        return filename;
    }
    static filename() {
        return `${uuidv4()}.png`;
    }
    filepath(filename) {
        return path.resolve(`${this.folder}/${filename}`)
    }
}
module.exports = Resize;