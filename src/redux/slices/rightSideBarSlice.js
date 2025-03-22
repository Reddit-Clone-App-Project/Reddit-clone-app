import { createSlice } from "@reduxjs/toolkit";
import { mockSubreddit } from "../../mock/mockData";

const initialState = {
    rightSideBar: mockSubreddit,
};

const rightSideBarSlice = createSlice({
    name: 'rightSideBar',
    initialState,
    reducers: {}
});

export default rightSideBarSlice.reducer;