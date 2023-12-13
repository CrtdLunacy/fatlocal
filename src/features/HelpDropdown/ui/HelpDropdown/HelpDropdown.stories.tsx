import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { HelpDropdown } from './HelpDropdown';

export default {
    title: 'shared/BillsDropdown',
    component: HelpDropdown,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof HelpDropdown>;

const Template: ComponentStory<typeof HelpDropdown> = (args) => <HelpDropdown {...args} />;

export const Light = Template.bind({});
Light.args = {};
Light.decorators = [StoreDecorator({})];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [StoreDecorator({})];
