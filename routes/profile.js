/*
API route for viewing profile page.
*/

const { User } = require('../src/database');

module.exports = (router) => {
	router.get('/profile', async (req, res) => {
		const { username } = req.query;

		// Find a user in database based on the username in the query
		const user_result = await User.findOne(
			{ username: username },
			'averageWPM racesCompleted racesWon createdAt'
		)
			.lean()
			.exec(function (err, user) {
				if (err) {
					console.log('Error finding user');
					console.log(err);
				} else {
					console.log('Successfully found user');
					res.json({ user });
				}
			});
	});
};
