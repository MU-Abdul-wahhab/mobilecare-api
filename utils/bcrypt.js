const bcrypt = require("bcrypt");

exports.encryptPassword = async (password) => {
 
    return await bcrypt.hash(password, 12);

};
