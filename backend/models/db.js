const  mongoose = require("mongoose")
const { Schema } = mongoose;

connect(
  "mongodb+srv://tanirudhganesh:valtisbest@cluster0.gntytop.mongodb.net/"
);
const userSchema = new Schema({
  Firstname: { type: String, required: true },
  Lastname: { type: String },
  email: { type: String, required: true, unique: true },
  Username: { type: String, required: true, unique: true },
  password: { type: String, minlength: 6 },
  role: { type: String, enum: ["buyer", "seller", "admin"], default: "buyer" },
});

//////encrypting password of users//////
userSchema.methods.createHash = async function (plainTextPassword) {
  // Salting and Hashing
  const saltRounds = 10;
  const salt = await genSalt(saltRounds);
  return await hash(plainTextPassword, salt);
};

// Saving password with stored hash and hash function
userSchema.methods.validatePassword = async function (candidatePassword) {
  return await compare(candidatePassword, this.password);
}
/////////-**************-//////////

const User = mongoose.model("User", userSchema);

module.exports = {User};
