import { Button } from "@mui/material";

interface numButtonProps {
    display: number

}

//TODO? Can I combine the diffrent buttons together into one component easily?

export default function NumButton(props: numButtonProps) {
    return (
        <Button variant="contained" >
            {props.display}
        </Button >
    );
};