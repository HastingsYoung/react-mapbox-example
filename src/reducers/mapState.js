import * as TYPES from '../constants';

const initialState = {
    isLoading: false,
    routes: [],
    data: [],
    query: {},
    initialRegion: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    },
}

export const mapState = (state = initialState, action) => {
    switch (action.type) {
        case TYPES.MAP_FETCH_SELF_LOC:
            return Object.assign({}, state, {
                isLoading: true,
            });
        case TYPES.MAP_FETCH_SELF_LOC_SUCC:
            return Object.assign({}, state, {
                isLoading: false,
                initialRegion: Object.assign({
                    latitudeDelta: state.initialRegion.latitudeDelta,
                    longitudeDelta: state.initialRegion.longitudeDelta,
                }, action.data)
            });
        case TYPES.MAP_FETCH_SELF_LOC_ERR:
            return Object.assign({}, state, {
                isLoading: false,
            });
        case TYPES.MAP_EDITING:
            return Object.assign({}, state, {
                isLoading: true,
            });
        case TYPES.MAP_EDIT_COMPLETE:
            return Object.assign({}, state, {
                isLoading: false,
                data: action.data,
            });
        case TYPES.MAP_QUERY_SELECTED:
            return Object.assign({}, state, {
                data: [],
                query: action.data,
            });
        case TYPES.MAP_FETCH_ROUTE:
            return Object.assign({}, state, {
                isLoading: true,
            });
        case TYPES.MAP_FETCH_ROUTE_SUCC:
            return Object.assign({}, state, {
                isLoading: false,
                routes: action.data,
            });
        case TYPES.MAP_FETCH_ROUTE_ERR:
            return Object.assign({}, state, {
                isLoading: false,
            });
        default:
    }
    return state;
}
