const State = require("../models/state");
const District = require("../models/district");

exports.postState = (req, res, next) => {
  const body = req.body;
  State.findOne({ name: req.body.name })
    .then((data) => {
      if (data) {
        const error = new Error("State already Exists!");
        error.status = 409;
        throw error;
      }
      const state = new State({
        ...body,
        creator: {
          lastUpdatedBy: req.userEmail,
          createdBy: req.userEmail,
        },
      });
      return state.save();
    })
    .then((response) => {
      res.status(201).json({
        message: "State created Successfully!",
        data: response,
      });
    })
    .catch((err) => {
      if (!err.status) {
        err.status = 500;
      }
      next(err);
    });
};

exports.postDistrict = (req, res, next) => {
  const body = req.body;
  District.findOne({
    name: req.body.name,
    state: req.body.state,
  })
    .then((data) => {
      if (data) {
        const error = new Error("District already Exists!");
        error.status = 409;
        throw error;
      }
      const district = new District({
        ...body,
        creator: {
          lastUpdatedBy: req.userEmail,
          createdBy: req.userEmail,
        },
      });
      return district.save();
    })
    .then((response) => {
      res.status(201).json({
        message: "District created Successfully!",
        data: response,
      });
    })
    .catch((err) => {
      if (!err.status) {
        err.status = 500;
      }
      next(err);
    });
};

exports.patchState = (req, res, next) => {
  const state = req.params.state;
  const body = req.body;

  State.findOneAndUpdate(
    { name: state },
    { ...body },
    {
      new: true,
    }
  )
    .then((response) => {
      res.status(200).json({
        message: "State updated Successfully!",
        data: response,
      });
    })
    .catch((err) => {
      if (!err.status) {
        err.status = 500;
      }
      next(err);
    });
};

exports.patchDistrict = (req, res, next) => {
  const state = req.params.state;
  const district = req.params.district;
  const body = req.body;

  District.findOneAndUpdate(
    { name: district, state: state },
    { ...body },
    {
      new: true,
    }
  )
    .then((response) => {
      res.status(200).json({
        message: "District updated Successfully!",
        data: response,
      });
    })
    .catch((err) => {
      if (!err.status) {
        err.status = 500;
      }
      next(err);
    });
};
