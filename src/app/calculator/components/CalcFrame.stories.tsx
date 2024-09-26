import type { Meta, StoryObj } from '@storybook/react';
import CalcFrame from './CalcFrame';
import { expect, userEvent, within } from '@storybook/test';


const meta: Meta<typeof CalcFrame> = {
    component: CalcFrame,
};

export default meta;
type Story = StoryObj<typeof CalcFrame>;

export const Calculator: Story = {
};

export const SimpleMathStory: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        const eightButton = canvas.getByRole('button', { name: "num-8" });
        const twoButton = canvas.getByRole('button', { name: "num-2" })
        const multButton = canvas.getByRole('button', { name: "calc-X" });
        //        const calcField = canvas.getByLabelText('calc-output')

        //const loginButton = canvas.getByRole('button', { name: /Log in/i });
        await userEvent.click(twoButton);
        await userEvent.click(twoButton);
        await userEvent.click(multButton);
        await userEvent.click(eightButton);
        await expect(
            canvas.getByDisplayValue('176')).toBeInTheDocument();

    }
}