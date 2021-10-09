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
				//const stravaAuthToken = "b1b094ad74becb69e8515ea78bba2883c87630f5";

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
				var points = 0
        queryActivities.forEach((activity) => {
          // doc.data() is never undefined for query doc snapshots
          totalDistance += activity.data().distance
					if (activity.data().type == "Ride" &&
						activity.data().manual == false &&
						activity.data().flagged == false) {
							var distanceInKm = activity.data().distance/1000
							if (distanceInKm >= 30 && distanceInKm < 50) {
								points += 100
							}else if(distanceInKm >= 50 && distanceInKm < 100){
								points += 250
							}else if(distanceInKm >= 100){
								points += 600
							}
					}
          console.log(activity.id, " => ", points);
        });
        console.log("total distance=>",totalDistance);
        await createLeaderboard(tokens.athlete,totalDistance,points)
        const leaderboard = await getLeadboard()
				leaderboard.forEach((member) => {
					console.log("leaderboard from redirect ",member.data().username);
				});
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
