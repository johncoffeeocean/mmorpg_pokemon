/*
API route to handle getting excerpts from database
*/

const { Excerpt } = require('../src/database');

module.exports = (router) => {
	// Returns a collection of 10 random excerpts
	router.get('/excerpts', async (req, res) => {
		const excerpts = await Excerpt.aggregate().sample(10).exec();
		console.log(excerpts);
		res.json({ excerpts });
	});

	// Returns a single random excerpt
	router.get('/excerpt', async (req, res) => {
		const excerpt = await Excerpt.aggregate().sample(1).exec();
		console.log(excerpt);
		res.json({ excerpt });
	});
};
