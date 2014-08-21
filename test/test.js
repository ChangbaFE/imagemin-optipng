'use strict';

var fs = require('fs');
var Imagemin = require('imagemin');
var optipng = require('../');
var path = require('path');
var test = require('ava');

test('optimize a PNG', function (t) {
	t.plan(4);

	var imagemin = new Imagemin()
		.src(path.join(__dirname, 'fixtures/test.png'))
		.use(optipng());

	imagemin.optimize(function (err, file) {
		t.assert(!err);

		fs.stat(imagemin.src(), function (err, stats) {
			t.assert(!err);
			t.assert(file.contents.length < stats.size);
			t.assert(file.contents.length > 0);
		});
	});
});
