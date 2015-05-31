/*global define*/
define([
	'jquery',
	'underscore',
	'backbone',
	'models/ball',
	'collections/balls',
	'views/ballView',
	'text!templates/ballUnderscore.html',
	'common'
], function ($, _, Backbone, BallModel, BallCollection, BallView, ballTemplate, Common) {
	'use strict';

		var AppView = Backbone.View.extend({
		    el: '#bounceApp', // el attaches to existing element
		    events: {
		      'click': 'addBall'
		     },
		    template: _.template(ballTemplate),  // template using underscore.js
		    initialize: function(){
		      _.bindAll(this, 'render', 'addBall', 'appendBall'); // every function that uses 'this' as the current object should be in here
		      var destroyCount = 0;
		      this.collection = new BallCollection();
		      this.collection.bind('add', this.appendBall); // collection event binder
		      this.collection.bind('remove', function (){
		      	$('.destroyedValue').text(++destroyCount);
		      });
		      this.counter = 0;
		      this.render();
		    },
		    render: function(){
		      var self = this;
		      $(this.el).css('height',function(){ return (window.innerHeight + 'px');});
		      _(this.collection.models).each(function(ball){ // in case collection is not empty
										        self.appendBall(ball);
										      }, this);
		    },
		    addBall: function(e){
		      this.counter++;
		      var ball = new BallModel();
		      ball.set({
		        ballNumber: ball.get('ballNumber') + this.counter,// modify ball defaults
		        ballPosition: {
		        	'x':e.pageX,
		        	'y':e.pageY
		        }
		      });
		      this.collection.add(ball);
		      $('.runningValue').text(this.collection.models.length);
		      $('.talkBack').text("Model "+ ball.get('ballNumber') + " has been created.");
		      e.preventDefault();
		    },
		    appendBall: function(ball){
		      var ballView = new BallView({
		        model: ball,
		        collection: this.collection
		      });
		      $(this.el).append(ballView.render().el);
		     }
		});


	return AppView;
});
