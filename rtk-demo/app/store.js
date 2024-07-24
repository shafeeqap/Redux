const configureStore = require("@reduxjs/toolkit").configureStore;
const reduxLogger = require('redux-logger');
const cakeReducer = require("../features/cake/cakeSlice");
const iceCreamReducer = require('../features/iceCream/iceCreamSlice');

const logger = reduxLogger.createLogger();

const store = configureStore({
  reducer: {
    cake: cakeReducer, // Add the cake reducer to the store
    iceCream: iceCreamReducer
  },
  middleware: (getDefualtMiddleware) => getDefualtMiddleware().concat(logger),
});

module.exports = store