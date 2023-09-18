const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  message: {
    type: String,
    
  },
   name: {
    type: String,
    required: 'This field is required.'
  },
  email: {
    type: String,
    required: 'This field is required.'
  },
})

module.exports = mongoose.model('usercontact', contactSchema);