
import { createSlice } from "@reduxjs/toolkit";
import { HomePageState } from "../../../lib/types/screen";

const initialState: HomePageState = {
    freshArrivals: [],
    newDishes: [],
    topUsers: [],
}

const homePageSlice = createSlice({
    name: "homePage",
    initialState,
    reducers: {
        setFreshArrivals: (state, action) => {
            state.freshArrivals = action.payload
        },
        setNewDishes: (state, action) => {
            state.newDishes = action.payload
        },
        setTopUsers: (state, action) => {
            state.topUsers = action.payload
        }
    },
})

export const {setFreshArrivals, setNewDishes, setTopUsers} = homePageSlice.actions

const HomePageReducer = homePageSlice.reducer
export default HomePageReducer