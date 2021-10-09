import React from "react";
import { connect } from "react-redux";
import _ from "lodash";
import "./css/homev2.css";
import logo from "./images/logo.svg";
import stravaButton from "./images/strava-connect.svg";
import { getLeadboard } from "../utils/functions";
import { setActivities } from "../actions";
const { REACT_APP_CLIENT_ID } = process.env;
const redirectUrl = "https://fortpedallers.web.app/redirect";
// const redirectUrl = "https://localhost:3000/redirect";

const handleLogin = () => {
  window.location = `http://www.strava.com/oauth/authorize?client_id=${REACT_APP_CLIENT_ID}&response_type=code&redirect_uri=${redirectUrl}/exchange_token&approval_prompt=auto&scope=activity:read`;
};

const Home = ({ leaderboard }) => {
  const randomEmoji = () => {
    const emojis = ["👏", "👍", "🙌", "🤩", "🔥", "⭐️", "🏆", "💯"];
    let randomNumber = Math.floor(Math.random() * emojis.length);
    return emojis[randomNumber];
  };

  var listItems = [];
  if (leaderboard != null) {
    console.log("leaderboard value from firebase ", leaderboard);
    var i = 1;
    leaderboard.forEach((member) => {
      listItems.push(
        //  <li>{member.data().username}</li>
        <li className="c-list__item" key={member.data().id}>
          <div className="c-list__grid">
            <div className="c-flag c-place u-bg--transparent">{i}</div>
            <div className="c-media">
              <img className="c-avatar c-media__img" src={member.data().profile} />
              <div className="c-media__content">
                <div className="c-media__title">
                  {member.data().firstname} {member.data().lastname}
                </div>
                <a
                  className="c-media__link u-text--small"
                  href={
                    "https://www.strava.com/athletes/" + member.data().username
                  }
                  target="_blank"
                >
                  @{member.data().username}
                </a>
              </div>
            </div>
            <div className="u-text--right u-text--small c-kudos">
              <div className="u-mt--8"><strong>{member.data().points} Pts </strong>{randomEmoji()} </div>
            </div>
          </div>
        </li>
      );
      i++;
    });

    return (
      <div className="l-wrapper">
        <div className="c-header">
          <img src={logo} className="c-logo" />
          <img src={stravaButton} className="c-strava-button" onClick={handleLogin} />
        </div>
        <div>

          <div className="l-grid__item">
            <div className="c-card">
              <div className="c-card__header">
                <h3>Avengers Challenge</h3>
                <select className="c-select">
                  <option value="all">All</option>
                  <option>Captain America</option>
                  <option>Hulk</option>
                  <option>Ironman</option>
                  <option>Spiderman</option>
                </select>
              </div>
              <div className="c-card__body">
                <ul className="c-list" id="list">
                  <li className="c-list__item">
                    <div className="c-list__grid">
                      <div className="u-text--left u-text--small u-text--medium">
                        Rank
                      </div>
                      <div className="u-text--left u-text--small u-text--medium">
                        Members
                      </div>
                      <div className="u-text--right u-text--small u-text--medium">
                        # Points
                      </div>
                    </div>
                  </li>
                  {listItems}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }else {
    return window.location.href="/";
  }
};

const mapStateToProps = (state) => {
  return {
    leaderboard: state.activity,
  };
};

export default connect(mapStateToProps, { setActivities })(Home);
