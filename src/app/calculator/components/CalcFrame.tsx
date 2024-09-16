import { Container, Paper } from "@mui/material";
import Grid from '@mui/material/Grid2'
import NumButton from "./NumButton";


export default function CalcFrame() {
    return (
        <Container>
            <Paper elevation={1}>

                <Grid container direction={"column"} spacing={1}>
                    <Grid container direction={"row"} size={12} spacing={1}>
                        <Grid size={1}>
                            <NumButton display={7} />
                        </Grid>
                        <Grid size={1}>
                            <NumButton display={8} />
                        </Grid>
                        <Grid size={1}>
                            <NumButton display={9} />
                        </Grid>
                    </Grid>
                    <Grid container direction={"row"} size={12}>
                        <Grid size={1}>
                            <NumButton display={4} />
                        </Grid>
                        <Grid size={1}>
                            <NumButton display={5} />
                        </Grid>
                        <Grid size={1}>
                            <NumButton display={6} />
                        </Grid>
                    </Grid>
                    <Grid container direction={"row"} size={12}>
                        <Grid size={1}>
                            <NumButton display={1} />
                        </Grid>
                        <Grid size={1}>
                            <NumButton display={2} />
                        </Grid>
                        <Grid size={1}>
                            <NumButton display={3} />
                        </Grid>
                    </Grid>
                </Grid>
            </Paper >
        </Container>
    );

}