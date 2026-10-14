import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
    fetchDataRequest,
    fetchDataSuccess,
    fetchDataFailure
} from "../redux/actions";

function App() {
    const { loading, data, error } = useSelector(
        (state) => state
    );

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchLoremData = async () => {
            dispatch(fetchDataRequest());

            try {
                const response = await fetch(
                    "https://api.lorem.com/ipsum"
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }

                const result = await response.json();

                // Support either an object or an array response.
                const content = Array.isArray(result)
                    ? result[0]
                    : result;

                dispatch(fetchDataSuccess(content));
            } catch (err) {
                dispatch(fetchDataFailure(err.message));
            }
        };

        fetchLoremData();
    }, [dispatch]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <h1>{data?.title}</h1>
            <p>{data?.body}</p>
        </div>
    );
}

export default App;