const config = require('./config').default;
const normalizer = require('./normalizer').default;
const Papa = require('papaparse');
const fs = require('fs').promises;

const csv = process.argv[2];

const readCSV = async file => {
    const data = await fs.readFile(file);
    const parsed = Papa.parse(data.toString(), config).data;
    parsed.pop();
    const normalized = normalizer(parsed);
    console.log(Papa.unparse(normalized));
    return;
}


readCSV(csv);