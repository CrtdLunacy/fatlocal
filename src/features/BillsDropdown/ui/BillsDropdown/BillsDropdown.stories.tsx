import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { BillsDropdown } from './BillsDropdown';

export default {
    title: 'shared/BillsDropdown',
    component: BillsDropdown,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof BillsDropdown>;

const Template: ComponentStory<typeof BillsDropdown> = (args) => <BillsDropdown {...args} />;

export const Light = Template.bind({});
Light.args = {};
Light.decorators = [StoreDecorator({})];
