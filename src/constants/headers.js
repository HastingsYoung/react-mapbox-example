export const HEADERS_CONTENT_TYPE_JSON = (headers = new Headers()) => {
    headers.append('Content-Type', 'application/json');
    return headers;
}