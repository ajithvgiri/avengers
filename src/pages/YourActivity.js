import React from "react";
import { connect } from "react-redux";

const YourActivity = ({ activity, user }) => {
  return (
    <div>
      <h1>Hi, {user.athlete.firstname} !</h1>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    activity: state.activity,
    user: state.returnTokens,
  };
};

export default connect(mapStateToProps)(YourActivity);
