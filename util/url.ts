function onlyPathname(href: string) {
    return new URL(href, 'http://localhost:3000').pathname;
}

export {
    onlyPathname
}