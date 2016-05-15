/**
 * Created by tedshaffer on 5/4/16.
 */

import { FETCH_TAGS } from '../actions/index';

export default function(state = [], action) {
    
    switch (action.type) {
        case FETCH_TAGS:
            return action.payload.data.Tags;
    }

    return state;
}
