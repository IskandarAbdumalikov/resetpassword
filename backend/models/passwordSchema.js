import Joi from "joi";
import mongoose from "mongoose";

const passwordSchema = new mongoose.Schema(
  {
    oldPassword: {
      type: String,
      required: true,
    },
    newPassword: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Passwords = mongoose.model("Password", passwordSchema);

export const validatePassword = (body) => {
  const schema = Joi.object({
    oldPassword: Joi.string().required(),
    newPassword: Joi.string().required(),
  });
  return schema.validate(body);
};
