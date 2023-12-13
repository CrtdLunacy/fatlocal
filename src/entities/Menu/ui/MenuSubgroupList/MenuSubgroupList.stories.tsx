import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { MenuSubgroupList } from './MenuSubgroupList';

export default {
    title: 'shared/MenuSubgroupList',
    component: MenuSubgroupList,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof MenuSubgroupList>;

const Template: ComponentStory<typeof MenuSubgroupList> = (args) => <MenuSubgroupList {...args} />;

export const Light = Template.bind({});
Light.args = {};
Light.decorators = [StoreDecorator({})];
