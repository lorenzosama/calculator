import type { Meta, StoryObj } from '@storybook/react';
import MathButton from './MathButton';


const meta: Meta<typeof MathButton> = {
    component: MathButton,
};

export default meta;
type Story = StoryObj<typeof MathButton>;

export const SimpleButton: Story = {
    args: {
        display: "5",
        action: () => { console.log("test") }
    },
};