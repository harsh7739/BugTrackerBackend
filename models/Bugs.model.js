const mongoose = require('mongoose');

const bugsSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^https?:\/\/.*/.test(v);
      },
      message: props => `${props.value} is not a valid URL for source.`,
    },
  },
  severity: {
    type: String,
    enum: ['Critical', 'Major', 'Medium', 'Low'],
    required: true,
  },
  raised_by: {
    type:String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

const BugsModel = mongoose.model('Bug', bugsSchema);

module.exports = {BugsModel};
