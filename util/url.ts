function onlyPathname(href: string) {
    return new URL(href, 'http://localhost').pathname;
}

export {
    onlyPathname
}