import bcrypt from "bcryptjs";
import { Passwords } from "../models/passwordSchema.js";



class PasswordController {
  async resetPassword(req, res) {
    try {
      const { oldPassword, newPassword } = req.body;
      const { id } = req.user;

      const user = await Passwords.findById(id);
      if (!user) {
        return res.status(400).json({
          msg: "User not found",
          variant: "error",
          payload: null,
        });
      }

      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({
          msg: "Old password is incorrect",
          variant: "error",
          payload: null,
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedNewPassword = await bcrypt.hash(newPassword, salt);

      user.password = hashedNewPassword;
      await user.save();

      res.status(200).json({
        msg: "Password reset successfully",
        variant: "success",
        payload: null,
      });
    } catch {
      res.status(500).json({
        msg: "Something went wrong",
        variant: "error",
        payload: null,
      });
    }
  }
}

export default new PasswordController();
