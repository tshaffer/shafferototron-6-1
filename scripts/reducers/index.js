import {combineReducers} from 'redux';
import PhotosReducer from './reducer_photos';
import TagsReducer from './reducer_tags';
import ActivePhoto from './reducer_active_photo';
import SelectedPhotos from './reducer_selected_photos';
import AlbumsReducer from './reducer_albums';

const rootReducer = combineReducers({
    photos: PhotosReducer,
    tags: TagsReducer,
    activePhoto: ActivePhoto,
    selectedPhotos: SelectedPhotos,
    albums: AlbumsReducer
});

export default rootReducer;
