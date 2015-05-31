/*global define*/
define([
	'jquery',
	'underscore',
	'handlebars',
	'backbone',
	'collections/balls',
	'text!templates/ballUnderscore.html',
	'text!templates/ballHandlebar.html',
	'common'
], function ($, _, Handlebar, Backbone, Balls, ballUnderscore, ballHandlebar, Common) {
	'use strict';

	var singleBallView = Backbone.View.extend({

			//template: _.template(ballUnderscore),  //template handling using Underscore
			template: Handlebars.compile(ballHandlebar), //template handling using Handlebar

		    tagName: 'div', 
		    className: 'ball',

		    objTop: 0,
		    objLeft: 0,

		    initialize: function(){
		    	var ballCount = 0, selfInitialize = this;
		    	
				this.maxHt = window.innerHeight-50;
				this.maxWd = window.innerWidth-50;
				this.elementTop = $(this.el).offset().top;
				this.elementLeft = $(this.el).offset().left;
				this.objTop = 0;
				this.objLeft = 0;
				this.listenTo(this.model, 'destroy', this.remove);
		     // _.bindAll(this, 'render'); // every function that uses 'this' as the current object should be in here
		    },

		    events: {
			'click' : 'stopTheBall',
			'dblclick' : 'destroyTheBall'
			},

		    render: function(){
		     var ballCount = this.model.get('ballNumber'), selfRender = this, xRotateThreshold = true, yRotateThreshold = true;
		     selfRender.objTop = this.model.get('ballPosition').x;
			 selfRender.objLeft = this.model.get('ballPosition').y;
		     var renderedBall = $(this.el).html(this.template({ballC:ballCount})).css({'left':selfRender.objLeft, 'top':selfRender.objTop});
			 $(renderedBall).addClass('animateSoon rotateIn');
		     
		     this.inter = setInterval(function () {
		     	
												selfRender.objTop+=25;
												selfRender.objLeft+=25;

												if(selfRender.objTop>selfRender.maxHt)  {
													selfRender.elementTop=selfRender.maxHt-(selfRender.objTop-selfRender.maxHt);
													// if(yRotateThreshold) {
													// 	$(selfRender.el).toggleClass('rotateIn rotateInReverse');
													// 	yRotateThreshold = false;
													// } 
												}
												else{
													selfRender.elementTop=selfRender.objTop;
												}  
												$(selfRender.el).css('top', selfRender.elementTop + "px");
												if(selfRender.objTop>2*selfRender.maxHt) {
													selfRender.objTop=0;
													$(selfRender.el).toggleClass('rotateIn rotateInReverse');
													yRotateThreshold = true;
													
												}
												if(selfRender.objLeft>selfRender.maxWd) {
													selfRender.elementLeft=selfRender.maxWd-(selfRender.objLeft-selfRender.maxWd);
													// if(xRotateThreshold) {
													// 	$(selfRender.el).toggleClass('rotateIn rotateInReverse');
													// 	xRotateThreshold = false;
														
													// } 
												}
												else {
													selfRender.elementLeft=selfRender.objLeft;
												} 
												$(selfRender.el).css('left', selfRender.elementLeft + "px");
												if(selfRender.objLeft>2*selfRender.maxWd) {
													selfRender.objLeft=0;
													$(selfRender.el).toggleClass('rotateIn rotateInReverse');
													xRotateThreshold = true;

												}

											},Math.floor(Math.random()*300));
			 return this; // for chainable calls, like .render().el
		    },
		   
			stopTheBall : function (e) {
				clearInterval(this.inter);
				this.model.set('stopped', true);
				$('.stoppedValue').text(this.collection.stopped().length);
				$('.talkBack').text("'stopped' property of Model "+ this.model.get('ballNumber') + " has been changed.");
				return false;
			},
			destroyTheBall : function (e) {
				console.log(this.collection.remaining(), 'are the models running');
				$('.talkBack').text("Model  " + this.model.get('ballNumber') + " has been destroyed. ");
				this.collection.remove(this.model);
				this.model.destroy();
				e.stopPropagation();
			},
			remove : function (e) {   // Data binding -  whenever model is deleted/destroyed, DOM elem also gets removed.
				$(this.el).remove();
			}
			
	});

	return singleBallView;
});
