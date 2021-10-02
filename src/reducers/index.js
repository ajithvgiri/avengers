import { combineReducers } from "redux";

const setUserReducer = (tokens = null, action) => {
    switch (action.type) {
        case "SET_USER":
            return action.payload;
        default:
            return tokens;
    }
};

const setUserActivitiesReducer = (user = null, action) => {
    if (action.type === "SET_USER_ACTIVITIES") {
        return action.payload;
    }
    return user;
};

const setActivitiesReducer = (activity = null, action) => {
	console.log("action type"+action.type);
    if (action.type === "SET_ACTIVITIES") {
        return action.payload;
    }
    return activity;
};

export default combineReducers({
    returnTokens: setUserReducer,
    user: setUserActivitiesReducer,
	activity: setActivitiesReducer
});
