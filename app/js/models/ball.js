/*global define*/
define([
	'underscore',
	'backbone'
], function (_, Backbone) {
	'use strict';

	var BallModel = Backbone.Model.extend({
		
		defaults: {
			title: '',
			ballNumber: 0,
			stopped: false
		},
		initialize: function() {

		},
		// Toggle the `stopped` state of this ball item.
		toggle: function () {
			this.save({
				stopped: !this.get('stopped')
			});
		}
	});

	return BallModel;
});
