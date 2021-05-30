const District = require("../models/district");

exports.getAllDistricts = (req, res, next) => {
  const filter = {};
  const sortby = {};
  let fields = "-__v -createdAt -updatedAt";
  const expectedQueries = [
    "name",
    "sortby",
    "page",
    "limit",
    "fields",
    "division",
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
  if (req.query.division) {
    filter.division = { $regex: req.query.division, $options: "i" };
  }

  District.find(filter)
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

exports.getDistrict = (req, res, next) => {
  const district = req.params.district;
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

  District.findOne({ name: district }, fields)
    .then((data) => {
      if (!data) {
        const error = new Error("No Data Found.");
        error.status = 404;
        throw error;
      } else {
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
