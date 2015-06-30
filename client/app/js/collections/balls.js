/*global define*/
define([
	'underscore',
	'backbone',
	'backboneLocalstorage',
	'models/ball'
], function (_, Backbone, Store, Ball) {
	'use strict';

	var BallsCollection = Backbone.Collection.extend({
		// Reference to this collection's model.
		model: Ball,

		// Save all of the Ball items under the `"Balls-backbone"` namespace.
		localStorage: new Store('Balls-backbone'),

		// Filter down the list of all Ball items that are stopped.
		stopped: function () {
			return this.filter(function (Ball) {
				return Ball.get('stopped');
			});
		},

		// Filter down the list to only Ball items that are still not destroyed.
		remaining: function () {
			return this.without.apply(this, this.stopped());
		}
	
	});

	return  BallsCollection;
});
