import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Avatar } from './Avatar';
import AvatarImg from '../../assets/tests/storyybook.jpg';
import { Theme } from '@/shared/const/theme';

export default {
    title: 'shared/Avatar',
    component: Avatar,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    size: 100,
    src: AvatarImg,
    alt: 'profile',
};

export const BigIcon = Template.bind({});
BigIcon.args = {
    size: 300,
    src: AvatarImg,
    alt: 'profile',
};

BigIcon.decorators = [ThemeDecorator(Theme.DARK)];
