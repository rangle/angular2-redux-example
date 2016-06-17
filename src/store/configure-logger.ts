import { Iterable } from 'immutable';
const createLogger = require('redux-logger');

declare const __DEV__: boolean; // from webpack

const logger = createLogger({
    level: 'info',
    collapsed: true,
    predicate: (getState, action) => __DEV__ === true,
    stateTransformer: (state) => {
        let newState = {};
        for (let i of Object.keys(state)) {
            if (Iterable.isIterable(state[i])) {
                newState[i] = state[i].toJS();
            } else {
                newState[i] = state[i];
            }
        };
        return newState;
    }
});

export default logger;
