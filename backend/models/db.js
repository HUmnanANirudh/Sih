const mongoose = require("mongoose");
const { Schema } = mongoose;
const { MONGO_URI } = require("../config/config");

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
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
};
/////////-**************-//////////

const User = mongoose.model("User", userSchema);

module.exports = { User };
