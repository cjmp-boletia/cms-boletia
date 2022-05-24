import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import LayoutCMS from '../components/organisms/LayoutCMS';
import Banners from '../pages/banners';
import AddBanner from '../pages/add-banner';
import EditBanner from '../pages/edit-banner';

function AppRouter() {
    return (
        <Routes>
            <Route path="" element={<LayoutCMS />} >
                <Route path="/banners" element={<Banners />} />
                <Route path="/add-banner" element={<AddBanner/>} />
                <Route path="/edit-banner/:id" element={<EditBanner/>} />
            </Route>
        </Routes>

    );
}

export default AppRouter;