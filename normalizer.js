const momentTZ = require('moment-timezone');
const moment = require('moment');

const normalizer = csv => {
    for (let row of csv) {
        if (Object.keys(row).length > 1) {
            let date = new Date(row['Timestamp']).toISOString();
            let westDate = momentTZ.tz(date, 'America/Los_Angeles');
            let eastDate = westDate.clone().tz('America/New_York');
            row['Timestamp'] = eastDate.format();

            if (row['ZIP'].length < 5) row['ZIP'] = `0${row['ZIP']}`;

            row['FullName'] = row['FullName'].toUpperCase();

            let foo = moment.duration(row['FooDuration']).asSeconds();
            let bar = moment.duration(row['BarDuration']).asSeconds();
            row['TotalDuration'] = foo + bar;
        }
    };

    return csv;
}

exports.default = normalizer;