import React from 'react';
import axios from 'axios';
import useAsync from './useAsync';

async function getUsers() {
    // useAsync 콜백으로 넣어줄 함수
    const response = await axios.get('https://jsonplaceholder.typicode.com/users/');
    return response.data;
}

function Users() {
    const [state, refetch] = useAsync(getUsers, [], true);
    // 컴포넌트가 처음 렌더링될 때 하는 요청은 생략
    const { loading, data: users, error } = state;
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error</div>;
    if (!users) return <button onClick={refetch}>불러오기</button>;

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