import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { SkeletonLoader } from './SkeletonLoader';
import { Theme } from '@/shared/const/theme';

export default {
    title: 'shared/SkeletonLoader',
    component: SkeletonLoader,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof SkeletonLoader>;

const Template: ComponentStory<typeof SkeletonLoader> = (args) => <SkeletonLoader {...args} />;

export const Light = Template.bind({});
Light.args = {
    width: '100%',
    height: 200,
};
Light.decorators = [StoreDecorator({})];

export const LightCircle = Template.bind({});
LightCircle.args = {
    border: '50%',
    width: 100,
    height: 100,
};
LightCircle.decorators = [StoreDecorator({})];

export const Dark = Template.bind({});
Dark.args = {
    width: '100%',
    height: 200,
};
Dark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({})];

export const DarkCircle = Template.bind({});
DarkCircle.args = {
    border: '50%',
    width: 100,
    height: 100,
};
DarkCircle.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({})];

export const Grey = Template.bind({});
Grey.args = {
    width: '100%',
    height: 200,
};
Grey.decorators = [ThemeDecorator(Theme.GREY), StoreDecorator({})];

export const GreyCircle = Template.bind({});
GreyCircle.args = {
    border: '50%',
    width: 100,
    height: 100,
};
GreyCircle.decorators = [ThemeDecorator(Theme.GREY), StoreDecorator({})];
