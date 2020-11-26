import { useReducer, useEffect, useCallback } from 'react';

// LOADING, SUCCESS, ERROR
function reducer(state, action) {
    switch(action.type) {
        case 'LOADING':
            return {
                loading: true,
                data: null,
                error: null,
            };
        case 'SUCCESS':
            return {
                loading: false,
                data: action.data,
                error: null,
            };
        case 'ERROR':
            return {
                loading: false,
                data: null,
                error: action.error,
            };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

// callback api를 호출하는 함수 넣어줄 것
// deps는 useEffect를 사용해서 컴포넌트가 로딩됐을때,
// 어떤 값이 변경됐을때 api 재요청
function useAsync(callback, deps = []) {
    const [state, dispatch] = useReducer(reducer, {
        loading: false,
        data: null,
        error: null
    });

    const fetchData = useCallback(async () => {
        dispatch({ type: 'LOADING' });
        try {
            const data = await callback();
            dispatch({ type: 'SUCCESS', data });
        } catch (e) {
            dispatch({ type: 'ERROR', error: e });
        }
    }, [callback]);

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line
    }, deps);

    return [state, fetchData];
    // 첫 번째 값은 현재 상태를 가져올 수 있고
    // 두 번째 값으로는 특정 요청을 다시 시작하는 함수를 받아와서 사용가능
}

export default useAsync;