const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const isAuth = require("../middleware/isAuth");
const inputValidator = require("../middleware/inputValidator");
const adminControllers = require("../controllers/adminController");
const adminAuthControllers = require("../controllers/adminAuthController");
const User = require("../models/user");

/**
 * @openapi
 * paths:
 *  /admin/add/state:
 *   post:
 *    tags: 
 *     - Admin
 *    summary: Add a new State.
 *    description: Add a new State to the Database.
 *    responses:
 *     201:
 *      description: Returns a JSON Object with Success Message.   
 *    security:
 *     - bearerAuth: []
 *    requestBody:
 *     description: All the properties are required.
 *     required: true
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *          iso3166code:
 *            type: string
 *          code:
 *            type: string
 *          name:
 *            type: string
 *          capital:
 *            type: string
 *          largestCity:
 *            type: string
 *          divisions:
 *            type: array
 *            items:
 *             type: string
 *          blocks:
 *            type: integer
 *          subdivisions:
 *            type: integer
 *          districts:
 *            type: integer
 *          sexRatio:
 *            type: integer
 *          literacy:
 *            type: integer
 *          population:
 *            type: integer
 *          area:
 *            type: integer
 *          censusYear:
 *            type: integer
 *          officialWebsite:
 *            type: string
 *          emblem:
 *            type: string
 *          languages:
 *            type: array
 *            items:
 *             type: string
 *          neighbours:
 *            type: array
 *            items:
 *             type: string   
 */
router.post("/add/state", isAuth,
[
  body("iso3166code").isString().withMessage("Input should be String.").not().isEmpty().withMessage("Value cannot be empty."),
  body("code").isString().withMessage("Input should be String.").not().isEmpty().withMessage("Value cannot be empty."),
  body("name").isString().withMessage("Input should be String.").not().isEmpty().withMessage("Value cannot be empty."),
  body("capital").isString().withMessage("Input should be String.").not().isEmpty().withMessage("Value cannot be empty."),
  body("largestCity").isString().withMessage("Input should be String.").not().isEmpty().withMessage("Value cannot be empty."),
  body("districts").isNumeric().withMessage("Input Should be Numeric.").not().isEmpty().withMessage("Value cannot be empty."),
  body("subdivisions").isNumeric().withMessage("Input Should be Numeric.").not().isEmpty().withMessage("Value cannot be empty."),
  body("blocks").isNumeric().withMessage("Input Should be Numeric.").not().isEmpty().withMessage("Value cannot be empty."),
  body("divisions").isArray().withMessage("Input should be an Array.").not().isEmpty().withMessage("Value cannot be empty."),
  body("divisions.*").isString().withMessage("Division should be String."),
  body("area").isNumeric().withMessage("Input Should be Numeric.").not().isEmpty().withMessage("Value cannot be empty."),
  body("literacy").isNumeric().withMessage("Input Should be Numeric.").not().isEmpty().withMessage("Value cannot be empty."),
  body("sexRatio").isNumeric().withMessage("Input Should be Numeric.").not().isEmpty().withMessage("Value cannot be empty."),
  body("population").isNumeric().withMessage("Input Should be Numeric.").not().isEmpty().withMessage("Value cannot be empty."),
  body("officialWebsite").isURL().withMessage("Input should be URL String.").not().isEmpty().withMessage("Value cannot be empty."),
  body("censusYear").isNumeric().withMessage("Input Should be Numeric.").not().isEmpty().withMessage("Value cannot be empty."),
  body("emblem").isString().withMessage("Input should be '{stateName}.svg'. E.g.: 'madhya-pradesh.svg").not().isEmpty().withMessage("Value cannot be empty."),
  body("languages").isArray().withMessage("Input should be an Array.").not().isEmpty().withMessage("Value cannot be empty."),
  body("languages.*").isString().withMessage("Language should be String."),
  body("neighbours").isArray().withMessage("Input should be an Array.").not().isEmpty().withMessage("Value cannot be empty."),
  body("neighbours.*").isString().withMessage("Neighbour should be String."),
], 
inputValidator.postState, adminControllers.postState);

