import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ListBox } from './ListBox';

export default {
    title: 'shared/ListBox',
    component: ListBox,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ListBox>;

const Template: ComponentStory<typeof ListBox> = (args) => <ListBox {...args} />;

export const Light = Template.bind({});
Light.args = {
    defaultValue: 'Выберите значение',
    value: undefined,
    onChange: (value) => {},
    items: [
        { value: '1', content: '123' },
        { value: '2', content: '2133' },
        { value: '3', content: '123123' },
    ],
};
Light.decorators = [StoreDecorator({})];
