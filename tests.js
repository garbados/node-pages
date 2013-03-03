var FlatPages = require('./main.js')
	, assert = require('assert')
	, Pages;

var tests = {
	// tests that creating the object completes without error
	// but does not assert functionality
	completion: function(){
		Pages = new FlatPages({
			root: __dirname,
			folder: 'pages'
		});
	},
	// tests that both pages loaded
	has_pages: function(){
		assert.equal(Object.keys(Pages.files).length, 2);
	},
	// tests that Pages, and the files therein, have all the right properties
	interfaces: function(){
		// get
		for(path in Pages.files){
			var page = Pages.get(path);
			['path', 'body', 'html'].forEach(function(attr){
				assert.equal(typeof page[attr], typeof '');
			});
			assert.equal(typeof page.meta, typeof {});
		}
		// reload
		Pages.reload();
		// all
		Pages.all();
	}
}

// init Pages
tests.completion();
// run the rest of the tests after pages have loaded
setTimeout(function(){
	tests.has_pages();
	tests.interfaces();
}, 1000);