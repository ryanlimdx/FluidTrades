import React from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Box } from '@chakra-ui/react';

const MainLayout = () => {
    const styling = {
        display: 'flex',
        flex: '1',
        width: '100%',
        justifyContent: 'center',
        backgroundColor: 'white'
    }

    return (
        <>
            <Navbar />
            {/* Box that wraps the content below the nav bar */}
            <Box sx={styling}>
                <Outlet />
            </Box>
        </>
    )
}

export default MainLayout;