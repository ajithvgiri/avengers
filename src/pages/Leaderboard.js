import React from "react";
import { connect } from "react-redux";
import "./css/homev2.css";

import { setActivities } from "../actions";
import { getLeadboard } from "../utils/functions";

class LeaderboardRedirect extends React.Component {
  componentDidMount() {
    const authenticate = async () => {
      const { history } = this.props;
      try {
        const leaderboard = await getLeadboard();
        leaderboard.forEach((member) => {
          console.log("leaderboard from redirect ", member.data().username);
        });
        this.props.setActivities(leaderboard);

        // Once complete, go to display page
        history.push("/home");
      } catch (error) {
        console.log("something went wrong from leaderboard" + error);
        history.push("/error");
      }
    };
    authenticate();
  }

  render() {
    return <div className="loading"> </div>;
  }
}

const mapStateToProps = (state) => {
  return {
    authTokenURL: state.authTokenURL,
  };
};

export default connect(mapStateToProps, {
  setActivities,
})(LeaderboardRedirect);
