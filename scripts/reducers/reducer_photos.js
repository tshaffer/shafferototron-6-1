/**
 * Created by tedshaffer on 5/1/16.
 */
import { FETCH_PHOTOS } from '../actions/index';

export default function(state = [], action) {

    switch (action.type) {
        case FETCH_PHOTOS:
            return action.payload.data.photos;
    }

    // switch (action.type) {
    //     case 'PHOTOS_UPDATED':
    //         return action.payload;
    // }

    // if (state == null) {
    //     return [
    //         { dbId: '1', url: "testPhotos/New Orleans/IMG_1624.JPG", thumbUrl: "testPhotos/New Orleans/IMG_1624_thumb.JPG", orientation: 6, title: "IMG_1624.JPG", height: 108, width: 108, dateTaken: "1/1/2016 03:33 am", tagList: [] },
    //         { dbId: '1', url: "testPhotos/New Orleans/IMG_1625.JPG", thumbUrl: "testPhotos/New Orleans/IMG_1625_thumb.JPG", orientation: 6, title: "IMG_1625.JPG", height: 108, width: 108, dateTaken: "1/1/2016 04:33 am", tagList: [] },
    //         { dbId: '1', url: "testPhotos/New Orleans/IMG_1627.JPG", thumbUrl: "testPhotos/New Orleans/IMG_1627_thumb.JPG", orientation: 1, title: "IMG_1627.JPG", height: 108, width: 108, dateTaken: "1/1/2016 05:33 am", tagList: [] },
    //         { dbId: '1', url: "testPhotos/New Orleans/IMG_1628.JPG", thumbUrl: "testPhotos/New Orleans/IMG_1628_thumb.JPG", orientation: 6, title: "IMG_1628.JPG", height: 108, width: 108, dateTaken: "1/1/2016 06:33 am", tagList: [] },
    //     ];
    // }

    return state;
}
