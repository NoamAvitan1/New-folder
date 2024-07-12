const { Schema, default: mongoose } = require("mongoose");

const groupSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  persons: [
    {
      ref: "Person",
      type: Schema.Types.ObjectId,
    },
  ],
});

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;
