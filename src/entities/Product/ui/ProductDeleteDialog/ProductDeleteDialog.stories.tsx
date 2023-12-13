import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ProductDeleteDialog } from './ProductDeleteDialog';

export default {
    title: 'shared/ProductDeleteDialog',
    component: ProductDeleteDialog,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ProductDeleteDialog>;

const Template: ComponentStory<typeof ProductDeleteDialog> = (args) => <ProductDeleteDialog {...args} />;

export const Light = Template.bind({});
Light.args = {};
Light.decorators = [];
