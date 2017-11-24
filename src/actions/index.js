import * as TYPES from '../constants';

export const fetchSelfLocation = () => {
    return (dispatch) => {
        dispatch({type: TYPES.MAP_FETCH_SELF_LOC});
    }
}

export const fetchSelfLocationSucc = (location) => {
    return {
        type: TYPES.MAP_FETCH_SELF_LOC_SUCC,
        data: location,
    }
}

export const fetchSelfLocationErr = (error) => {
    return {
        type: TYPES.MAP_FETCH_SELF_LOC_ERR,
        data: error,
    }
}

export const fetchMapRoute = () => {
    return (dispatch) => {
        dispatch({type: TYPES.MAP_FETCH_ROUTE});
    }
}

export const fetchMapRouteSucc = (data) => {
    return {
        type: TYPES.MAP_FETCH_ROUTE_SUCC,
        data: data,
    }
}

export const fetchMapRouteErr = (error) => {
    return {
        type: TYPES.MAP_FETCH_ROUTE_ERR,
        data: error,
    }
}

export const editing = () => {
    return {
        type: TYPES.MAP_EDITING
    }
}

export const editComplete = (data) => {
    return {
        type: TYPES.MAP_EDIT_COMPLETE,
        data: data,
    }
}

export const querySelected = (data) => {
    return {
        type: TYPES.MAP_QUERY_SELECTED,
        data: data,
    }
}