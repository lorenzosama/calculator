import { Button } from "@mui/material";

interface mathButtonProps {
    display: string

}

//TODO? Can I combine the diffrent buttons together into one component easily?

export default function MathButton(props: mathButtonProps) {
    return (
        <Button variant="contained" >
            {props.display}
        </Button >
    );
};