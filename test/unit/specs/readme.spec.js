const path = require('path');
const firstline = require('firstline');

describe('README.md', () => {
	it('Should have been updated for new project.', (done) => {
		firstline(path.resolve(__dirname, '../../../README.md')).then(text => {
			expect(text === '# YFS Vue Scaffolding').toBeFalsy();
			done();
		});
	});
});
