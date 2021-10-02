import React from "react";
import "./css/homev2.css";
import logo from './images/logo.svg';
import stravaButton from './images/strava-connect.svg';
const { REACT_APP_CLIENT_ID } = process.env;
const redirectUrl = "https://localhost:3000/redirect";

const handleLogin = () => {
  window.location = `http://www.strava.com/oauth/authorize?client_id=${REACT_APP_CLIENT_ID}&response_type=code&redirect_uri=${redirectUrl}/exchange_token&approval_prompt=force&scope=activity:read`;
};

const Home = () => {
  return (
    // <div class="wrap">
    //   <img onClick={handleLogin} class="strava-connect" />
    //   <div class="inner">
    //     <div class="trees">
    //       <div class="left">
    //         <div class="tree tree-a">
    //           <div>
    //             <i></i>
    //           </div>
    //         </div>
    //         <div class="tree tree-b">
    //           <div>
    //             <i></i>
    //           </div>
    //         </div>
    //         <div class="tree tree-c">
    //           <div>
    //             <i></i>
    //           </div>
    //         </div>
    //         <div class="tree tree-d">
    //           <div>
    //             <i></i>
    //           </div>
    //         </div>
    //         <div class="tree tree-e">
    //           <div>
    //             <i></i>
    //           </div>
    //         </div>
    //       </div>
    //       <div class="right">
    //         <div class="tree tree-a">
    //           <div>
    //             <i></i>
    //           </div>
    //         </div>
    //         <div class="tree tree-b">
    //           <div>
    //             <i></i>
    //           </div>
    //         </div>
    //         <div class="tree tree-c">
    //           <div>
    //             <i></i>
    //           </div>
    //         </div>
    //         <div class="tree tree-d">
    //           <div>
    //             <i></i>
    //           </div>
    //         </div>
    //         <div class="tree tree-e">
    //           <div>
    //             <i></i>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //     <div class="building">
    //       <div class="middle"></div>
    //       <div class="bottom"></div>
    //       <div class="line"></div>
    //     </div>
    //     <div class="clouds">
    //       <div class="cloud a"></div>
    //       <div class="cloud b"></div>
    //     </div>
    //     <div class="cycling">
    //       <div class="legs">
    //         <div class="leg left">
    //           <i></i>
    //         </div>
    //         <div class="leg right">
    //           <i></i>
    //         </div>
    //       </div>
    //       <div class="main">
    //         <div class="head">
    //           <i class="helmet">
    //             <i class="dtl"></i>
    //           </i>
    //           <i class="face">
    //             <i class="dtl"></i>
    //           </i>
    //           <i class="glass"></i>
    //         </div>
    //         <div class="chest"></div>
    //         <div class="hand-wrap">
    //           <div class="hand left">
    //             <i class="top"></i>
    //             <i class="bottom"></i>
    //           </div>
    //           <div class="hand right">
    //             <i class="top"></i>
    //             <i class="bottom"></i>
    //           </div>
    //         </div>
    //       </div>
    //       <div class="bike">
    //         <div class="wheel"></div>
    //         <div class="handle-wrap">
    //           <div class="hand left"></div>
    //           <div class="hand right"></div>
    //           <div class="handle"></div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
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
                <div class="c-card__header" hidden>
                   <h3></h3>
                   <select class="c-select" hidden>
                     <option selected="selected">1 - October 31 2021</option>
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
                   </ul>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
};

export default Home;
