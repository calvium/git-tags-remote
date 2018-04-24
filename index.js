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
	return new Map([...tagMap.entries()]);
};

const filterTags = parseTags(tags)
		.filter(arr => semver.valid(arr[0]))
		.sort((a, b) => semver.compare(a[0], b[0]))
		.reverse();

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
	get(repo)
		.then(tags => resolve(tags.entries().next().value))
		.catch(err => reject(err));
});

module.exports = {
	get,
	getAll,
	latest,
};
