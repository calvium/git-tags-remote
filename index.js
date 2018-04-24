const semver = require('semver');
const { exec } = require('child_process');

const lsRemoteTags = repo => new Promise((resolve, reject) => {
	exec(`git ls-remote --tags ${repo}`, (error, stdout, stderr) => {
		if (stderr) reject(stderr);
		resolve(stdout.toString().trim());
	});
});

const parseTags = (tags) => {
	const tagMap = new Map();
	tags.split('\n')
		.forEach((str) => {
			const ref = str.split(/\t/);
			tagMap.set(ref[1].split('/')[2].replace(/\^\{\}$/, ''), ref[0]);
		});
	return Array.from(tagMap.keys());
};

const filterTags = (tags) => {
	const tagsToFilter = parseTags(tags);
	return tagsToFilter
		.filter(arr => semver.valid(arr[0]))
		.sort((a, b) => semver.compare(a[0], b[0]))
		.reverse();
};

const get = repo => new Promise((resolve, reject) => {
	lsRemoteTags(repo)
		.then(tags => resolve(filterTags(tags)))
		.catch(err => reject(err));
});

const getAll = repo => new Promise((resolve, reject) => {
	lsRemoteTags(repo)
		.then(tags => resolve(parseTags(tags)))
		.catch(err => reject(err));
});

const latest = repo => new Promise((resolve, reject) => {
	getAll(repo)
		.then(tags => resolve(tags.reverse()[0]))
		.catch(err => reject(err));
});

module.exports = {
	get,
	getAll,
	latest,
};
