import React from "react";
import { connect } from "react-redux";
import "./css/homev2.css";
import logo from './images/logo.svg';
import stravaButton from './images/strava-connect.svg';
const { REACT_APP_CLIENT_ID } = process.env;
const redirectUrl = "https://fortpedallerspalakkad.web.app/redirect";


const handleLogin = () => {
  window.location = `http://www.strava.com/oauth/authorize?client_id=${REACT_APP_CLIENT_ID}&response_type=code&redirect_uri=${redirectUrl}/exchange_token&approval_prompt=force&scope=activity:read`;
};

const Home = ({leaderboard}) => {
  var listItems = ""
  if (leaderboard != null) {
    console.log("leaderboard value from firebase ",leaderboard);
    // listItems = leaderboard.forEach((member) =>{
    //   console.log("loop get users ",member.data().username);
    // });
    listItems = leaderboard.forEach((member) =>
    <div class="c-list__grid">
      <div class="c-flag c-place u-bg--transparent">{member.data().id}</div>
      <div class="c-media">
        <img class="c-avatar c-media__img" src="{member.data().profile}" />
        <div class="c-media__content">
          <div class="c-media__title">{member.data().firstname+" "+member.data().lastname}</div>
          <a class="c-media__link u-text--small" href="https://strava.com/athlete/{member.data().username}" target="_blank">@{member.data().username}</a>
        </div>
      </div>
      <div class="u-text--right c-kudos">
        <div class="u-mt--8">
          <strong>{member.data().distance/1000}</strong> {randomEmoji()}
        </div>
      </div>
    </div>
    );
  }


  const randomEmoji = () => {
    const emojis = ['👏', '👍', '🙌', '🤩', '🔥', '⭐️', '🏆', '💯'];
    let randomNumber = Math.floor(Math.random() * emojis.length);
    return emojis[randomNumber];
  };

  return (
    <div class="l-wrapper">
       <div class="c-header">
          <img  src={logo} class="c-logo"/>
          <img src={stravaButton} class="c-strava-button" onClick={handleLogin}/>
       </div>
       <div class="l-grid">
          <div class="l-grid__item l-grid__item--sticky">
             <div class="c-card">
                <div class="c-card__body">
                   <div class="u-text--center" id="winner1">
                      <div class="u-text-small u-text--medium u-mb--16">Spiderman</div>
                      <img class="c-avatar c-avatar--lg" src={'https://www.formula1.com/content/dam/fom-website/drivers/D/DANRIC01_Daniel_Ricciardo/danric01.png.transform/2col-retina/image.png'}/>
                      <h3 class="u-mt--16">Daniel Ricciardo</h3>
                      <span class="u-text--teal u-text--small">Daniel Ricciardo</span>
                   </div>
                </div>
             </div>
          </div>
          <div class="l-grid__item">
             <div class="c-card">
                <div class="c-card__header">
                   <h3>Avengers Challenge</h3>
                   <select class="c-select">
                     <option selected="selected">All</option>
                     <option>Captain America</option>
                     <option>Hulk</option>
                     <option>Ironman</option>
                     <option>Spiderman</option>
                   </select>
                   </div>
                <div class="c-card__body">
                   <ul class="c-list" id="list">
                      <li class="c-list__item">
                         <div class="c-list__grid">
                            <div class="u-text--left u-text--small u-text--medium">Rank</div>
                            <div class="u-text--left u-text--small u-text--medium">Members</div>
                            <div class="u-text--right u-text--small u-text--medium"># Points</div>
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
};

const mapStateToProps = (state) => {
  return {
    leaderboard: state.activity
  };
};

export default connect(mapStateToProps)(Home);;
