import { model, Schema } from "npm:mongoose";
import { compareSync } from "https://deno.land/x/bcrypt@v0.4.1/mod.ts"
// Define schema.
const accountSchema = new Schema({
  username: { type: String, unique: true, required: [true, 'username_cannot_be_blank'] },
  email: { type: String, unique: true, required: [true, 'email_cannot_be_blank'] },
  password: { type: String, required: [true, 'password_cannot_be_blank'] },
  activated: { type: Boolean, default: false },
  activationKey: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  verifyPassword: function (plainPassword: string) {
    let is_right = false;
    if (compareSync(plainPassword, this.password)) {
      is_right = true;
    }
    return is_right;
  }
});


// Export model.
export default model("Account", accountSchema);