import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { NotificationDropdown } from './NotificationDropdown';

export default {
    title: 'shared/BillsDropdown',
    component: NotificationDropdown,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof NotificationDropdown>;

const Template: ComponentStory<typeof NotificationDropdown> = (args) => <NotificationDropdown {...args} />;

export const Light = Template.bind({});
Light.args = {};
Light.decorators = [];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [];
