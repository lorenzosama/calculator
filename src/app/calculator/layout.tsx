import type { Metadata } from "next";
import { Box, Container, createTheme, CssBaseline, Grid2, Paper, ThemeProvider, Typography } from "@mui/material";

import React from "react";
import CalcFrame from "./components/CalcFrame";



export const metadata: Metadata = {
    title: "Lorenzo React+MaterialUI calculator",
    description: "First practice run",
};

export default function CalculatorLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <Container>
            <CssBaseline />
            <Paper sx={{ m: 2 }}>
                <div> {children}</div>
            </Paper>
        </Container>
    );
}