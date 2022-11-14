# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

# Tips to help you to build React-Redux App and to build same project.

## Using FOR CSS STYLE  TO GET THE LINK TO ADD AT INDEX.HTML IN REACT FOLDER insert the below link
### You can find the link here https://cdnjs.com/libraries/semantic-ui

https://semantic-ui.com/views/comment.html


### Link: <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css"
/>


## CONSTRUCTOR FUNCTIONS TO HANDLE ERROR MESSAGE

class App extends React.Component {
  //constructor func only job is update the state object.//
  constructor(props) {
    super(props);
    this.state = { lat: null, errMassage: ''}
  }

  //This line is equivalent the constructor function.//
  state = { lat: null, errMassage: ''}
=====================================================nd CORS errors
In 
## Handling Icons Not Loading the upcoming lecture, we will be adding some font icons from the Semantic UI library.

There is a CDN bug that some students are hitting where the icons will no longer load and throw a CORS error after changing the browser's location sensors. Another student finally discovered the reason here.

The CDN.js docs add the integrity and crossorigin parameters to your script by default, which is breaking when we change the location sensors.

Change the script to look like this:

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css" />

Stop the server and close your browser (if you miss fully closing the browser the error will persist). Then, restart your server.

If this does not resolve your issue, you can also choose to install the CSS library locally:

npm install semantic-ui-css

Then, import the library into your root index.js component:

import "semantic-ui-css/semantic.min.css";

<i className={` this for icon size=> massive this is for the icon name=> ${icon} this for class name=>  icon`}></i>

==========================================================================
## Axios handles network requests in a very predictable fashion.
But Farfetch has a couple of corner cases that are really just not great to work with.
THE EASY WAY TO FETCH DATA FROM API 

### yarn add axios 

=============================================================
## yarn add lodash 
import lodash at index actions file

### import _ from "lodash"
=============================================================

# Redux-Form

Important Note about Redux Form Installation
Installation
### yarn add redux-form

In the upcoming lecture, we will be installing Redux Form into our application. If you are using the latest Node v15 and npm v7 releases, this will fail with the following error:

code ERESOLVE

npm ERR! ERESOLVE unable to resolve dependency tree

This is caused by some fairly significant breaking changes NPM is making, which can read about here:

https://blog.npmjs.org/post/626173315965468672/npm-v7-series-beta-release-and-semver-majory

If you are using NPM, you'll need to run this command instead:

npm install redux-form --legacy-peer-deps

If you are using Yarn, no further changes will be needed and you can install as you would typically:

yarn add redux-form

Note - Do not mix the use of yarn and npm in the same project, this will cause some serious dependency conflicts.

React Final Form

We highly recommend finishing the Streaming / Twitch Clone project in Sections 23 to 26 with Redux Form so that you fully understand how everything fits together as shown in the lectures. The migration to Final Form is fairly simple in regards to the completed project code and can be found in this supplemental lecture note here:

https://www.udemy.com/course/react-redux/learn/lecture/26637172#questions


========================================================================================
## History Object Deprecation Warning
In the next lecture we are going to be creating our history object. As of React Router DOM v4.4.0 you will get a warning in your console:

Warning: Please use `require("history").createBrowserHistory` instead of `require("history/createBrowserHistory")`. Support for the latter will be removed in the next major release.

To fix, our history.js file should instead look like this:

import { createBrowserHistory } from 'history'; 
export default createBrowserHistory();


if you want to go back to another route use history 

import history from '../history'


#### use this: onClick={()=> history.push('/')} 

<div onClick={()=> history.push('/')} className="ui dimmer modals visible active">

if u clicked anywhere will go back to the previous page

but if you want to stop this action use in same render in the div after the div of  history.push:

#### onClick={(e)=> e.stopPropagation()}/
=====================================================================
# SERVER SIDE

Modern React with Redux
RTMP NodeMediaServer is not a constructor error fix
In the next lecture we will install the Node Media Server package and create our RTMP server. Our index.js needs a slight modification to the import for v.2.1.0

https://github.com/illuspas/Node-Media-Server#npm-version-recommended

Instead of:

const { NodeMediaServer } = require('node-media-server');
we need to change the import to this:

const NodeMediaServer = require('node-media-server');
npm version (recommended)
mkdir nms
cd nms
npm install node-media-server  or yarn add node-media-server/
vi app.js
const NodeMediaServer = require('node-media-server');

const config = {
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60
  },
  http: {
    port: 8000,
    allow_origin: '*'
  }
};

var nms = new NodeMediaServer(config)
nms.run();
node app.js
================================================================

## Refactor to use React Final Form instead of Redux Form

Here is the refactored code for the Streams project to replace Redux Form with React Final Form. The main updates will only need to be with the StreamForm component and a small update to the combineReducers function. The rest of the application will remain unchanged.

Official migration guide for more details:

https://final-form.org/docs/react-final-form/migration/redux-form

Install React Final Form

npm install final-form react-final-form
reducers/index.js

import { combineReducers } from "redux";
 
import authReducer from "./authReducer";
import streamReducer from "./streamReducer";
 
export default combineReducers({
  auth: authReducer,
  streams: streamReducer,
});
StreamForm component

import React from "react";
import { Form, Field } from "react-final-form";
 
const StreamForm = (props) => {
  const renderError = ({ error, touched }) => {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  };
 
  const renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {renderError(meta)}
      </div>
    );
  };
 
  const onSubmit = (formValues) => {
    props.onSubmit(formValues);
  };
 
  return (
    <Form
      initialValues={props.initialValues}
      onSubmit={onSubmit}
      validate={(formValues) => {
        const errors = {};
 
        if (!formValues.title) {
          errors.title = "You must enter a title";
        }
 
        if (!formValues.description) {
          errors.description = "You must enter a description";
        }
 
        return errors;
      }}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit} className="ui form error">
          <Field name="title" component={renderInput} label="Enter Title" />
          <Field
            name="description"
            component={renderInput}
            label="Enter Description"
          />
          <button className="ui button primary">Submit</button>
        </form>
      )}
    />
  );
};
 
export default StreamForm;
Resources for this lecture


## Learn More
### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

