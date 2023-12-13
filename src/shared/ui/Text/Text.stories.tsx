import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Text } from './Text';
import { Theme } from '@/shared/const/theme';
import { TextSize, TextTheme } from './consts';

export default {
    title: 'shared/Text',
    component: Text,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    text: 'Light',
    title: 'Light',
};

export const Dark = Template.bind({});
Dark.args = {
    text: 'Dark',
    title: 'Dark',
};

Dark.decorators = [ThemeDecorator(Theme.DARK)];

export const OnlyTitle = Template.bind({});
OnlyTitle.args = {
    text: 'Title',
};

export const OnlyText = Template.bind({});
OnlyText.args = {
    title: 'Text',
};

export const Error = Template.bind({});
Error.args = {
    text: 'Dark',
    title: 'Dark',
    theme: TextTheme.ERROR,
};

export const SizeM = Template.bind({});
SizeM.args = {
    text: 'SizeM',
    title: 'SizeM',
    size: TextSize.M,
};

export const SizeXL = Template.bind({});
SizeXL.args = {
    text: 'SizeXL',
    title: 'SizeXL',
    size: TextSize.XL,
};
