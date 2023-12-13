import React, { memo } from 'react';
import { PageLayout } from '@/widgets/PageLayout';
import { SideBar } from '@/widgets/SideBar';

const MainPage = memo(() => (
    <PageLayout>
        <SideBar />
    </PageLayout>
));

export default MainPage;
