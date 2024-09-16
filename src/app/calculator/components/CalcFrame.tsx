import { Container, Paper } from "@mui/material";
import Grid from '@mui/material/Grid2'
import NumButton from "./NumButton";
import MathButton from "./MathButton";


export default function CalcFrame() {
    return (
        <Container>
            <Paper elevation={1} sx={{ width: .70 }}>
                <Grid container spacing={6} columns={4}>
                    <Grid size={1}>
                        <MathButton display={"AC"} />
                    </Grid>
                    <Grid size={1}>
                        <MathButton display={"Clear"} />
                    </Grid>
                    <Grid size={1}>
                        <MathButton display={"+/-"} />
                    </Grid>

                    <Grid size={1}>
                        <MathButton display={"%"} />
                    </Grid>
                    <Grid size={1}>
                        <NumButton display={7} />
                    </Grid>
                    <Grid size={1}>
                        <NumButton display={8} />
                    </Grid>
                    <Grid size={1}>
                        <NumButton display={9} />
                    </Grid>
                    <Grid size={1}>
                        <MathButton display={"*"} />
                    </Grid>
                    <Grid size={1}>
                        <NumButton display={4} />
                    </Grid>
                    <Grid size={1}>
                        <NumButton display={5} />
                    </Grid>
                    <Grid size={1}>
                        <NumButton display={6} />
                    </Grid>
                    <Grid size={1}>
                        <MathButton display={"-"} />
                    </Grid>
                    <Grid size={1}>
                        <NumButton display={1} />
                    </Grid>
                    <Grid size={1}>
                        <NumButton display={2} />
                    </Grid>
                    <Grid size={1}>
                        <NumButton display={3} />
                    </Grid>
                    <Grid size={1}>
                        <MathButton display={"+"} />
                    </Grid>
                    <Grid size={2}>
                        <NumButton display={0} />
                    </Grid>
                    <Grid size={1}>
                        <MathButton display={"."} />
                    </Grid>
                    <Grid size={1}>
                        <MathButton display={"="} />
                    </Grid>
                </Grid>
            </Paper >
        </Container >
    );

}