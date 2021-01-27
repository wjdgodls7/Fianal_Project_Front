import React from "react";
import PropTypes from "prop-types";
import { Route, Switch, Redirect } from "react-router-dom";
import Auth from "../Routes/Auth";
import Feed from "../Routes/Feed";
import Explore from "../Routes/Explore";
import Profile from "../Routes/Profile/index";
import Search from "../Routes/Search/index";
const LoggedInRoutes = () => (
    <Switch>
        <Route exact path="/" component={Feed} />
        <Route exact path="/explore" component={Explore} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/:username" component={Profile} />
        <Redirect from="*" to="/" />
    </Switch >
);

const LoggedOutRoutes = () => (
    <Switch>
        <Route exact path="/" component={Auth} />
        <Redirect from="*" to="/" />
    </Switch>
);

const AppRouter = ({ isLoggedIn }) => {
    return (
        isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />
    );
}

AppRouter.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired
};

export default AppRouter;