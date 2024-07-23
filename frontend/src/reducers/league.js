import {
    CREATE_LEAGUE,
    DELETE_LEAGUE,
    UPDATE_LEAGUE,

  } from "../actions/types";


  const initialState = [];

  function leagueReducer(league = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case CREATE_LEAGUE:
          return [...league, payload];
          case UPDATE_LEAGUE:
            return league.map((league) => {     
              if (league.id === payload.id) {
                return {
                  ...league,
                  ...payload,
                };
              } else {
                return league;
              }
            });
        case DELETE_LEAGUE:
            return league.filter(({ id }) => id !== payload.id);
          default:
            return league;
        }
      };

export default leagueReducer;