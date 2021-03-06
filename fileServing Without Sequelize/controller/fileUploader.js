/**
 * Uploads file on the server
 */
const uploadFile = (res, file, filename) => {
  file.mv(`./public/${filename}`, function (err) {
    if (err)
      return res.status(500).send(err);
    res.send(`Your FileId:<h3>${filename}</h3> 
    \n To access in future goto: http://localhost:3000/${filename}`);
  });
};

module.exports = uploadFile;
