const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
  productsId: {
    type: Number,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
  author: {
    type: String,
  },
  password: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("products", productsSchema);

//스키마에서 필요한 데이터 종류
//productsId,title,content,status ,author, password,  createdAt(?)
