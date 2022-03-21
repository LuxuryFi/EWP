const logger = require('../services/loggerService');
var geoip = require('geoip-lite');
const generateBcrypt = require('../services/generateBcrypt');


exports.service1Test = (req, res, next) => {
  const url = req.protocol + '://' + req.get('host')
  console.log(url);
  console.log(req.body.name);
  // const user = new User({
  //     _id: new mongoose.Types.ObjectId(),
  //     name: req.body.name,
  //     profileImg: url + '/public/' + req.file.filename
  // });
  // user.save().then(result => {
  //     res.status(201).json({
  //         message: "User registered successfully!",
  //         userCreated: {
  //             _id: result._id,
  //             profileImg: result.profileImg
  //         }
  //     })
  // }).catch(err => {
  //     console.log(err),
  //         res.status(500).json({
  //             error: err
  //         });
  // })
  res.send('Success');
}

exports.service2Test = (req, res, next) => {
  const reqFiles = [];
  const url = req.protocol + '://' + req.get('host')
  for (var i = 0; i < req.files.length; i++) {
      reqFiles.push({ document: req.files[i].filename, idea_id: 1})
  }

  console.log(reqFiles);
}