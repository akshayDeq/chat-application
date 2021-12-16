const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    unique: [true, "Email Id already exists"],
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email")
      }
    }
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
    min: 10
  },
  memberOf: [{ type: mongoose.Schema.Types.ObjectId, ref: 'room' }],
  
})

const User = mongoose.model("user", userSchema);

module.exports = User;