import { Box, Divider, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2"
import CalcFrame from "./components/CalcFrame";

/*
In creality this is more complicated than it should be. But I make this a page with a component that can
be reused.
*/
export default function CalcPage() {
    return (
        <Box >
            <Grid container >
                <Grid size={12}>
                    <Typography sx={{ margin: 3 }} variant="h2">Welcome to my attempt at a calculator</Typography>
                    <Divider />
                </Grid>
                <Grid size={12}>
                    <CalcFrame />
                </Grid>
            </Grid>
        </Box>

    );
}