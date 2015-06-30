/*global define*/
define([
	'jquery',
	'underscore',
	'handlebars',
	'backbone',
	'text!templates/rulesHandlebar.html',
	'common'
], function ($, _, Handlebar, Backbone, ruleTemplate, Common) {
	'use strict';

		var RulesView = Backbone.View.extend({
			className: "gameRules animated duration2s delay1s tada",
			
		    events: {
		      'mouseover button.startTheGame': 'expandTheButton',
		      'mouseout button.startTheGame': 'releaseTheButton',
		      'click button.startTheGame': 'startGame'
		     },

		    template: Handlebars.compile(ruleTemplate),  // template using underscore.js

		    initialize: function(router){
		      this.router = router;
		      this.gameRules = "Click anywhere on the window, and destroy the objects which run on the screen, within specified time limit...The more u create &amp; destroy, the more u get points. You quit when u fail to destroy any within the time limit. GOOD LUCK. ";
		    },
		    render: function(){
		      $(this.el).html(this.template({
		      	title: "Instructions",
		      	rule:this.gameRules,
		      	buttonText: "Start"
		      }));
		      return this;
		    },

		    startGame: function(e){
		          $(this.el).remove();
			      this.router.navigate("#routeTo/start", {trigger: true});
			      console.log('Adding #routeTo/start to the URL to start the game');	
			      e.preventDefault();
		    },
		    expandTheButton: function(e){
		      $(e.target).addClass("animated duration3s animateAlways rubberBand");	
		      e.preventDefault();
		    },
		    releaseTheButton: function(e){
		      $(e.target).removeClass("animated duration3s animateAlways rubberBand");	
		      e.preventDefault();
		    }
		});


	return RulesView;
});
