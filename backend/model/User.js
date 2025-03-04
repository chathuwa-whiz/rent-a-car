import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    firstName: { 
        type: String, 
        required: true 
    },
    lastName: { 
        type: String, 
        required: true 
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (v) => /^(070|071|072|074|075|076|077|078)\d{7}$/.test(v),
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    secondaryPhone: {
      type: String,
      validate: {
        validator: (v) =>
          v === "" || /^(070|071|072|074|075|076|077|078)\d{7}$/.test(v),
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    nic: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (v) => /^[0-9]{9}[vVxX]$|^[0-9]{12}$/.test(v),
        message: (props) => `${props.value} is not a valid NIC number!`,
      },
    },
    address: { 
        type: String, 
        required: true 
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    password: { 
        type: String, 
        required: true, 
        minlength: 6 
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },

  }, { timestamps: true });

userSchema.pre("save", async function (next) {

    if(this.isModified("password")){
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
      { id: this._id, role: this.role }, 
      process.env.JWT_SECRET, 
      { expiresIn: '24h' }
  );
};

const User = mongoose.model("User", userSchema);

export default User;
