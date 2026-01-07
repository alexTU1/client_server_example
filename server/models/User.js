import mongoose from "mongoose";
import bcrypt from "bcrypt"

const UserSchema = new mongoose.Schema({
    name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
},
{ timestamps: true });

UserSchema.pre("save", async function(next) {
    try {
        if (!this.isModified("password")) return next();

        const salt = await bcrypt.genSalt(process.env.SALT_ROUNDS);
        this.password = await bcrypt.hash(this.password, salt);

        next();
    } catch (error) {
        next(error);
    }
});

UserSchema.methods.comparePasswords = async function(password) {
    try {
        // compares the stored hashed password with the provided password(enterd by user in login form).
        return bcrypt.compare(password, this.password);
    } catch (error) {
        throw new Error("Invalid Password Error: ", error.message);  
    }
}

UserSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

const User = mongoose.model("User", UserSchema);
module.exports = User;