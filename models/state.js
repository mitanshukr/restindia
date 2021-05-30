const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stateSchema = new Schema(
  {
    iso3166code: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    capital: {
      type: String,
      required: true,
    },
    largestCity: {
      type: String,
      required: true,
    },
    districts: {
      type: Number,
      required: true,
    },
    subdivisions: {
      type: Number,
      required: true,
    },
    blocks: {
      type: Number,
      required: true,
    },
    divisions: {
      type: Array,
      required: true,
    },
    area: {
      type: Number,
      required: true,
    },
    literacy: {
      type: Number,
      required: true,
    },
    sexRatio: {
      type: Number,
      required: true,
    },
    population: {
      type: Number,
      required: true,
    },
    officialWebsite: {
      type: String,
      required: true,
    },
    censusYear: {
      type: Number,
      required: true,
    },
    emblem: {
      type: String,
      required: true,
      // immutable: true,
    },
    languages: {
      type: Array,
      required: true,
    },
    neighbours: {
      type: Array,
      required: true,
    },
    creator: {
      type: Object,
      required: true,
      select: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("State", stateSchema);
