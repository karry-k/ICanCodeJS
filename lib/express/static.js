module.exports = ({ $$app }) => {
	const $express = $$app.get('$express');
	const $mime = $$app.get('$mime');
	const $path = $$app.get('$path');
	const $$root = $$app.get('$$root');
	const options = {
		dotfiles: 'ignore',
		etag: true,
		index: false,
		redirect: true,
		maxAge: 1000 * 60 * 60 * 24,
		setHeaders: (res, path, stat) => {
			// console.log(1, path);
			res.set('Content-Type', $mime.getType(path));
			res.set('I-CAN-CODE', true);
		},
		fallthrough: true,
	};
	const path = $path.resolve( $$root, 'static' );

	$$app.use( $express.static( path, options ) );

	// $$app.all('*', async ( req, res ) => {
	// 		console.log(2, req.url);		
	// });
};