/**
 * @openapi
 * paths:
 *  /admin/add/district:
 *   post:
 *    tags: 
 *     - Admin
 *    summary: Add a new District.
 *    description: Add a new District to the Database.
 *    responses:
 *     201:
 *      description: Returns a JSON Object with Success Message.   
 *    security:
 *     - bearerAuth: []
 *    requestBody:
 *     description: All the properties are required.
 *     required: true
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *          districtCode:
 *            type: integer
 *          name:
 *            type: string
 *          state:
 *            type: string
 *          division:
 *            type: string
 *          subdivisions:
 *            type: array
 *            items:
 *             type: string
 *          blocks:
 *            type: array
 *            items:
 *             type: string
 *          area:
 *            type: integer
 *          sexRatio:
 *            type: integer
 *          literacy:
 *            type: integer
 *          population:
 *            type: integer
 *          censusYear:
 *            type: integer
 *          officialWebsite:
 *            type: string
 */
router.post("/add/district", isAuth, 
[
  body("districtCode").isNumeric().withMessage("Input Should be Numeric.").not().isEmpty().withMessage("Value cannot be empty."),
  body("name").isString().withMessage("Input should be String.").not().isEmpty().withMessage("Value cannot be empty."),
  body("state").isString().withMessage("Input should be String.").not().isEmpty().withMessage("Value cannot be empty."),
  body("division").isString().withMessage("Input should be String.").not().isEmpty().withMessage("Value cannot be empty."),
  body("subdivisions").isArray().withMessage("Input should be an Array.").not().isEmpty().withMessage("Value cannot be empty."),
  body("subdivisions.*").isString().withMessage("Subdivision should be String."),
  body("blocks").isArray().withMessage("Input should be an Array.").not().isEmpty().withMessage("Value cannot be empty."),
  body("blocks.*").isString().withMessage("Block should be String."),
  body("area").isNumeric().withMessage("Input Should be Numeric.").not().isEmpty().withMessage("Value cannot be empty."),
  body("literacy").isNumeric().withMessage("Input Should be Numeric.").not().isEmpty().withMessage("Value cannot be empty."),
  body("sexRatio").isNumeric().withMessage("Input Should be Numeric.").not().isEmpty().withMessage("Value cannot be empty."),
  body("population").isNumeric().withMessage("Input Should be Numeric.").not().isEmpty().withMessage("Value cannot be empty."),
  body("officialWebsite").isURL().withMessage("Input should be URL String.").not().isEmpty().withMessage("Value cannot be empty."),
  body("censusYear").isNumeric().withMessage("Input Should be Numeric.").not().isEmpty().withMessage("Value cannot be empty."),
],
inputValidator.postDistrict, adminControllers.postDistrict);

/**
 * @openapi
 * paths:
 *  /admin/update/state/{state}:
 *   patch:
 *    tags: 
 *     - Admin
 *    summary: Update a State.
 *    description: Update/Modify a State.
 *    responses:
 *     201:
 *      description: Returns a JSON Object with Success Message.   
 *    security:
 *     - bearerAuth: []
 *    parameters:
 *     - in: path
 *       name: state
 *       description: Provide a State Name which should be updated. 
 *    requestBody:
 *     description: Some Properties may be required.
 *     required: true
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *          iso3166code:
 *            type: string
 *          code:
 *            type: string
 *          name:
 *            type: string
 *          capital:
 *            type: string
 *          largestCity:
 *            type: string
 *          divisions:
 *            type: array
 *            items:
 *             type: string
 *          blocks:
 *            type: integer
 *          subdivisions:
 *            type: integer
 *          districts:
 *            type: integer
 *          sexRatio:
 *            type: integer
 *          literacy:
 *            type: integer
 *          population:
 *            type: integer
 *          area:
 *            type: integer
 *          censusYear:
 *            type: integer
 *          officialWebsite:
 *            type: string
 *          languages:
 *            type: array
 *            items:
 *             type: string
 *          neighbours:
 *            type: array
 *            items:
 *             type: string   
 */
