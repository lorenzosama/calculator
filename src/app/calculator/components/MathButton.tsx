import {
    Button,
    ButtonProps as MuiButtonProps
} from "@mui/material";

export interface MathButtonProps extends MuiButtonProps {
    display: string,
    isCurrentOperation: boolean

    mathButtonAction?: () => void

}

//TODO? Can I combine the diffrent buttons together into one component easily?

export default function MathButton(props: MathButtonProps) {
    return (
        <Button fullWidth variant="contained"
            onClick={props.mathButtonAction}
            color={props.isCurrentOperation == true ? "success" : undefined}
            aria-label={'calc-' + props.display}
        >
            {props.display}
        </ Button >
    );


};
MathButton.defaultProps = {
    isCurrentOperation: false
};