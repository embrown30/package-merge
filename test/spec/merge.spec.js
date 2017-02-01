
var fs = require('fs');
var path = require('path');
var merge = require('../../lib/merge');
var expect = require('chai').expect;

function fixture(name) {
	return require(path.resolve(__dirname, '..','fixtures', name+'.fixture.json'));
}

describe('#merge', function() {

	it('should output valid JSON', function() {
		var result = merge(
			fixture('complete'),
			fixture('dependencies')
		);
		expect(function() {
			JSON.parse(result);
		}).to.not.throw();
	});

	it('should merge dependencies correctly', function() {
		var result = JSON.parse(merge(
			fixture('complete'),
			fixture('dependencies')
		));

		expect(result.dependencies).to.have.property('express', '^5.0.0');
	});

	it('should work on emptiness', function() {
		var result = JSON.parse(merge(
			fixture('complete'),
			fixture('dependencies')
		));
		expect(result.dependencies).to.have.property('express', '^5.0.0');
	});

	it('should not merge scripts', function() {
		var result = JSON.parse(merge(
			fixture('complete'),
			fixture('dependencies'),
			['scripts', 'name']
		));
		expect(result.scripts.package).to.be.undefined
		expect(result.name).to.be.equal('module-name');
	});
});
