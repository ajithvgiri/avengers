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
				var team = ""
        queryActivities.forEach((activity) => {
          // doc.data() is never undefined for query doc snapshots
          totalDistance += activity.data().distance
					if (activity.data().type === "Ride" &&
						activity.data().manual === false &&
						activity.data().flagged === false) {
							var distanceInKm = activity.data().distance/1000
							if (distanceInKm >= 28 && distanceInKm < 48) {
								points += 100
							}else if(distanceInKm >= 48 && distanceInKm < 98){
								points += 250
							}else if(distanceInKm >= 98){
								points += 600
							}
					}
          console.log(activity.id, " => ", points);
        });
        console.log("total distance=>",totalDistance);

				// set team
				const spiderman = [
					65922603, // satheesh
					62413423, // ajithvgiri
					68304466, // partheepan
					65995278, // swaroop
					65880425, // ajay
					69384136, // riju
					47215811, // ramshad
					68972677, // sanu
					50277950, // umar
					51772417, // anand
				];
				const hulk = [
					50452223, // radhakrishnan
					33476105, // denny
					23004210, // nithin
					7101904, // aravind
					17940049, //reshma
					67671990, // deepu devdas
					67022845, //jibin
					75064084, // sreejith
					66701942, // shafeek
					74076217, // proshob
				];

				const captain_america = [
					72142981, // rivin
					62326382, // jishnu
					63859197, // afthab
					69443369, // drona
					62362117, // amritha
					40956538, // suraj
					72662812, // sulfikar
					72730690, // shanil
					65285806, // gowtham s
				];
				const ironman = [
					49763042, // ahammed hussain
					71856244, // joe
					71457550, // gowtham t
					70913181, // abu anas
					74462853, // gokul g
					64620208, // rohit
					79257862, // sunayna
					48736871, // ashiq ahammed
					72825921, // buniyamin
				];

			if (spiderman.includes(tokens.athlete.id)) {
						team = "Spiderman"
				}else if (hulk.includes(tokens.athlete.id)) {
						team = "Hulk"
				}else if (captain_america.includes(tokens.athlete.id)) {
						team = "Captain America"
				}else if (ironman.includes(tokens.athlete.id)) {
						team = "Ironman"
				}else {
						team = "Unknown"
				}

        await createLeaderboard(tokens.athlete,totalDistance,points,team)
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
