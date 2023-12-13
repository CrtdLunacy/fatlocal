import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { MenuGroupItem } from './MenuGroupItem';

export default {
    title: 'shared/MenuGroupItem',
    component: MenuGroupItem,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof MenuGroupItem>;

const Template: ComponentStory<typeof MenuGroupItem> = (args) => <MenuGroupItem {...args} />;

export const Light = Template.bind({});
Light.args = {};
Light.decorators = [StoreDecorator({})];
