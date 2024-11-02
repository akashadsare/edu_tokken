import React, { useEffect } from 'react';
import { Core } from '@quicknode/sdk';
import { QUICKNODE_URL } from '../config';

const CourseManagement = ({ token }) => {
    useEffect(() => {
        const core = new Core({
            endpointUrl: QUICKNODE_URL,
        });

        const fetchLatestBlock = async () => { // Fixed the function name here
            try {
                const latestBlock = await core.eth.getBlock('latest');
                console.log("Latest Block:", latestBlock);
            } catch (error) {
                console.error("Error fetching latest block:", error);
            }
        };

        fetchLatestBlock();
    }, [token]);

    return (
        <div>
            <h2>Course Management</h2>
            <p>Token: {token}</p>
        </div>
    );
};

export default CourseManagement;