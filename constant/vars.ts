import Routers from "./routes";

const Vars = {
    Expire: {
        // Access_Token: 5 * 60, // 5 minutes
        Access_Token: 5,
        Refresh_Token: 2 * 7 * 24 * 60 * 60, // 2 week
    },
    AuthPath: [
        {
            path: '/',
            role: 'user'
        },
        {
            path: '/test',
            role: 'user'
        }    
    ] as {
        path: string,
        role: 'user'|'admin'
    } []
}

export default Vars;