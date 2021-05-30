const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const aboutSchema = new Schema({
  name: {
    type: String,
    required: true,
    immutable: true,
  },
  version: {
    type: String,
    required: true,
    immutable: true,
  },
  developedBy: {
    type: String,
    required: true,
    immutable: true,
  },
  developerContact: {
    type: String,
    required: true,
    immutable: true,
  },
  contributors: {
    type: Array,
    required: true,
  },
  delivery: {
    type: String,
    required: true,
    immutable: true,
  },
  message: {
    type: String,
    required: true,
    immutable: true,
  },
  disclaimer: {
    type: String,
    required: true,
    immutable: true,
  },
});

module.exports = mongoose.model("About", aboutSchema, "about"); //name, schemaName, collectionName
