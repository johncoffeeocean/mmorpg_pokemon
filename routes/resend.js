/*
API route for resending a verification email.
*/

const crypto = require('crypto');
const sgMail = require('@sendgrid/mail');

const { AccountToken, User } = require('../src/database');

module.exports = (router) => {
	router.post('/resend', async (req, res) => {
		const { username, email } = req.body;

		console.log('in resend: ', username, email);

		User.findOne({ username: username, email: email }, async function (
			err,
			user
		) {
			// Check for invalid user
			if (!user) {
				return res.status(400).send({ msg: 'Unable to find the user.' });
			}

			// If the user is already verified, no need to resend verification email
			if (user.isVerified) {
				return res
					.status(400)
					.send({ msg: 'The account has already been verified.' });
			}

			// Create a new accountToken using crypto library
			const accountToken = await AccountToken.create({
				userId: user._id,
				token: crypto.randomBytes(16).toString('hex'),
			});

			// Setup email template
			const msg = {
				// For testing
				// to: 'kirkwong33@gmail.com',
				to: email,
				from: 'typedash.register@gmail.com',
				subject: 'Typedash Account Verification Resend',
				html:
					'Hello ' +
					username +
					',' +
					'<br><br>' +
					'Please verify your account by clicking the link: <br>' +
					// for testing
					// 'http://localhost:3000' +
					// for production
					'http://typedash.live' +
					'/verify/' +
					accountToken.token +
					'<br><br>' +
					'Thank you for your interest in playing Typedash. We hope that you enjoy your time here! <br><br>' +
					'Cheers,<br>' +
					'Typedash Team',
			};

			// Use SendGrid API to send email
			sgMail.send(msg).then(
				(response) => {
					console.log('Email successfully sent!');
					res.status(200).send({ msg: 'Email was re-sent' });
				},
				(error) => {
					console.error(error);

					if (error.response) {
						console.error(error.response.body);
					}

					res.status(500).send({
						msg:
							'Server error: Unable to resend token. Please try again later.',
					});
				}
			);
		});
	});
};