router.patch("/update/state/:state", isAuth,
[
  body("iso3166code").optional().isString().withMessage("Input should be String."),
  body("code").optional().isString().withMessage("Input should be String."),
  body("name").optional().isString().withMessage("Input should be String."),
  body("capital").optional().isString().withMessage("Input should be String."),
  body("largestCity").optional().isString().withMessage("Input should be String."),
  body("districts").optional().isNumeric().withMessage("Input Should be Numeric."),
  body("subdivisions").optional().isNumeric().withMessage("Input Should be Numeric."),
  body("blocks").optional().isNumeric().withMessage("Input Should be Numeric."),
  body("divisions").optional().isArray().withMessage("Input should be an Array.").not().isEmpty().withMessage("Value cannot be empty."),
  body("divisions.*").optional().isString().withMessage("Division should be String."),
  body("area").optional().isNumeric().withMessage("Input Should be Numeric."),
  body("literacy").optional().isNumeric().withMessage("Input Should be Numeric."),
  body("sexRatio").optional().isNumeric().withMessage("Input Should be Numeric."),
  body("population").optional().isNumeric().withMessage("Input Should be Numeric."),
  body("officialWebsite").optional().isURL().withMessage("Input should be URL String."),
  body("censusYear").optional().isNumeric().withMessage("Input Should be Numeric."),
  body("emblem").optional().isEmpty().withMessage("Emblem cannot be modified."),
  body("languages").optional().isArray().withMessage("Input should be an Array.").not().isEmpty().withMessage("Value cannot be empty."),
  body("languages.*").optional().isString().withMessage("Language should be String."),
  body("neighbours").optional().isArray().withMessage("Input should be an Array.").not().isEmpty().withMessage("Value cannot be empty."),
  body("neighbours.*").optional().isString().withMessage("Neighbour should be String."),
],
inputValidator.params, inputValidator.patchState, adminControllers.patchState);

/**
 * @openapi
 * paths:
 *  /admin/update/{state}/{district}:
 *   patch:
 *    tags: 
 *     - Admin
 *    summary: Update a District.
 *    description: Update/Modify a District.
 *    responses:
 *     200:
 *      description: Returns a JSON Object with Success Message.   
 *    security:
 *     - bearerAuth: []
 *    parameters:
 *     - in: path
 *       name: state
 *       description: Provide a State Name to which the District belong. 
 *       required: true
 *     - in: path
 *       name: district
 *       description: Provide a District Name to Update.
 *       required: true
 *    requestBody:
 *     description: Some properties may be Required.
 *     required: true
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *          districtCode:
 *            type: integer
 *          name:
 *            type: string
 *          state:
 *            type: string
 *          division:
 *            type: string
 *          subdivisions:
 *            type: array
 *            items:
 *             type: string
 *          blocks:
 *            type: array
 *            items:
 *             type: string
 *          area:
 *            type: integer
 *          sexRatio:
 *            type: integer
 *          literacy:
 *            type: integer
 *          population:
 *            type: integer
 *          censusYear:
 *            type: integer
 *          officialWebsite:
 *            type: string
 */
router.patch("/update/:state/:district", isAuth, 
[
  body("districtCode").optional().isNumeric().withMessage("Input Should be Numeric."),
  body("name").optional().isString().withMessage("Input should be String."),
  body("state").optional().isString().withMessage("Input should be String."),
  body("division").optional().isString().withMessage("Input should be String."),
  body("subdivisions").optional().isArray().withMessage("Input should be an Array.").not().isEmpty().withMessage("Value cannot be empty."),
  body("subdivisions.*").optional().isString().withMessage("Subdivision should be String."),
  body("blocks").optional().isArray().withMessage("Input should be an Array.").not().isEmpty().withMessage("Value cannot be empty."),
  body("blocks.*").optional().isString().withMessage("Block should be String."),
  body("area").optional().isNumeric().withMessage("Input Should be Numeric."),
  body("literacy").optional().isNumeric().withMessage("Input Should be Numeric."),
  body("sexRatio").optional().isNumeric().withMessage("Input Should be Numeric."),
  body("population").optional().isNumeric().withMessage("Input Should be Numeric."),
  body("officialWebsite").optional().isURL().withMessage("Input should be URL String."),
  body("censusYear").optional().isNumeric().withMessage("Input Should be Numeric."),
],
inputValidator.params, inputValidator.patchDistrict, adminControllers.patchDistrict);

