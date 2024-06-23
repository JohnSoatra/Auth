function queryString({ search, update }: {search?: string, update?: { [key: string]: string }}) {
    let _queryString = {} as Json;

    if (window) {
        new URLSearchParams(search !== undefined ? search : window.location.search).forEach((value, key) => {
            _queryString[key] = value;
        });

        if (update) {
            for (let key in update) {
                _queryString[key] = update[key];
            }
        }
    }

    return Object.keys(_queryString)
        .reduce((query, key) => query += `${key}${_queryString[key] ? '=' + _queryString[key] : ''}&`, '?')
        .slice(0, -1);
}

export default queryString;