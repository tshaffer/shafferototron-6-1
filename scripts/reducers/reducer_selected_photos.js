/**
 * Created by tedshaffer on 5/7/16.
 */
export default function(state = null, action) {
    switch (action.type) {
        case 'SELECTED_PHOTOS_UPDATED':
            console.log("reducer_selected_photos:: SELECTED_PHOTOS_UPDATED");
            return action.payload;
    }

    return state;
}