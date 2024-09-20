import {
    Button,
    ButtonProps as MuiButtonProps
} from "@mui/material";

interface numButtonProps extends MuiButtonProps {
    display: string
    onClickAction: (val: string) => void,

}

//TODO? Can I combine the diffrent buttons together into one component easily?

export default function NumButton(props: numButtonProps) {

    return (
        <Button {...props} fullWidth variant="contained" onClick={() => { props.onClickAction(props.display) }}>
            {props.display}
        </Button >
    );
};