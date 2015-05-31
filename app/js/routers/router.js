/*global define*/
define([
	'jquery',
	'backbone',
	'collections/balls',
	'views/rulesView',
	'common'
], function ($, Backbone, Balls, Rules, Common) {
	'use strict';

	var BallRouter = Backbone.Router.extend({
		initialize : function (BallsView) {
			this.ballsView = BallsView;
			this.timer = 31;
		},
		routes: {
			 '' : 'defaultRoute',
			'routeTo/:start': 'startTheGame'
		},
		defaultRoute: function (param) {
			console.log('Welcome ',Common.AUTHOR.name, Common.AUTHOR.empId);
			console.log('Home Page routed successfully');

			$('#bounceApp').html(new Rules(this).render().el);  // seperate view for Game Rules
			
		},
		startTheGame: function (param) { // gets triggered when #routeTo/start is appended to browser URL
			console.log('Page routed successfully to ', param);
			var self = this,
				canvas = new this.ballsView();
				// ,			
				// inter = setInterval(function (){
				// 	$('.timerValue').text(--self.timer);
				// },1000); 
			$('.talkBack').text("Here we go...");
			setTimeout(function(){
				clearInterval(inter);
				$('.timerValue').text('Time Out');
				$('#bounceApp').empty();
				if(($('.destroyedValue').text() === $('.runningValue').text()) && $('.runningValue').text() !== '') {
					alert("Congratulations... You've completed Level 1");
				}
				else {
					alert("Oops...Sorry, Time out. You've failed to destroy the rest. Better luck next time.");
					
				}
				self.navigate("", {trigger: true});
				$('.destroyedValue, .timerValue, .stoppedValue, .runningValue').text('');
			},(this.timer * 10000000000000));

		}
	});

	return BallRouter;
});
