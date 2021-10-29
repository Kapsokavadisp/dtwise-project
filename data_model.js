const { readFileSync } = require('fs');

let loadData = () => JSON.parse(readFileSync('data.json'));

module.exports = { loadData };
