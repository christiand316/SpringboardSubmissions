import { useQuery } from '@tanstack/react-query';
import React from 'react';

interface UserCardProps {
    id: string,
    name: string
}
const UserCard: React.FunctionComponent<UserCardProps> = ({ id, name }) => {
    return <div className="px-4 py-2 border-2">
        Hi, I'm {name}#{id}
    </div>;
};

export default UserCard;