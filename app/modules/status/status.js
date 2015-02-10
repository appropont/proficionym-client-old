define(['angular', 'react'], function (angular, React) {
	"use strict";
	console.log('React: ');
	console.log(React);
	var status = angular.module('status', ['react']);

	var Hello = React.createClass({
		propTypes: {
			fname: React.PropTypes.string.isRequired,
			lname: React.PropTypes.string.isRequired,
			count: React.PropTypes.number.isRequired,

		},
		render: function() {
			return React.DOM.span( null,
				'Hello World ' + this.props.count
			);
		}
	});

	status.value( 'Hello', Hello );

	status.directive( 'hello', function(reactDirective) {
		return reactDirective(Hello);
	});

	return status;
});