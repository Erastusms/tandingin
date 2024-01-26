import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//import crudService from "../services/TutorialService";
import crudService from "../services/crudService";

const initialState = [];

export const createLeague = createAsyncThunk(
  "league/create",
  async ({ name,quota,startDate,endDate,prize,isLocked, description }) => {
    const res = await crudService.create({ name,quota,startDate,endDate,prize,isLocked, description });
    return res.data;
  }
);

// export const retrieveTutorials = createAsyncThunk(
//   "tutorials/retrieve",
//   async () => {
//     const res = await crudService.getAll();
//     return res.data;
//   }
// );

// export const updateTutorial = createAsyncThunk(
//   "tutorials/update",
//   async ({ id, data }) => {
//     const res = await crudService.update(id, data);
//     return res.data;
//   }
// );

// export const deleteTutorial = createAsyncThunk(
//   "tutorials/delete",
//   async ({ id }) => {
//     await crudService.remove(id);
//     return { id };
//   }
// );

// export const deleteAllTutorials = createAsyncThunk(
//   "tutorials/deleteAll",
//   async () => {
//     const res = await crudService.removeAll();
//     return res.data;
//   }
// );

// export const findTutorialsByTitle = createAsyncThunk(
//   "tutorials/findByTitle",
//   async ({ title }) => {
//     const res = await crudService.findByTitle(title);
//     return res.data;
//   }
// );

const crudSlice = createSlice({
  name: "league",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(createLeague.fulfilled, (state, action) => {
      state.push(action.payload);
    })
    // [retrieveLeague.fulfilled]: (state, action) => {
    //   return [...action.payload];
    // },
    // [updateTutorial.fulfilled]: (state, action) => {
    //   const index = state.findIndex(tutorial => tutorial.id === action.payload.id);
    //   state[index] = {
    //     ...state[index],
    //     ...action.payload,
    //   };
    // },
    // [deleteTutorial.fulfilled]: (state, action) => {
    //   let index = state.findIndex(({ id }) => id === action.payload.id);
    //   state.splice(index, 1);
    // },
    // [deleteAllTutorials.fulfilled]: (state, action) => {
    //   return [];
    // },
    // [findTutorialsByTitle.fulfilled]: (state, action) => {
    //   return [...action.payload];
    // },
  },
});

const { reducer } = crudSlice;
export default reducer;