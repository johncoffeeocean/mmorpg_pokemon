/*
API route for verification of an account after receiving a verification email link. 
*/

const { AccountToken, User } = require('../src/database');

module.exports = (router) => {
	router.post('/verify', async (req, res) => {
		console.log('verifying: ', req.body);
		AccountToken.findOne({ token: req.body.token }, function (err, token) {
			// Check if there is a valid token in the request body (the url)
			if (!token) {
				return res.status(400).send({
					msg:
						'We were unable to find a valid token. Your token may have expired.',
				});
			}

			User.findOne({ _id: token.userId, email: req.body.email }, function (
				err,
				user
			) {
				// Check if the user is valid
				if (!user) {
					return res
						.status(400)
						.send({ msg: 'Unable to find a user for this token.' });
				}

				// If the user is already verified, return
				if (user.isVerified) {
					return res
						.status(400)
						.send({ msg: 'The account has already been verified.' });
				}

				// Set the account to a Verified status
				user.isVerified = true;
				user.save(function (err) {
					if (err) {
						return res.status(500).send({ msg: err.message });
					}
					res.status(200).send('Account has been verified!');
				});
			});
		});
	});
};
