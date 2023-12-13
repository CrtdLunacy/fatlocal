import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { MenuSubgroupItem } from './MenuSubgroupItem';

export default {
    title: 'shared/MenuSubgroupItem',
    component: MenuSubgroupItem,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof MenuSubgroupItem>;

const Template: ComponentStory<typeof MenuSubgroupItem> = (args) => <MenuSubgroupItem {...args} />;

export const Light = Template.bind({});
Light.args = {};
Light.decorators = [StoreDecorator({})];
