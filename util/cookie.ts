const cookie: Cookie = {
    getAll() {
        const cookies = document.cookie.split('; ').reduce((obj, token) => {
            const nameValue = token.split('=');
            
            return {
                ...obj,
                [nameValue[0]]: nameValue.slice(1).join('=')
            }
        }, {}) as Json;

        return cookies;
    },
    get(name: string, _default?: string) {
        return this.getAll()[name] || _default;
    },
    set(
        name: string,
        value: string,
        duration: number,
        path?: string
    ) {
        const date = new Date();
        date.setDate(date.getTime() + duration);

        const expires = date.toUTCString();

        document.cookie = `${name}=${value}; expires=${expires}; path=${path || '/'}`;
    }
}

export default cookie;