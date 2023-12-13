import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import AboutPage from './AboutPage';
import { Theme } from '@/shared/const/theme';

export default {
    title: 'pages/AboutPage',
    component: AboutPage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof AboutPage>;

const Template: ComponentStory<typeof AboutPage> = () => (
    <AboutPage />
);

export const Primary = Template.bind({});
Primary.args = {
};
Primary.decorators = [StoreDecorator({})];

export const Secondary = Template.bind({});
Secondary.args = {
};
Secondary.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({})];
