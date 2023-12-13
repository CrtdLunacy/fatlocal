import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ProfilePage } from './ProfilePage';

export default {
    title: 'shared/ProfilePage',
    component: ProfilePage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ProfilePage>;

const Template: ComponentStory<typeof ProfilePage> = (args) => <ProfilePage {...args} />;

export const Light = Template.bind({});
Light.args = {};
Light.decorators = [];
