import React from 'react';
import { Outlet } from 'react-router-dom';

function RootLayout() {
    return (
        <main className="app">
            <Outlet />
        </main>
    )
}

export default RootLayout;