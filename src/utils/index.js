export const fetchDestUrl = ({srcLo, srcLa}, {destLo, destLa}) => {
    return (`https://api.mapbox.com/directions/v5/mapbox/walking/${srcLo},${srcLa};${destLo},${destLa}?steps=true&geometries=polyline&access_token=secret`)
}

export const fetchNameUrl = (name)=> {
    return (`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(name)}.json?access_token=secret`)
}

export const debounce = (func, delay) => {
    let isDebounced = undefined;
    return (...args) => {
        clearTimeout(isDebounced);
        return isDebounced = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    }
}