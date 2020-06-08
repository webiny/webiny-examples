import React from 'react';
import { App } from './';
import { Switch, Route } from 'react-router';

const Main = () => {
    return (
        <Switch>
            <Route exact path='/' component={App} />
        </Switch>
    );
};

export default Main;