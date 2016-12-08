/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* eslint-disable max-len */
/* jscs:disable maximumLineLength */
export const port = process.env.PORT || 3000;
export const host = process.env.WEBSITE_HOSTNAME || `localhost:${port}`;
//Just hardcode more shit for now


// THIS WILL BE AN EMPTY OBJECT HERE.
// IT WILL BE AVAILABLE IN THE CODE THOUGH
// IF YOU DONT BELIEVE ME DO A CONSOLE LOG IN CLIENT JS OF THE CONST environment
console.log(process);

export const environment = process.env.NODE_ENV;

// export const backend = process.env.BACKEND_URI || 'http://cerebro-be.herokuapp.com/';
export const backend = process.env.BACKEND_URI || 'http://cerebro-be.herokuapp.com/';


export const analytics = {
    // https://analytics.google.com/
    google: { trackingId: process.env.GOOGLE_TRACKING_ID || 'UA-XXXXX-X' },

};

export const auth = {

    jwt: { secret: process.env.JWT_SECRET || '' },

    // https://developers.facebook.com/
    facebook: {
        id: process.env.FACEBOOK_APP_ID,
        secret: process.env.FACEBOOK_APP_SECRET
    },

    // https://cloud.google.com/console/project
    google: {
        id: process.env.GOOGLE_CLIENT_ID,
        secret: process.env.GOOGLE_CLIENT_SECRET
    },

    // https://apps.twitter.com/
    twitter: {
        key: process.env.TWITTER_CONSUMER_KEY,
        secret: process.env.TWITTER_CONSUMER_SECRET
    },

};
