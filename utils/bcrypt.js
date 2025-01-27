const bcrypt = require("bcrypt");

exports.encryptPassword = async (password) => {
 
    return await bcrypt.hash(password, 12);

};

exports.checkPassword = async (password,encryptedPassword) => {

    return await bcrypt.compare(password , encryptedPassword);

}
