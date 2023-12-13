import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Select } from './Select';

export default {
    title: 'shared/Select',
    component: Select,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    label: 'Primary selection',
    options: [
        {
            value: '123',
            id: '123',
            content: '1st',
        },
        {
            value: '234',
            id: '1223',
            content: '2nd',
        },
        {
            value: '345',
            id: '12',
            content: '3rd',
        },
    ],
};

// export const BigIcon = Template.bind({});
// BigIcon.args = {
//     size: 300,
//     src: AvatarImg,
//     alt: 'profile',
// };
//
// BigIcon.decorators = [ThemeDecorator(Theme.DARK)];