/**
 * @openapi
 * paths:
 *  /admin/login:
 *   post:
 *    tags: 
 *     - Admin
 *    summary: Login to REST India API.
 *    description: Login to REST India to modify/edit data. Only Approved user can Login.
 *    responses:
 *     200:
 *      description: Returns a JSON Object with Auth Token.   
 *    requestBody:
 *     description: Send **POST** request with your **email** and **Password**.
 *     required: true
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        required:
 *          - email
 *          - password
 *        properties:
 *          email:
 *            type: string
 *          password:
 *            type: string
 */
router.post(
  "/login",
  [
    body("email").isEmail().normalizeEmail().not().isEmpty(), 
    body("password").not().isEmpty()
  ],
  adminAuthControllers.postLogin
);

/**
 * @openapi
 * paths:
 *  /admin/signup:
 *   post:
 *    tags: 
 *     - Admin
 *    summary: Signup to REST India API.
 *    description: Signup to REST INDIA to become admin user. Only Approved user can Login.
 *    responses:
 *     200:
 *      description: Returns a JSON Object with Success/Instruction message.   
 *    requestBody:
 *     description: Send **POST** request with mentioned Properties.
 *     required: true
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        required:
 *          - name
 *          - email
 *          - password
 *          - occupation
 *          - signupReason
 *        properties:
 *          name:
 *            type: string
 *          email:
 *            type: string
 *          password:
 *            type: string
 *          occupation:
 *            type: string
 *          signupReason:
 *            type: string
 */
router.post(
  "/signup",
  [
    body("email")
      .isEmail()
      .custom((value) => {
        return User.findOne({ email: value }).then((user) => {
          if (user) {
            return Promise.reject("Email already Exists!");
          }
        });
      })
      .normalizeEmail(),
    body("password")
      .trim()
      .isLength({ min: 5 })
      .withMessage("Password must be at least 5 chars long.")
      .matches(/\d/)
      .withMessage("Password must contain a number."),
    body("name").trim().not().isEmpty(),
    body("occupation").trim().not().isEmpty(),
    body("signupReason").trim().not().isEmpty(),
  ],
  adminAuthControllers.postSignup);

router.get("/verify-email/:userId/:verificationToken", adminAuthControllers.verifyEmail);
router.get("/approve-user/:userId/:approvalToken", adminAuthControllers.approveUser);

/**
 * @openapi
 * paths:
 *  /admin/reset-password/init:
 *   post:
 *    tags: 
 *     - Admin
 *    summary: Password Reset - Step 1.
 *    description: Initalize your Password Reset process.
 *    responses:
 *     200:
 *      description: Returns a JSON Object with Success/Instruction message.   
 *    requestBody:
 *     description: Send a **POST** request with your **email** to this endpoint.
 *     required: true
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        required:
 *          - email
 *        properties:
 *          email:
 *            type: string
 */
router.post("/reset-password/init", 
[
  body("email").isEmail().normalizeEmail().not().isEmpty(),
], 
adminAuthControllers.resetPasswordInit);

/**
 * @openapi
 * paths:
 *  /admin/reset-password/{userId}/{resetToken}:
 *   post:
 *    tags: 
 *     - Admin
 *    summary: Password Reset - Step 2.
 *    description: Reset your Password with Unique ResetToken
 *    responses:
 *     200:
 *      description: Returns a JSON Object with Success Message.
 *    parameters:
 *     - in: path
 *       name: userId
 *       description: Provide User Id.
 *       required: true
 *     - in: path
 *       name: resetToken
 *       description: Provide Unique Reset Token.
 *       required: true
 *    requestBody:
 *     description: Send a **POST** request with your **email** and **newPassword**.
 *     required: true
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        required:
 *          - email
 *          - newPassword
 *        properties:
 *          email:
 *            type: string
 *          newPassword:
 *            type: string
 */
router.post("/reset-password/:userId/:resetToken", 
[
  body("email").isEmail().normalizeEmail().not().isEmpty(),
  body("newPassword")
  .trim()
  .isLength({ min: 5 })
  .withMessage("Password must be at least 5 chars long.")
  .matches(/\d/)
  .withMessage("Password must contain a number.")
  .not().isEmpty()
  .withMessage("'newPassword' can not be Empty."),
], 
adminAuthControllers.resetPassword);


module.exports = router;
