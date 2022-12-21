import { IncomingForm } from 'formidable'

let mv = require('mv');

export const config = {
    api: {
       bodyParser: false,
    }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const data = await new Promise((resolve, reject) => {
    const form = new IncomingForm()
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err)
      // console.log('fielfds', fields, 'files', files)
      // console.log('file', files.file.filepath)
      let oldPath = files.file.filepath;
      let newPath = `./public/uploads/spots/${files.file.originalFilename}`;
      mv(oldPath, newPath, function (err) {
      });
      res.status(200).json({ fields, files })
    })
  })
}
