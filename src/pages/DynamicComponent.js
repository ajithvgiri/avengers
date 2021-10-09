import React from "react";

export default function DynamicComponent({leaderboard}) {

  // listItems = leaderboard.forEach((member) =>{
  //   console.log("loop get users ",member.data().username);
  //   // <div class="c-list__grid">
  //   //   <div class="c-flag c-place u-bg--transparent">{member.data().id}</div>
  //   //   <div class="c-media">
  //   //     <img class="c-avatar c-media__img" src="{member.data().profile}" />
  //   //     <div class="c-media__content">
  //   //       <div class="c-media__title">{member.data().firstname+" "+member.data().lastname}</div>
  //   //       <a class="c-media__link u-text--small" href="https://strava.com/athlete/{member.data().username}" target="_blank">{member.data().username}</a>
  //   //     </div>
  //   //   </div>
  //   //   <div class="u-text--right c-kudos">
  //   //     <div class="u-mt--8">
  //   //       <strong>100</strong> {randomEmoji()}
  //   //     </div>
  //   //   </div>
  //   // </div>
  // });
  return leaderboard.forEach((member) => {
    console.log("loop get users from dynamic component",member.data().username);
    <div class="c-list__grid">
      <div class="c-flag c-place u-bg--transparent">{member.data().id}</div>
      <div class="c-media">
        <img class="c-avatar c-media__img" src="{member.data().profile}" />
        <div class="c-media__content">
          <div class="c-media__title">{member.data().firstname+" "+member.data().lastname}</div>
          <a class="c-media__link u-text--small" href="https://strava.com/athlete/{member.data().username}" target="_blank">{member.data().username}</a>
        </div>
      </div>
      <div class="u-text--right c-kudos">
        <div class="u-mt--8">
          <strong>100</strong>
        </div>
      </div>
    </div>
  });

  const mapStateToProps = (state) => {
    return {
      leaderboard: state.activity
    };
  };

}
