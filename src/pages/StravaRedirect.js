import React from "react";
import _ from "lodash";
import {
	connect
} from "react-redux";
import "./css/homev2.css";

import {
	setUser,
	setUserActivities,
	setActivities
} from "../actions";
import {
	cleanUpAuthToken,
	testAuthGetter,
	getUserData,
	getUserActivity,
	createUser,
	createActivities,
  getUsersFromFirebase,
  getUserActivityWithID,
  createLeaderboard,
  getLeadboard
} from "../utils/functions";

class StravaRedirect extends React.Component {
	componentDidMount() {
		const authenticate = async () => {
			const {
				history,
				location
			} = this.props;
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
				await createUser(userID, tokens.athlete);
				await createActivities(userActivities);
        const queryActivities = await getUserActivityWithID(userID)
        var totalDistance = 0
        queryActivities.forEach((activity) => {
          // doc.data() is never undefined for query doc snapshots
          totalDistance += activity.data().distance
          console.log(activity.id, " => ", activity.data().distance," =>",
          activity.data().average_speed," => ",activity.data().elapsed_time,
          activity.data().manual," => ",activity.data().max_speed,
          activity.data().moving_time," => ",activity.data().private,
          activity.data().visibility," => ",activity.data().type,
          activity.data().start_date_local," => ",activity.data().flagged,
          activity.data().name
        );
        });
        console.log("total distance=>",totalDistance);
        await createLeaderboard(tokens.athlete,totalDistance)
        const leaderboard = await getLeadboard()
				this.props.setActivities(leaderboard);
				this.props.setUserActivities(user);

				// Once complete, go to display page
				history.push("/");
			} catch (error) {
				console.log("something went wrong " + error);
				history.push("/error");
			}
		};
		authenticate();
	}

	render() {
		return <div class = "loading" > < /div>;
	}
}

const mapStateToProps = (state) => {
	return {
		authTokenURL: state.authTokenURL
	};
};

export default connect(mapStateToProps, {
	setUserActivities,
	setUser,
	setActivities,
})(StravaRedirect);
