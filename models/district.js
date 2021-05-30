const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const districtSchema = new Schema(
  {
    districtCode: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    division: {
      type: String,
      required: true,
    },
    subdivisions: {
      type: Array,
      required: true,
    },
    blocks: {
      type: Array,
      required: true,
    },
    area: {
      type: Number,
      required: true,
    },
    population: {
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
    censusYear: {
      type: Number,
      required: true,
    },
    officialWebsite: {
      type: String,
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

module.exports = mongoose.model("District", districtSchema);
