import React from "react";
import { connect } from "react-redux";

const ErrorScreen = ({ activity, user }) => {
  return (
    <div>
      <h1>Shit happened !, I will not fix this</h1>
      <img src={'https://i.pinimg.com/originals/4c/50/4b/4c504bf6c18b1a1c64b69553e938e355.jpg'}/>
    </div>
  );
};
export default connect()(ErrorScreen);
