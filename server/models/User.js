/**
 * @fileoverview This file defines fields and allowed data types for interaction of records within the users collection.
 * @author @alexTU1
 * @version 1.0.0
 * @module User.js
 */

import mongoose from "mongoose";
import bcrypt from "bcrypt"

// Define User Schema
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

// Pre-save hook to hash password before saving to database
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

// Method to compare entered password with stored hashed password
UserSchema.methods.comparePasswords = async function(password) {
    try {
        // compares the stored hashed password(in mongo) with the provided password(enterd by user in login form).
        return bcrypt.compare(password, this.password);
    } catch (error) {
        throw new Error("Invalid Password Error: ", error.message);  
    }
}

// Exclude password field when converting to JSON
UserSchema.methods.toJSON = function () {
  const obj = this.toObject()
  delete obj.password;
  return obj;
};

const User = mongoose.model("User", UserSchema);
module.exports = User;