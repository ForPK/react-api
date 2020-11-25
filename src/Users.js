import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Users() {
    // 세가지 상태를 관리하기 위해 useState를 사용
    // 1. 결과물
    const [users, setUsers] = useState(null);
    // 2. api가 요청 중인지 아닌지 알려주는 값
    const [loading, setLoading] = useState(false);
    // 3. error
    const [error, setError] =  useState(null);

    // 가장 처음 사용될때 axios를 사용해서 렌더링 
    
    const fetchUsers = async () => {
        try {
            // setUsers, setError 초기화
            setUsers(null);
            setError(null);
            setLoading(true);
            const response = await axios.get('https://jsonplaceholder.typicode.com/users/');
            setUsers(response.data);
            // 요청 성공하면 setUsers를 바꿈
        } catch (e) {
            console.log(e.response.status);
            setError(e);
            // 요청이 실패하면 setError를 바꿈
        }
        setLoading(false);
        // loading이 끝났음
    }
    useEffect(() => {
        fetchUsers();
    }, []); // 컴포넌트가 처음 렌더링 될 때 [] 이 작업을 하겠다라는 것을 의미로 빈 배열

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error</div>;
    if (!users) return null;

    return (
        <ul>
            {users.map(user => (
                <li key={user.id}>
                    {user.username} ({user.name})
                </li>
            ))}
        </ul>
    );
}

export default Users;