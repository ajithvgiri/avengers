import React from "react";
import _ from "lodash";
import { connect } from "react-redux";

import { setUser, setUserActivities, setActivities } from "../actions";
import {
    cleanUpAuthToken,
    testAuthGetter,
    getUserData,
	getUserActivity,
	createUser,
  createActivities,
} from "../utils/functions";

class StravaRedirect extends React.Component {
    componentDidMount() {
        const authenticate = async () => {
            const { history, location } = this.props;
            try {
                // If not redirected to Strava, return to home
                if (_.isEmpty(location)) {
                    return history.push("/");
                }

                // Save the Auth Token to the Store (it's located under 'search' for some reason)
                const stravaAuthToken = cleanUpAuthToken(location.search);

                // Post Request to Strava (with AuthToken) which returns Refresh Token and and Access Token
                const tokens = await testAuthGetter(stravaAuthToken);
                this.props.setUser(tokens);
                const accessToken = tokens.access_token;
                const userID = tokens.athlete.id;

                // Axios request to get users info
                const user = await getUserData(userID, accessToken);
				const userActivities = await getUserActivity(userID, accessToken);
				await createUser(userID,tokens.athlete)
        await createActivities(userID,userActivities.data[0])
				this.props.setActivities(userActivities);
                this.props.setUserActivities(user);

                // Once complete, go to display page
                history.push("/youractivity");
            } catch (error) {
				console.log("something went wrong "+error);
                history.push("/");
            }
        };
        authenticate();
    }

    render() {
        return <div>Loading</div>;
    }
}

const mapStateToProps = (state) => {
    return { authTokenURL: state.authTokenURL };
};

export default connect(mapStateToProps, {
    setUserActivities,
    setUser,
	setActivities,
})(StravaRedirect);
