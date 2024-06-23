import Routes from "./routes";

const Vars = {
    Expire: {
        RefreshToken: 7
    },
    AuthPath: [
        {
            path: Routes.User,
            role: 'User'
        },
        {
            path: Routes.Admin,
            role: 'Admin'
        }
    ] as AuthPath[],
    Url: {
        Base: 'https://nestjs-boilerplate-test.herokuapp.com/api/v1/auth'
    }
}

export default Vars;