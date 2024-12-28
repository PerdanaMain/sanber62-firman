import mongoose from "mongoose";
import { User } from "../utils/interfaces";
import { encrypt } from "../utils/encryption";

const Schema = mongoose.Schema;

const UsersSchema = new Schema<User>(
  {
    username: {
      type: Schema.Types.String,
      required: true,
    },
    email: {
      type: Schema.Types.String,
      required: true,
    },
    password: {
      type: Schema.Types.String,
      required: true,
    },
    roles: {
      type: [Schema.Types.String],
      enum: ["admin", "user"],
      default: ["user"],
    },
    profilePicture: {
      type: Schema.Types.String,
      default: "user.jpg",
    },
  },
  {
    timestamps: true,
  }
);

UsersSchema.pre("save", function (next) {
  const user = this;
  user.password = encrypt(user.password);
  next();
});

UsersSchema.pre("updateOne", async function (next) {
  const user = (this as unknown as { _update: any })._update as User;
  user.password = encrypt(user.password);
  next();
});

UsersSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

const UserModel = mongoose.model<User>("users", UsersSchema);
export default UserModel;
