import React, {useState} from "react";
import { connect } from "react-redux";
import "./css/homev2.css";
import logo from "./images/logo.svg";
import stravaButton from "./images/strava-connect.svg";
import { setActivities } from "../actions";
const { REACT_APP_CLIENT_ID } = process.env;
const redirectUrl = "https://fortpedallers.web.app/redirect";
// const redirectUrl = "https://localhost:3000/redirect";

const handleLogin = () => {
  window.location = `http://www.strava.com/oauth/authorize?client_id=${REACT_APP_CLIENT_ID}&response_type=code&redirect_uri=${redirectUrl}/exchange_token&approval_prompt=auto&scope=activity:read`;
};

const Home = ({ leaderboard,listItems }) => {

  const [selectedTeam,setTeam] = useState("All");
  var spidermanScore = 0;
  var captainAmericaScore = 0;
  var hulkScore = 0;
  var ironmanScore = 0;
  const randomEmoji = () => {
    const emojis = ["👏", "👍", "🙌", "🤩", "🔥", "⭐️", "🏆", "💯"];
    let randomNumber = Math.floor(Math.random() * emojis.length);
    return emojis[randomNumber];
  };

  if (leaderboard != null) {
    listItems = [];
    console.log("leaderboard value from firebase ", selectedTeam);
    var i = 1;
    leaderboard.forEach((member) => {
      if (selectedTeam === "All" || selectedTeam === member.data().team) {
        listItems.push(
          //  <li>{member.data().username}</li>
          <li className="c-list__item" key={member.data().id}>
            <div className="c-list__grid">
              <div className="c-flag c-place u-bg--transparent">{i}</div>
              <div className="c-media">
                <img className="c-avatar c-media__img" src={member.data().profile} alt="logo"/>
                <div className="c-media__content">
                  <div className="c-media__title">
                    {member.data().firstname} {member.data().lastname}
                  </div>
                  <a
                    className="c-media__link u-text--small"
                    href={
                      "https://www.strava.com/athletes/" + member.data().username
                    }
                    target="blank"
                  >
                    @{member.data().team}
                  </a>
                </div>
              </div>
              <div className="u-text--right u-text--small c-kudos">
                <div className="u-mt--8"><strong>{member.data().points} </strong>{randomEmoji()} </div>
              </div>
            </div>
          </li>
        );
      }
      if (member.data().team === "Spiderman") {
        spidermanScore += member.data().points
      }else if(member.data().team === "Captain America"){
        captainAmericaScore +=member.data().points
      }else if(member.data().team === "Hulk"){
        hulkScore +=member.data().points
      }else if(member.data().team === "Ironman"){
        ironmanScore +=member.data().points
      }
      i++;
    });

    function handleChange(e) {
      console.log(selectedTeam);
      setTeam(e.target.value);
      console.log("count values "+selectedTeam);
    }

    return (
      <div className="l-wrapper">
        <div className="c-header">
          <img src={logo} className="c-logo" alt="logo"/>
          <img src={stravaButton} className="c-strava-button" onClick={handleLogin} alt="logo"/>
        </div>
        <div>

          <div className="l-grid__item">
            <div className="c-card">
              <div className="c-card__header">
                <h3>Leaderboard</h3>
                <select className="c-select" onChange={handleChange}>
                  <option value="All">All</option>
                  <option value="Captain America">Captain America</option>
                  <option value="Hulk">Hulk</option>
                  <option value="Ironman">Ironman</option>
                  <option value="Spiderman">Spiderman</option>
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


<div className="box">

            <div className="one ">
            <div className="icon">
            <div className="deadpool">
            <div className="line"></div>
            <div className="eye-left">
            <div className="pupil-left"></div>
            </div>
            <div className="eye-right">
            <div className="pupil-right"></div>
            </div>
            </div><span className="u-text--small">{spidermanScore}</span>
            </div>
            </div>
            <div className="two">
            <div className="icon">
            <div className="captain-america">
            <div className="hat">
            <h1>A</h1>
            <div className="wings-left"></div>
            <div className="wings-right"></div>
            <div className="hat-left">
            <div className="eye">
            <div className="ball"></div>
            </div>
            </div>
            <div className="hat-right">
            <div className="eye">
            <div className="ball"></div>
            </div>
            </div>
            </div>
            <div className="mouth"></div>
            <div className="ears"></div>
            </div><span className="u-text--small">{captainAmericaScore}</span>
            </div>
            </div>
            <div className="three">
            <div className="icon">
            <div className="hulk">
            <div className="eyebrow-left"></div>
            <div className="eyeball">
            <div className="right"></div>
            </div>
            <div className="eyebrow-right"></div>
            <div className="teeth"></div>
            </div>
            <div className="hair">
            <div className="hair1"></div>
            <div className="hair2"></div>
            <div className="hair3"></div>
            <div className="hair4"></div>
            <div className="hair5"></div>
            <div className="hair6"></div>
            </div>
            <div className="green-ears"></div><span className="u-text--small">{hulkScore}</span>
            </div>
            </div>
            <div className="four">
            <div className="icon">
            <div className="ironman">
            <div className="mask">
            <div className="middle"></div>
            <div className="red-line"></div>
            <div className="yellow-line"></div>
            <div className="glowing-eyes"></div>
            </div>
            </div><span className="u-text--small">{ironmanScore}</span>
            </div>
            </div>





</div>


<div className="space_bottom"></div>





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
    listItems:[]
  };
};

export default connect(mapStateToProps, { setActivities })(Home);
