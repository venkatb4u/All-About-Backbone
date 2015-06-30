/*global require*/
'use strict';

require(["config"], function() {
  // Kick off the application.
	require([
		'backbone',
		'views/ballsView',
		'routers/router'
		], function (Backbone, BallsView, BallRouter) {
		
		new BallRouter(BallsView);
		Backbone.history.start();		
	});
});
