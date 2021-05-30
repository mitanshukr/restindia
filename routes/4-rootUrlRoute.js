const express = require("express");
const router = express.Router();

// const stateControllers = require('../controllers/stateController');
const rootUrlControllers = require("../controllers/rootUrlController");
const inputFormatter = require("../middleware/inputValidator");

router.get("/", rootUrlControllers.getHome);
// router.get('/:state', inputFormatter.params, stateControllers.getState);

/**
 * @openapi
 * paths:
 *  /{state}/all:
 *   get:
 *    summary: Returns Information about all Districts by State name.
 *    description: Get information about all the Districts of given State.
 *    tags:
 *     - District
 *    responses:
 *     200:
 *      description: Returns a JSON Array of all the Districts of specific State.
 *    parameters:
 *     - in: path
 *       name: state
 *       description: Provide name of the State
 *       required: true
 *       schema:
 *        type: string
 *     - in: query
 *       name: name
 *       description: Regex Search Districts by matching Name.
 *       example: Kanpur Nagar
 *     - in: query
 *       name: fields
 *       description: Filter the Output Response. Add multiple keys seperated by commas.
 *       example: name,state,blocks
 *     - in: query
 *       name: sortby
 *       description: Sort the Output Response by Keys. Add multiple keys seperated by commas.
 *       example: population:asc,area:desc
 *     - in: query
 *       name: division
 *       description: Filter the Districts by Division Name.
 *       example: Kanpur
 *     - in: query
 *       name: page
 *       description: Paginate the Output Response. Works with <b>limit</b> query.
 *       example: 1
 *     - in: query
 *       name: limit
 *       description: Limit the Output Response.
 *       example: 5
 */
router.get(
  "/:state/all",
  inputFormatter.params,
  rootUrlControllers.getAllDistricts
);

/**
 * @openapi
 * paths:
 *  /{state}/{district}:
 *   get:
 *    summary: Returns a District of the State by Names.
 *    description: Get information of a Districts of specific State by Names.
 *    tags:
 *     - District
 *    responses:
 *     200:
 *      description: Returns a JSON Array with District information.
 *    parameters:
 *     - in: path
 *       name: state
 *       description: Provide name of the State.
 *       required: true
 *       schema:
 *        type: string
 *     - in: path
 *       name: district
 *       description: Provide name of the District.
 *       required: true
 *       schema:
 *        type: string
 *     - in: query
 *       name: fields
 *       description: Filter the Output Response. Add multiple keys seperated by commas.
 *       example: name,division
 */
router.get(
  "/:state/:district",
  inputFormatter.params,
  rootUrlControllers.getDistrict
);

/**
 * @openapi
 * paths:
 *  /about:
 *   get:
 *    tags:
 *     - About
 *    summary: Returns information about API.
 *    description: Get information about API and developers.
 *    responses:
 *     200:
 *      description: Returns a JSON Object with API Info.
 */
router.get("/about", rootUrlControllers.getAbout);

module.exports = router;
