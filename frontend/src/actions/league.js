import {

    CREATE_LEAGUE,
    SET_MESSAGE,
    DELETE_LEAGUE,
    UPDATE_LEAGUE,

  } from "./types";
  
import leagueService from "../services/leagueService";
  
  export const createLeague = (name,quota,startDate,endDate,prize,isLocked, description,file,key) => async (dispatch) => {
    try {
      const res = await leagueService.create({ name,quota,startDate,endDate,prize,isLocked, description,file,key});
      dispatch({
        type: CREATE_LEAGUE,
        payload: res.data,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: res.data,
      });
  
      return Promise.resolve(res. data);
    } catch (err) {

    return Promise.reject(err);
  };
};
export const deleteLeague = (id) => async (dispatch) => {
  try {
    await leagueService.remove(id);

    dispatch({
      type: DELETE_LEAGUE,
      payload: { id },
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateLeague = (id, data) => async (dispatch) => {
  try {
    const res = await leagueService.update(id, data);

    dispatch({
      type: UPDATE_LEAGUE,
      payload: data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};