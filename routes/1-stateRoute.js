const express = require("express");
const router = express.Router();

const stateController = require("../controllers/stateController");
const inputFormatter = require("../middleware/inputValidator");

// router.get('/', stateController.getAllStates);
/**
 * @openapi
 * paths:
 *  /state/all:
 *   get:
 *    tags:
 *     - State
 *    summary: Returns Information about All States.
 *    description: Get information about all the Indian States.
 *    responses:
 *     200:
 *      description: Returns a JSON Array of all the states.
 *    parameters:
 *     - in: query
 *       name: name
 *       description: Regex Search States by matching Name.
 *       example: Madhya Pradesh
 *     - in: query
 *       name: languages
 *       description: Search States by matching Language(s).
 *       example: Hindi
 *     - in: query
 *       name: neighbours
 *       description: Search States by matching Neighbour(s).
 *       example: Rajasthan
 *     - in: query
 *       name: fields
 *       description: Filter the Output Response. Add multiple keys seperated by commas.
 *       example: name,languages
 *     - in: query
 *       name: sortby
 *       description: Sort the Output Response by Keys. Add multiple keys seperated by commas.
 *       example: population:asc,area:desc
 *     - in: query
 *       name: page
 *       description: Paginate the Output Response. Works with <b>limit</b> query.
 *       example: 1
 *     - in: query
 *       name: limit
 *       description: Limit the Output Response.
 *       example: 5
 */
router.get("/all", stateController.getAllStates);

/**
 * @openapi
 * paths:
 *  /state/{state}:
 *   get:
 *    summary: Returns a State by Name.
 *    description: Get information of a State by name.
 *    tags:
 *     - State
 *    responses:
 *     200:
 *      description: Returns a JSON Array with State information.
 *    parameters:
 *     - in: path
 *       name: state
 *       description: Provide name of the State
 *       required: true
 *       schema:
 *        type: string
 *     - in: query
 *       name: fields
 *       description: Filter the Output Response. Add multiple keys seperated by commas.
 *       example: name,languages
 */
router.get("/:state", inputFormatter.params, stateController.getState);

module.exports = router;
