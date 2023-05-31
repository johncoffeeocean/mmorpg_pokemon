/*
API route for handling account login
*/

const rateLimit = require('express-rate-limit');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const { User } = require('../src/database');

module.exports = (router) => {
	router.post(
		'/login',

		// Limit to 20 requests per hour
		rateLimit({
			windowMS: 60 * 60 * 1000,
			max: 20,
		}),
		[
			check('username').isString().isLength({ min: 3, max: 32 }),
			check('password').isString().isLength({ min: 5, max: 256 }),
		],
		async (req, res) => {
			const errors = validationResult(req);

			// If there are validation errors, return
			if (!errors.isEmpty()) {
				return res.status(422).send({ msg: 'Incorrect username or password' });
			}

			const { username, password } = req.body;

			// Find a user in database based on the username given
			const user = await User.findOne(
				{ username },
				'_id username passwordHash isVerified'
			)
				.lean()
				.exec();

			// If the user can't be found, return
			if (!user) {
				return res.status(404).send({ msg: 'Incorrect username or password' });
			}

			// Compare the passwordHash with the password using bcrypt
			const isMatch = await bcrypt.compare(password, user.passwordHash);
			if (!isMatch) {
				return res.status(403).send({ msg: 'Incorrect username or password' });
			}

			// If the user complete email verification yet, return
			if (!user.isVerified) {
				return res
					.status(401)
					.send({ msg: 'Your account has not been verified.' });
			}

			const token = jwt.sign(
				{
					userId: user._id,
				},
				secret
			);

			delete user.passwordHash;
			res.json({
				token,
				user,
			});
		}
	);
};
