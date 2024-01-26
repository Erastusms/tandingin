import {
    CREATE_LEAGUE,
    DELETE_LEAGUE

  } from "../actions/types";


  const initialState = [];

  function leagueReducer(league = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case CREATE_LEAGUE:
          return [...league, payload];
        case DELETE_LEAGUE:
            return league.filter(({ id }) => id !== payload.id);
          default:
            return league;
        }
      };


      export default leagueReducer;