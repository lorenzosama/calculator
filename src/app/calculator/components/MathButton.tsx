import {
    Button,
    ButtonProps as MuiButtonProps
} from "@mui/material";

export interface mathButtonProps extends MuiButtonProps {
    display: string
    mathButtonAction?: () => void

}

//TODO? Can I combine the diffrent buttons together into one component easily?

export default function MathButton(props: mathButtonProps) {
    return (
        <Button fullWidth variant="contained"
            onClick={props.mathButtonAction}
            aria-label={'calc-' + props.display}
        >
            {props.display}
        </ Button >
    );
};