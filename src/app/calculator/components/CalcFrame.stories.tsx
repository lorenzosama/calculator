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

export const DivMathStory: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);


        const twoButton = canvas.getByRole('button', { name: "num-2" })
        const oneButton = canvas.getByRole('button', { name: "num-1" })
        const zeroButton = canvas.getByRole('button', { name: "num-0" })
        const div = canvas.getByRole('button', { name: "calc-÷" });
        const eqButton = canvas.getByRole('button', { name: "calc-=" });
        await userEvent.click(twoButton);
        await userEvent.click(twoButton);
        await userEvent.click(div);
        await userEvent.click(oneButton);
        await userEvent.click(zeroButton);
        await userEvent.click(eqButton);
        await expect(
            canvas.getByDisplayValue('2.2')).toBeInTheDocument();

    }
}
export const AddMathStory: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);



        const oneButton = canvas.getByRole('button', { name: "num-1" })
        const twoButton = canvas.getByRole('button', { name: "num-2" })
        const plus = canvas.getByRole('button', { name: "calc-+" });
        const eqButton = canvas.getByRole('button', { name: "calc-=" });
        await userEvent.click(oneButton);
        await userEvent.click(plus);
        await userEvent.click(twoButton);
        await userEvent.click(eqButton);
        await expect(
            canvas.getByDisplayValue('3')).toBeInTheDocument();

    }
}

export const SubMathStory: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const sevenButton = canvas.getByRole('button', { name: "num-7" })
        const fourButton = canvas.getByRole('button', { name: "num-4" })
        const minButton = canvas.getByRole('button', { name: "calc--" });
        const eqButton = canvas.getByRole('button', { name: "calc-=" });
        await userEvent.click(sevenButton);
        await userEvent.click(minButton);
        await userEvent.click(fourButton);
        await userEvent.click(eqButton);
        await expect(
            canvas.getByDisplayValue('3')).toBeInTheDocument();

    }
}

export const MultMathStory: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        const eightButton = canvas.getByRole('button', { name: "num-8" });
        const twoButton = canvas.getByRole('button', { name: "num-2" })
        const multButton = canvas.getByRole('button', { name: "calc-X" });
        const eqButton = canvas.getByRole('button', { name: "calc-=" });
        await userEvent.click(twoButton);
        await userEvent.click(twoButton);
        await userEvent.click(multButton);
        await userEvent.click(eightButton);
        await userEvent.click(eqButton);
        await expect(
            canvas.getByDisplayValue('176')).toBeInTheDocument();

    }
}

export const TwoMultMathStory: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        const eightButton = canvas.getByRole('button', { name: "num-8" });
        const twoButton = canvas.getByRole('button', { name: "num-2" })
        const multButton = canvas.getByRole('button', { name: "calc-X" });
        const eqButton = canvas.getByRole('button', { name: "calc-=" });
        await userEvent.click(twoButton);
        await userEvent.click(twoButton);
        await userEvent.click(multButton);
        await userEvent.click(eightButton);
        await userEvent.click(eqButton);
        await userEvent.click(eqButton);
        await expect(
            canvas.getByDisplayValue('1408')).toBeInTheDocument();

    }
}