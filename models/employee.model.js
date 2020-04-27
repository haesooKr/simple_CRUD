const mongoose = require('mongoose');

let employeeSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: "This field is required."
  },
  email: {
    type: String
  },
  mobile: {
    type: String
  },
  city: {
    type: String
  },
});

employeeSchema.path('email').validate((email) => {
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email)
}, 'Invalid e-mail.')

mongoose.model('Employee', employeeSchema);