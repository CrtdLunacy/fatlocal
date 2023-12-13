import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ProductsSubList } from './ProductsSubList';

export default {
    title: 'shared/ProductsSubList',
    component: ProductsSubList,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ProductsSubList>;

const Template: ComponentStory<typeof ProductsSubList> = (args) => <ProductsSubList {...args} />;

export const Light = Template.bind({});
Light.args = {};
Light.decorators = [StoreDecorator({})];
