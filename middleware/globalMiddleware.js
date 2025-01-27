const {validationResult} = require('express-validator');
const appError = require('../utils/appError');

exports.checkError = (req, res, next)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const allErrors = errors.array().map(error => error.msg);
        next(new appError(allErrors.join(', '), 400)); 
   
      } else {
        next();
      }

}