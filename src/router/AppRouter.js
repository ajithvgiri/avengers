import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "../pages/Home";
import LeaderboardRedirect from "../pages/Leaderboard";
import StravaRedirect from "../pages/StravaRedirect";
import YourDistance from "../pages/YourDistance";
import YourActivity from "../pages/YourActivity";
import ErrorScreen from "../pages/ErrorScreen";

class AppRouter extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div className="main">
                    <Switch>
                        <Route path="/" component={LeaderboardRedirect} exact={true} />
                        <Route path="/home" component={Home} />
                        <Route path="/redirect" component={StravaRedirect} />
                        <Route path="/yourdistance" component={YourDistance} />
						            <Route path="/youractivity" component={YourActivity} />
                        <Route path="/error" component={ErrorScreen} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}
export default AppRouter;
