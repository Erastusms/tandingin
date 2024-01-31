const generateFixture = (array, LeagueId) => {
  const fixtureArray = [];
  let matches = {};
  let k = 0;

  for (let day = 0; day < array.length; day++) {
    for (let j = 0; j < array[day].length; j++) {
      for (let last = 0; last < array[day][j].length; last++) {
        matches.name = `MatchDay ${day + 1 + k}`;
        matches.LeagueId = LeagueId;
        matches.status = 'Not Played';
        matches.TeamId = array[day][j][last];
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

const generateMatchDay = (fixtureArray, fixtures) => {
  const category = ['home', 'away'];
  let k = 0;

  for (let fix = 0; fix < fixtures.length; fix++) {
    for (let index = 0; index < category.length; index++) {
      fixtureArray[index + fix + k].FixtureId = fixtures[fix].id;
      fixtureArray[index + fix + k].category = category[index];
    }
    k++;
  }

  return fixtureArray.map(({ name, LeagueId, ...rest }) => ({ ...rest }));
};

module.exports = {
  generateFixture, generateMatchDay
};
