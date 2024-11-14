import { model, Schema } from "npm:mongoose";
import { compareSync } from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";

// 1. Create an interface representing a document in MongoDB.
export interface IAccount {
  username: string;
  email: string;
  password: string;
  activated: boolean;
  activationKey: string;
  createAt: Date;
  updateAt: Date;
  verifyPassword: (plainPassword: string) => boolean;
}

// Define schema.
const accountSchema = new Schema<IAccount>({
  username: {
    type: String,
    unique: true,
    required: [true, "username_cannot_be_blank"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "email_cannot_be_blank"],
  },
  password: { type: String, required: [true, "password_cannot_be_blank"] },
  activated: { type: Boolean, default: false },
  activationKey: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

accountSchema.method(
  "verifyPassword",
  function (plainPassword: string): boolean {
    let is_right = false;
    if (compareSync(plainPassword, this.password)) {
      is_right = true;
    }
    return is_right;
  },
);

// Export model.
export const Account = model("Account", accountSchema);
