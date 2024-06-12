import React from 'react';

type Role = 'user'|'admin';

type Props = {
    children: React.ReactNode,
    roles: Role[]
}

const withAuth = ({ children, roles }: Props) => {
    
    return children;
}

export default withAuth;