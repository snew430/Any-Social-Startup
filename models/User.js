const { Schema, model } = require("mongoose");
const Thought = require("./Thought");

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: "You need to provide a username!",
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      // validate:
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

UserSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

// UserSchema.virtual(
//   "friend",
//   {
//     ref: "User",
//     localField: "_id",
//     foreignField: "friends",
//     justOne: false,
//   },
//   { toJSON: { virtuals: true } }
// );

UserSchema.pre("remove", function (next) {
  Thought.remove({ _id: this._id }).exec();
  next();
});

const User = model("User", UserSchema);

module.exports = User;
