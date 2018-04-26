const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema

const IdeaSchema = new Schema({
  title:{
    type:String,
    required: true
  },
  options: [{
    optionBody: {
      type: String,
      required: true
    },
    optionScore:{
      type: Number,
      default: 0
    }
  }],
  user:{
    type: Schema.Types.ObjectId,
    ref:'users'
  },
  date:{
    type: Date,
    default: Date.now
  }
});

mongoose.model('ideas',IdeaSchema);
