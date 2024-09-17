'use client'
import { Container, Paper, TextField } from "@mui/material";
import Grid from '@mui/material/Grid2'
import NumButton from "./NumButton";
import MathButton from "./MathButton";
import { Dispatch, useReducer } from "react";



export default function CalcFrame() {

    type MathOperation = | "clear" | "addition" | "subtration"
    type CalcAction =
        | {
            "type": 'number',
            "payload": string
        }
        | {
            "type": "math",
            "payload": MathOperation
        };

    type CalcState = {
        displayValue: number,
        calculation?: string | null
        //We could store history or something but let's keep it simple
    };

    const defaultCalcState: CalcState = {
        displayValue: 0,
    };


    function reducer(calcState: CalcState, action: CalcAction) {
        switch (action.type) {
            case 'number':
                let newValString;
                if (calcState.displayValue === 0) {
                    newValString = action.payload
                }
                else {
                    newValString = calcState.displayValue.toString() + action.payload;
                }

                return ({
                    ...calcState,
                    displayValue: parseFloat(newValString)
                })
            case 'math':
                switch (action.payload) {
                    case 'clear':
                        return (defaultCalcState);
                }

            default:
                return calcState;
        }
        return calcState;

    };


    const [state, dispatch] = useReducer(reducer, defaultCalcState)


    function appendNumber(val: string) {
        dispatch({ 'type': "number", 'payload': val });
    }


    return (
        <Container>
            <Paper elevation={1} sx={{ width: .70 }}>
                <TextField
                    id=""
                    label=""
                    value={state.displayValue}
                    slotProps={{
                        input: {
                            readOnly: true
                        },
                    }}

                />
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
                        <NumButton display='7' action={appendNumber} />
                    </Grid>
                    {/*
                    <Grid size={1}>
                        <NumButton display='8' />
                    </Grid>
                    <Grid size={1}>
                        <NumButton display='9' />
                    </Grid>
                    <Grid size={1}>
                        <MathButton display={"*"} />
                    </Grid>
                    <Grid size={1}>
                        <NumButton display='4' />
                    </Grid>
                    <Grid size={1}>
                        <NumButton display='5' />
                    </Grid>
                    <Grid size={1}>
                        <NumButton display='6' />
                    </Grid>
                    <Grid size={1}>
                        <MathButton display={"-"} />
                    </Grid>
                    <Grid size={1}>
                        <NumButton display='1' />
                    </Grid>
                    <Grid size={1}>
                        <NumButton display='2' />
                    </Grid>
                    <Grid size={1}>
                        <NumButton display='3' />
                    </Grid>
                    <Grid size={1}>
                        <MathButton display={"+"} />
                    </Grid>
                    <Grid size={2}>
                        <NumButton display='0' />
                    </Grid>
                    */}
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