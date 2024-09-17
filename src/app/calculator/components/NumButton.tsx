import { Button } from "@mui/material";

interface numButtonProps {
    display: string
    action: (val: string) => void,

}

//TODO? Can I combine the diffrent buttons together into one component easily?

export default function NumButton(props: numButtonProps) {

    return (
        <Button fullWidth variant="contained" onClick={() => { props.action(props.display) }}>
            {props.display}
        </Button >
    );
};