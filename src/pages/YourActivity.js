import React from "react";
import { connect } from "react-redux";

const YourActivity = ({ activity, user }) => {
  //   querySnapshot.forEach((doc) => {
  //   // doc.data() is never undefined for query doc snapshots
  //   console.log(doc.id, " => ", doc.data());
  // });

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
