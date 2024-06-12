import React from 'react';

type Role = 'user'|'admin';

type Props = {
    children: React.ReactNode,
    roles: Role[]
}

const withCheck = ({ children }: Props) => {
    return children;
}

export default withCheck;