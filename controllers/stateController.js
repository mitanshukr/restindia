const State = require("../models/state");
const getCapitalizedArrayStrings = require("../utilities/getCapitalizedArrayStrings");

exports.getAllStates = (req, res, next) => {
  const filter = {};
  const sortby = {};
  let fields = "-__v -createdAt -updatedAt";
  const expectedQueries = [
    "name",
    "sortby",
    "languages",
    "neighbours",
    "page",
    "limit",
    "fields",
  ];

  for (let key in req.query) {
    if (!expectedQueries.includes(key)) {
      const error = new Error("Invalid Query Parameter.");
      error.status = 422;
      throw error;
    }
  }
  const currentPage = +req.query.page || 1;
  const pageLimit = +req.query.limit || 0;

  if (req.query.fields) {
    const queryFieldsArr = req.query.fields.split(",");
    const queryFields = queryFieldsArr.join(" ");

    const isExclusion = queryFieldsArr.every((field) => {
      return field.charAt(0) == "-";
    });
    const isInclusion = queryFieldsArr.every((field) => {
      return field.charAt(0) !== "-";
    });
    if (isExclusion) {
      fields += " " + queryFields;
    } else if (isInclusion) {
      fields = queryFields;
    } else {
      const error = new Error(
        "Invalid Fields parameter. Inclusion and Exclusion fields both cannot be together."
      );
      error.status = 422;
      throw error;
    }
  }

  if (req.query.sortby) {
    const sortQueries = req.query.sortby.split(",");
    sortQueries.forEach((query) => {
      sortby[query.split(":")[0]] = query.split(":")[1];
    });
  }
  if (req.query.name) {
    filter.name = { $regex: req.query.name, $options: "i" };
  }
  if (req.query.languages) {
    const languages = req.query.languages.split(",");
    filter.languages = { $all: getCapitalizedArrayStrings(languages) };
  }
  if (req.query.neighbours) {
    const neighbours = req.query.neighbours.split(",");
    filter.neighbours = { $all: getCapitalizedArrayStrings(neighbours) };
  }

  State.find(filter)
    .sort(sortby)
    .skip((currentPage - 1) * pageLimit)
    .limit(pageLimit) // pageLimit=0 i.e. limit(0) means no limit.
    .select(fields)
    .then((data) => {
      if (data.length === 0) {
        const error = new Error("No Data Available.");
        error.status = 404;
        throw error;
      } else {
        data.forEach((d) => {
          if (d.emblem) {
            d.emblem = `${process.env.ROOT_URL}/image/${d.emblem}`;
          }
        });
        res.status(200).json(data);
      }
    })
    .catch((err) => {
      if (!err.status) {
        err.status = 500;
      }
      next(err);
    });
};

exports.getState = (req, res, next) => {
  const state = req.params.state;
  let fields = "-__v -createdAt -updatedAt";
  const expectedQueries = ["fields"];

  for (let key in req.query) {
    if (!expectedQueries.includes(key)) {
      const error = new Error("Invalid Query Parameter.");
      error.status = 422;
      throw error;
    }
  }

  if (req.query.fields) {
    const queryFieldsArr = req.query.fields.split(",");
    const queryFields = queryFieldsArr.join(" ");

    const isExclusion = queryFieldsArr.every((field) => {
      return field.charAt(0) == "-";
    });
    const isInclusion = queryFieldsArr.every((field) => {
      return field.charAt(0) !== "-";
    });
    if (isExclusion) {
      fields += " " + queryFields;
    } else if (isInclusion) {
      fields = queryFields;
    } else {
      const error = new Error(
        "Invalid Fields parameter. Inclusion and Exclusion fields both cannot be together."
      );
      error.status = 422;
      throw error;
    }
  }

  State.findOne({ name: state }, fields)
    .then((data) => {
      if (!data) {
        const error = new Error("No Data Found.");
        error.status = 404;
        throw error;
      } else {
        if (data.emblem) {
          data.emblem = `${process.env.ROOT_URL}/image/${data.emblem}`;
        }
        res.status(200).json([data]);
      }
    })
    .catch((err) => {
      if (!err.status) {
        err.status = 500;
      }
      next(err);
    });
};
