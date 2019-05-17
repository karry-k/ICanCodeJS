const $express = require('express');
const $mime = require('mime');
const $path = require('path');
const $process = require('process');

module.exports = ({ $$app, $$root, $$mode }) => {
	$$app.set('$express', $express);
	$$app.set('$mime', $mime);
	$$app.set('$path', $path);
	$$app.set('$process', $process);

	$$app.set('$$mode', $$mode);
	$$app.set('$$root', $$root);
};