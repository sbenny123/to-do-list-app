/**
 * 
 */

/**
 * Used to retrieve the static content like images in statics folder
 * @param {*} express 
 * @param {*} app 
 */
module.exports = function(express, app) {
	app.use("/statics", express.static("statics"));
};