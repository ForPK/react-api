import React from 'react';
import axios from 'axios';
import useAsync from './useAsync';

async function getUsers() {
    // useAsync 콜백으로 넣어줄 함수
    const response = await axios.get('https://jsonplaceholder.typicode.com/users/');
    return response.data;
}

function Users() {
    const [state, refetch] = useAsync(getUsers);
    // useAsync(getUsers, []) 넣어도 되지만 useAsync에 기본값을 이미 넣어서 생략 가능
    const { loading, data: users, error } = state;
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error</div>;
    if (!users) return null;

    return (
        <>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.username} ({user.name})
                    </li>
                ))}
            </ul>
            <button onClick={refetch}>다시 불러오기</button>
        </>
    );
}

export default Users;