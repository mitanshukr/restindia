const express = require("express");
const router = express.Router();

const districtController = require("../controllers/districtController");
const inputFormatter = require("../middleware/inputValidator");

// router.get('/', districtController.getAllDistricts);
/**
 * @openapi
 * paths:
 *  /district/all:
 *   get:
 *    tags:
 *     - District
 *    summary: Returns Information about All Districts.
 *    description: Get information about all the Districts of Indian States.
 *    responses:
 *     200:
 *      description: Returns a JSON Array of all the Districts.
 *    parameters:
 *     - in: query
 *       name: name
 *       description: Regex Search Districts by matching Name.
 *       example: Aurangabad
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
 *       example: Munger
 *     - in: query
 *       name: page
 *       description: Paginate the Output Response. Works with <b>limit</b> query.
 *       example: 1
 *     - in: query
 *       name: limit
 *       description: Limit the Output Response.
 *       example: 5
 */
router.get("/all", districtController.getAllDistricts);

/**
 * @openapi
 * paths:
 *  /district/{district}:
 *   get:
 *    summary: Returns a District by Name.
 *    description: Get information of a District by name.
 *    tags:
 *     - District
 *    responses:
 *     200:
 *      description: Returns a JSON Array with District information.
 *    parameters:
 *     - in: path
 *       name: district
 *       description: Provide name of the District
 *       required: true
 *       schema:
 *        type: string
 *     - in: query
 *       name: fields
 *       description: Filter the Output Response. Add multiple keys seperated by commas.
 *       example: name,languages
 */
router.get("/:district", inputFormatter.params, districtController.getDistrict);

module.exports = router;
