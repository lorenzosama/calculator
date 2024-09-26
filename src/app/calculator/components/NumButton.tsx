import {
    Button,
    ButtonProps as MuiButtonProps
} from "@mui/material";

interface numButtonProps extends MuiButtonProps {
    display: string
    clickaction: (val: string) => void,

}


//This is the right way of passing props while extending MUI props
export default function NumButton({ display, clickaction, ...otherProps }: numButtonProps) { //props: numButtonProps) {

    return (
        <Button {...otherProps}
            fullWidth variant="contained"
            aria-label={'num-' + display}
            onClick={() => { clickaction(display) }}

        >
            {display}
        </Button >
    );
};