const generateFixture = (array, LeagueId) => {
    const fixtureArray = [];
    const category = ['home', 'away'];
    let matches = {};
    let k = 0;

    // sementara di komen
    //   for (let day = 0; day < array.length; day++) {
    //     for (let j = 0; j < array[day].length; j++) {
    //         matches.name = `MatchDay ${day + 1 + k}`
    //         matches.teamA = array[day][j][0]
    //         matches.teamB = array[day][j][1]
    //         matches.LeagueId = LeagueId
    //         fixtureArray.push(matches)
    //         matches = {}
    //         k++;
    //     }
    //     k--;
    // }

    for (let day = 0; day < array.length; day++) {
        for (let j = 0; j < array[day].length; j++) {
            for (let last = 0; last < array[day][j].length; last++) {
                matches.name = `MatchDay ${day + 1 + k}`;
                matches.LeagueId = LeagueId;
                matches.status = 'Not Played';
                fixtureArray.push(matches);
                matches = {};
            }
            k++;
        }
        k--;
    }
    return fixtureArray;
};

const generateMatchDay = (array, fixtures) => {
    const fixtureArray = [];
    const category = ['home', 'away'];
    let matches = {};
    // let k = 0;
    let k = 0;

    // sementara di komen
    //   for (let day = 0; day < array.length; day++) {
    //     for (let j = 0; j < array[day].length; j++) {
    //         matches.name = `MatchDay ${day + 1 + k}`
    //         matches.teamA = array[day][j][0]
    //         matches.teamB = array[day][j][1]
    //         matches.LeagueId = LeagueId
    //         fixtureArray.push(matches)
    //         matches = {}
    //         k++;
    //     }
    //     k--;
    // }

    for (let day = 0; day < array.length; day++) {
        for (let j = 0; j < array[day].length; j++) {
            // for (let index = 0; index < fixtures.length; index++) {
            for (let last = 0; last < array[day][j].length; last++) {
                // matches.FixtureId = fixtures[index].id;
                matches.TeamId = array[day][j][last];
                matches.status = 'Not Played';
                matches.category = category[last];
                fixtureArray.push(matches);
                matches = {};
            }
            // }
            // k++;
        }
        // k--;
    }
    
    // Fixture Generator Done

    for (let fix = 0; fix < fixtures.length; fix++) {
        for (let index = 0; index < category.length; index++) {
            fixtureArray[index + fix + k].FixtureId = fixtures[fix].id
        }
        k++;
    }
    return fixtureArray;
};


module.exports = {
    generateFixture, generateMatchDay
};
