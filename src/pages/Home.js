import React from "react";
import "./css/home.css";
const { REACT_APP_CLIENT_ID } = process.env;
const redirectUrl = "https://fortpedallerspalakkad.web.app/redirect";

const handleLogin = () => {
  window.location = `http://www.strava.com/oauth/authorize?client_id=${REACT_APP_CLIENT_ID}&response_type=code&redirect_uri=${redirectUrl}/exchange_token&approval_prompt=force&scope=activity:read,activity:write`;
};

const Home = () => {
  return (
    <div class="wrap">
      <img onClick={handleLogin} class="strava-connect" />
      <div class="inner">
        <div class="trees">
          <div class="left">
            <div class="tree tree-a">
              <div>
                <i></i>
              </div>
            </div>
            <div class="tree tree-b">
              <div>
                <i></i>
              </div>
            </div>
            <div class="tree tree-c">
              <div>
                <i></i>
              </div>
            </div>
            <div class="tree tree-d">
              <div>
                <i></i>
              </div>
            </div>
            <div class="tree tree-e">
              <div>
                <i></i>
              </div>
            </div>
          </div>
          <div class="right">
            <div class="tree tree-a">
              <div>
                <i></i>
              </div>
            </div>
            <div class="tree tree-b">
              <div>
                <i></i>
              </div>
            </div>
            <div class="tree tree-c">
              <div>
                <i></i>
              </div>
            </div>
            <div class="tree tree-d">
              <div>
                <i></i>
              </div>
            </div>
            <div class="tree tree-e">
              <div>
                <i></i>
              </div>
            </div>
          </div>
        </div>
        <div class="building">
          <div class="middle"></div>
          <div class="bottom"></div>
          <div class="line"></div>
        </div>
        <div class="clouds">
          <div class="cloud a"></div>
          <div class="cloud b"></div>
        </div>
        <div class="cycling">
          <div class="legs">
            <div class="leg left">
              <i></i>
            </div>
            <div class="leg right">
              <i></i>
            </div>
          </div>
          <div class="main">
            <div class="head">
              <i class="helmet">
                <i class="dtl"></i>
              </i>
              <i class="face">
                <i class="dtl"></i>
              </i>
              <i class="glass"></i>
            </div>
            <div class="chest"></div>
            <div class="hand-wrap">
              <div class="hand left">
                <i class="top"></i>
                <i class="bottom"></i>
              </div>
              <div class="hand right">
                <i class="top"></i>
                <i class="bottom"></i>
              </div>
            </div>
          </div>
          <div class="bike">
            <div class="wheel"></div>
            <div class="handle-wrap">
              <div class="hand left"></div>
              <div class="hand right"></div>
              <div class="handle"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
