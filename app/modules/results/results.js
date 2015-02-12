define(['angular', 'react'], function (angular, React) {
	'use strict';
	console.log('React: ');
	console.log(React);
	var results = angular.module('results', ['react']);

	var Results = React.createClass({
		propTypes: {
			available: React.PropTypes.array.isRequired,
			registered: React.PropTypes.array.isRequired,
			error: React.PropTypes.array.isRequired
		},
		render: function() {

			console.log('results render');

			var elements = [];

			var heading = React.DOM.h2({}, 'Available Domains');
			elements.push(heading);

			if(!this.props.available.length) {
				var message = '';
				if(this.props.error.length && !this.props.registered.length) {
					message = 'All whois lookup results were errors. You may have lost your internet connection or the API server may be down.';
				} else {
					message = 'No available domains found.';
				}
				elements.push(React.DOM.p({className: 'results-error'}, message));
			} else {
				//I seem to be missing the point of the array/key message that react is throwing
				var domains = {};
				this.props.available.forEach(function(domain) {
					domains[domain.domain] = React.DOM.li({key: domain.domain, className: 'list-group-item domain'}, domain.domain);
				});

				var domainList = React.DOM.ul({id: 'domain-list', className: 'list-group'}, 
					domains
				);
				elements.push(domainList);
			}

			return React.DOM.div({id: 'results'}, elements);

		}
	});


	results.value( 'Results', Results );

	results.directive( 'results', function(reactDirective) {
		return reactDirective(Results);
	});

	return results;
});