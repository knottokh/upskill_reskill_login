const mongoose = require('mongoose'),
    //bcrypt = require('bcrypt'),
    Schema = mongoose.Schema;
    // ChildSchema = require('./child'),
    // addressSchema = require('./address');

const userSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: { type: String},
    password: { type: String },
    fullname: { type: String }
    // created: { type: Date, default: Date.now},
    // modified: { type: Date, default: Date.now },
});
// userSchema.methods.comparePassword = function(password) {
//     return bcrypt.compareSync(password, this.password);
//   };

// userSchema.statics.getUserById = function(id, callback) {
//     User.findById(id, callback);
//   };

// userSchema.statics.getUserByUsername = function(username, callback) {
//     let query = {username: username};
//     User.findOne(query, callback);
// }
// userSchema.statics.getUsers = () => {
//     return User.find({}, '-password');
// }
const User =  mongoose.model('upskill_users', userSchema);
module.exports = User;