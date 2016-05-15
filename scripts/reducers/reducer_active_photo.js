/**
 * Created by tedshaffer on 5/1/16.
 */
// State argument is not application state, only the state
// this reducer is responsible for
export default function(state = null, action) {
    switch (action.type) {
        case 'PHOTO_SELECTED':
            return action.payload;
    }

    return state;
}