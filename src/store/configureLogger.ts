declare let __DEV__: any;
import * as Immutable from 'immutable';
const createLogger = require('redux-logger');
const logger = createLogger({
    level: 'info',
    collapsed: true,
    predicate: (getState, action) => __DEV__ === true,
    stateTransformer: (state) => {
        let newState = {};
        for (var i of Object.keys(state)) {
            if (Immutable.Iterable.isIterable(state[i])) {
                newState[i] = state[i].toJS();
            } else {
                newState[i] = state[i];
            }
        };
        return newState;
    }
});

export default logger;
