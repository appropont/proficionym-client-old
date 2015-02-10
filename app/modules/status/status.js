define(['angular', 'react'], function (angular, React) {
	"use strict";
	console.log('React: ');
	console.log(React);
	var status = angular.module('status', ['react']);

	var Status = React.createClass({
		propTypes: {
			status: React.PropTypes.string.isRequired,
			totalCount: React.PropTypes.number.isRequired,
			processedCount: React.PropTypes.number.isRequired,
			availableCount: React.PropTypes.number.isRequired,
			registeredCount: React.PropTypes.number.isRequired,
			errorCount: React.PropTypes.number.isRequired
		},
		render: function() {
			/*return React.DOM.span( null,
				'Hello World ' + this.props.count
			);*/

			var detailsChildren = [];

			var coreStatus = React.DOM.div(
				{id: 'basic-status', className: 'col-xs-6 detail'},
				'Status: ' + this.props.status
			);

			detailsChildren.push(coreStatus);

			var extraStatus = React.DOM.div(
				{id: 'extra-status', className: 'col-xs-6 detail'},
				this.props.processedCount + ' of ' + this.props.totalCount
			);

			if(this.props.status === 'Processing') {
				detailsChildren.push(extraStatus);
			}

			var details = React.DOM.div(
				{id: 'details', className: 'clearfix'},
				detailsChildren
			);

			var availableCount = React.DOM.div(
				{id: 'available-count', className: 'count col-xs-4'}, 
				'Available: ' + this.props.availableCount
			);
			var registeredCount = React.DOM.div(
				{id: 'registered-count', className: 'count col-xs-4'}, 
				'Registered: ' + this.props.registeredCount
			);
			var errorCount = React.DOM.div(
				{id: 'error-count', className: 'count col-xs-4'}, 
				'Errors: ' + this.props.errorCount
			);

			var counts = React.DOM.div(
				{id: 'counts', className: 'clearfix'}, 
				[availableCount, registeredCount, errorCount]
			);

			return React.DOM.div({id: 'status'}, [details, counts]);

		}
	});


	status.value( "Status", Status );

	status.directive( 'status', function(reactDirective) {
		return reactDirective(Status);
	});

	return status;
});