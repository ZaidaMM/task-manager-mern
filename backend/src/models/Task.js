const { Schema, model } = require('mongoose');

const taskSchema = new Schema(
  {
    title: String,
    content: {
      type: String,
      required: true,
    },
    author: String,
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('Task', taskSchema);
