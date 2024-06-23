const Routes = {
    Login: (from: string) => `/login?from=${from}`,
    Admin: '/admin',
    User: '/user',
    Denied: '/403',
    Home: '/',
}

export default Routes;