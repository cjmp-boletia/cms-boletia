import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import LayoutCMS from '../components/organisms/LayoutCMS';
import Banners from '../pages/banners';
import AddBanner from '../pages/add-banner';
import EditBanner from '../pages/edit-banner';
import RequireAuth from './require-auth';
import AuthPage from '../pages';

function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<AuthPage />} />
            <Route path="" element={
                <RequireAuth>
                    <LayoutCMS />
                </RequireAuth>
            } >
                <Route path="/banners" element={
                    <RequireAuth>
                        <Banners />
                    </RequireAuth>
                } />
                <Route path="/add-banner" element={
                    <RequireAuth>
                        <AddBanner />
                    </RequireAuth>
                } />
                <Route path="/edit-banner/:id" element={
                    <RequireAuth>
                        <EditBanner />
                    </RequireAuth>
                } />

            </Route>
        </Routes>

    );
}

export default AppRouter;