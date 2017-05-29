var express = require('express');
var router = express.Router();
var models  = require('../models');
var shuffle = require('shuffle-array');

router.post('/range/:start/:end', function(req, res, next) {
	
	models.incidents.findAll( { where: { DateAndTime: { gte: req.params.start.replace("_", " "), lte: req.params.end.replace("_", " ") } } } ).then( function(incidents) {
		 
		res.render('json_render', { data: JSON.stringify(shuffle(incidents)) });
		 
	});

});

router.post('/individual/:id', function(req, res, next) {
	
	models.incident_details.findAll( { where: { foreign_key: req.params.id } } ).then( function(incident_details) {
		 
		res.render('json_render', { data: JSON.stringify(incident_details) });
		 
	});

});

router.post('/updated', function(req, res, next) {
	
	models.last_grab.findAll().then( function(last_grab) {
		
		res.render('json_render', { data: JSON.stringify(last_grab) });
		 
	});

});

module.exports = router;
