import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { MenuGroupList } from './MenuGroupList';

export default {
    title: 'shared/MenuGroupList',
    component: MenuGroupList,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof MenuGroupList>;

const Template: ComponentStory<typeof MenuGroupList> = (args) => <MenuGroupList {...args} />;

export const Light = Template.bind({});
Light.args = {};
Light.decorators = [StoreDecorator({})];
