const getCapitalizedArrayStrings = require("../utilities/getCapitalizedArrayStrings");
const getCapitalizedString = require("../utilities/getCapitalizedString");

const { validationResult } = require("express-validator");

exports.postState = (req, res, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    const error = new Error("One or More Input Validation Failed!");
    error.status = 422;
    error.data = errors.array();
    throw error;
  }
  const body = {
    ...req.body,
    iso3166code: req.body.iso3166code.toUpperCase(),
    code: req.body.code.toUpperCase(),
    name: getCapitalizedString(req.body.name),
    capital: getCapitalizedString(req.body.capital),
    largestCity: getCapitalizedString(req.body.largestCity),
    languages: getCapitalizedArrayStrings(req.body.languages),
    divisions: getCapitalizedArrayStrings(req.body.divisions),
    neighbours: getCapitalizedArrayStrings(req.body.neighbours),
  };
  req.body = body;
  next();
};

exports.postDistrict = (req, res, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    const error = new Error("One or More Input Validation Failed!");
    error.status = 422;
    error.data = errors.array();
    throw error;
  }
  const body = {
    ...req.body,
    name: getCapitalizedString(req.body.name),
    state: getCapitalizedString(req.body.state),
    division: getCapitalizedString(req.body.division),
    subdivisions: getCapitalizedArrayStrings(req.body.subdivisions),
    blocks: getCapitalizedArrayStrings(req.body.blocks),
  };
  req.body = body;
  next();
};

exports.patchState = (req, res, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    const error = new Error("One or More Input Validation Failed!");
    error.status = 422;
    error.data = errors.array();
    throw error;
  }
  if (req.body.iso3166code)
    req.body.iso3166code = req.body.iso3166code.toUpperCase();
  if (req.body.code) req.body.code = req.body.code.toUpperCase();
  if (req.body.name)
    req.body.name = getCapitalizedString(req.body.name);
  if (req.body.capital)
    req.body.capital = getCapitalizedString(req.body.capital);
  if (req.body.largestCity)
    req.body.largestCity = getCapitalizedString(req.body.largestCity);
  if (req.body.languages)
    req.body.languages = getCapitalizedArrayStrings(req.body.languages);
  if (req.body.divisions)
    req.body.divisions = getCapitalizedArrayStrings(req.body.divisions);
  if (req.body.neighbours)
    req.body.neighbours = getCapitalizedArrayStrings(req.body.neighbours);
  next();
};

exports.patchDistrict = (req, res, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    const error = new Error("One or More Input Validation Failed!");
    error.status = 422;
    error.data = errors.array();
    throw error;
  }
  if (req.body.name) req.body.name = getCapitalizedString(req.body.name);
  if (req.body.state) req.body.state = getCapitalizedString(req.body.state);
  if (req.body.division)
    req.body.division = getCapitalizedString(req.body.division);
  if (req.body.subdivisions)
    req.body.subdivisions = getCapitalizedArrayStrings(req.body.subdivisions);
  if (req.body.blocks)
    req.body.blocks = getCapitalizedArrayStrings(req.body.blocks);
  next();
};

exports.params = (req, res, next) => {
  if (req.params.state) {
    req.params.state = getCapitalizedString(req.params.state);
  }
  if (req.params.district) {
    req.params.district = getCapitalizedString(req.params.district);
  }
  next();
};
