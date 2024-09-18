import { Button } from "@mui/material";

//todo: Make this  more defined. We're going to need to make hooks/functions based off this stuff
interface mathButtonProps {
    display: string
    action?: () => void

}

//TODO? Can I combine the diffrent buttons together into one component easily?

export default function MathButton(props: mathButtonProps) {
    return (
        <Button fullWidth variant="contained" onClick={props.action}>
            {props.display}
        </ Button >
    );
};