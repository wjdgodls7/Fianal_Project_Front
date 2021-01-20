import React from "react";
import PropTypes from "prop-types";
import { Route, Switch } from "react-router-dom";
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
    </Switch>
);

const LoggedOutRoutes = () => (
    <Switch>
        <Route exact path="/" component={Auth} />
    </Switch>
);

const AppRouter = ({ isLoggedIn }) => {
    return (
        isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />
    );
}

AppRouter.propTypes = {
    isLoggedIn: PropTypes.string.isRequired
};

export default AppRouter;