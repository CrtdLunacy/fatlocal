import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MenuDeleteDialog } from './MenuDeleteDialog';

export default {
    title: 'shared/MenuDeleteDialog',
    component: MenuDeleteDialog,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof MenuDeleteDialog>;

const Template: ComponentStory<typeof MenuDeleteDialog> = (args) => <MenuDeleteDialog {...args} />;

export const Light = Template.bind({});
Light.args = {};
Light.decorators = [];
