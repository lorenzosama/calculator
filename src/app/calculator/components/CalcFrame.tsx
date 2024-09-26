'use client'
import { Container, TextField } from "@mui/material";
import Grid from '@mui/material/Grid2'
import NumButton from "./NumButton";
import MathButton from "./MathButton";
import { useReducer } from "react";



export default function CalcFrame() {

    enum MathOperations {
        Clear = "clear",
        Add = "add",
        Sub = "sub",
        Mult = "mult",
        Div = "div",
        Inv = "invert",
        Eql = "equals", //the "done" function really
    };
    enum DispatchTypes {
        Num = "number",
        Math = "math",
        Clear = "clear",
        Percent = "percent"
    }

    type MathDispatch = {
        "type": DispatchTypes.Math,
        "payload": MathOperations
    }


    type CalcAction =
        | {
            "type": DispatchTypes.Num,
            "payload": string
        }
        | MathDispatch |
        {
            "type": DispatchTypes.Clear
        } |
        {
            "type": DispatchTypes.Percent
        };

    type CalcState = {
        displayValue: string,
        savedValue?: number
        hasEqualBeenPushed: boolean
        currentOperation?: MathOperations
    };

    const defaultCalcState: CalcState = {
        displayValue: '0',
        hasEqualBeenPushed: true

    };

    const [state, dispatch] = useReducer(reducer, defaultCalcState)


    function reducer(calcState: CalcState, action: CalcAction): CalcState {
        const displayAsNum = parseFloat(calcState.displayValue);
        switch (action.type) {
            case DispatchTypes.Num:
                let newValString;
                if (calcState.hasEqualBeenPushed || calcState.displayValue == '0') {
                    newValString = action.payload
                    return ({
                        ...calcState,
                        displayValue: newValString,
                        hasEqualBeenPushed: false
                    })

                }
                else {
                    if (action.payload == '.'! && calcState.displayValue.includes('.')!) {
                        return (calcState)
                    }
                    newValString = calcState.displayValue.toString() + action.payload;
                }

                return ({
                    ...calcState,
                    displayValue: newValString
                })
            case DispatchTypes.Clear:
                return (defaultCalcState);
            case DispatchTypes.Math:
                switch (action.payload) { //MathOperations types
                    case MathOperations.Inv:
                        const toInvert = parseFloat(calcState.displayValue) * -1;
                        return ({
                            ...calcState,
                            displayValue: toInvert.toString()
                        });
                    case MathOperations.Add:
                        return ({
                            ...calcState,
                            savedValue: displayAsNum,
                            currentOperation: MathOperations.Add,
                            displayValue: '0'
                        });
                    case MathOperations.Sub:
                        return ({
                            ...calcState,
                            savedValue: displayAsNum,
                            currentOperation: MathOperations.Sub,
                            displayValue: '0'
                        });
                    case MathOperations.Mult:
                        return ({
                            ...calcState,
                            savedValue: displayAsNum,
                            currentOperation: MathOperations.Mult,
                            displayValue: '0'
                        })
                    case MathOperations.Div:
                        return ({
                            ...calcState,
                            savedValue: displayAsNum,
                            currentOperation: MathOperations.Div,
                            displayValue: '0'
                        })
                    case MathOperations.Eql:
                        if (calcState.currentOperation == null || calcState.savedValue === undefined) {
                            return (defaultCalcState);
                        }
                        if (calcState.currentOperation == MathOperations.Add) {
                            const total = displayAsNum + calcState.savedValue;
                            return ({
                                ...calcState,
                                savedValue: total,
                                displayValue: total.toString()
                            })
                        }
                        else if (calcState.currentOperation == MathOperations.Sub) {
                            const sub = calcState.savedValue - displayAsNum;
                            return ({
                                ...calcState,
                                savedValue: sub,
                                displayValue: sub.toString()
                            })
                        }
                        else if (calcState.currentOperation == MathOperations.Mult) {
                            const answer = calcState.savedValue * displayAsNum;
                            return ({
                                ...calcState,
                                savedValue: answer,
                                displayValue: answer.toString()
                            })
                        }
                        else if (calcState.currentOperation == MathOperations.Div) {
                            const answer = calcState.savedValue / displayAsNum;
                            return ({
                                ...calcState,
                                savedValue: answer,
                                displayValue: answer.toString()
                            })
                        }

                        else {
                            console.error("Current operation unsupported!");
                            return ({ ...calcState });
                        }


                }
            case DispatchTypes.Percent:
                const shiftenDisplayNum = displayAsNum * .01;
                return ({
                    ...calcState,
                    displayValue: shiftenDisplayNum.toString()
                });
            default:
                return calcState;
        }
    };

    function appendNumber(val: string) {
        dispatch({ 'type': DispatchTypes.Num, 'payload': val });
    }




    return (
        <Container>
            <TextField
                aria-label="calc-output"
                value={state.displayValue}
                slotProps={{
                    input: {
                        readOnly: true
                    },
                }}
                sx={{ p: 1, minWidth: .75 }}

            />
            <Grid container spacing={6} columns={4}
                sx={{ m: 1 }}
            >
                <Grid size={1}>
                    <MathButton display={"Clear"} mathButtonAction=
                        {
                            () => dispatch({ 'type': DispatchTypes.Clear })
                        }
                    />
                </Grid>
                <Grid size={1}>
                    <MathButton display={"+/-"}
                        mathButtonAction={
                            () => dispatch(
                                {
                                    "type": DispatchTypes.Math,
                                    "payload": MathOperations.Inv
                                })
                        }
                    />
                </Grid>

                <Grid size={1}>
                    <MathButton display={"%"}
                        mathButtonAction={
                            () => dispatch(
                                {
                                    "type": DispatchTypes.Percent,
                                })
                        }
                    />
                </Grid>
                <Grid size={1}>
                    <MathButton display={"÷"}
                        mathButtonAction={
                            () => dispatch(
                                {
                                    "type": DispatchTypes.Math,
                                    "payload": MathOperations.Div
                                })
                        }
                    />
                </Grid>
                <Grid size={1}>
                    <NumButton display='7' clickaction={appendNumber} />
                </Grid>
                <Grid size={1}>
                    <NumButton display='8' clickaction={appendNumber} />
                </Grid>
                <Grid size={1}>
                    <NumButton display='9' clickaction={appendNumber} />
                </Grid>
                <Grid size={1}>
                    <MathButton display={"X"}
                        mathButtonAction={
                            () => dispatch(
                                {
                                    "type": DispatchTypes.Math,
                                    "payload": MathOperations.Mult
                                })
                        } />
                </Grid>
                <Grid size={1}>
                    <NumButton display='4' clickaction={appendNumber} />
                </Grid>
                <Grid size={1}>
                    <NumButton display='5' clickaction={appendNumber} />
                </Grid>
                <Grid size={1}>
                    <NumButton display='6' clickaction={appendNumber} />
                </Grid>
                <Grid size={1}>
                    <MathButton display={"-"}
                        mathButtonAction={
                            () => dispatch(
                                {
                                    "type": DispatchTypes.Math,
                                    "payload": MathOperations.Sub
                                })
                        }
                    />
                </Grid>
                <Grid size={1}>
                    <NumButton display='1' clickaction={appendNumber} />
                </Grid>
                <Grid size={1}>
                    <NumButton display='2' clickaction={appendNumber} />
                </Grid>
                <Grid size={1}>
                    <NumButton display='3' clickaction={appendNumber} />
                </Grid>
                <Grid size={1}>
                    <MathButton display={"+"}
                        mathButtonAction={
                            () => dispatch(
                                {
                                    "type": DispatchTypes.Math,
                                    "payload": MathOperations.Add
                                })
                        }
                    />
                </Grid>
                <Grid size={2}>
                    <NumButton display='0' clickaction={appendNumber} />
                </Grid>
                <Grid size={1}>
                    <NumButton display='.' clickaction={appendNumber} />
                </Grid>
                <Grid size={1}>
                    <MathButton display={"="}
                        mathButtonAction={
                            () => dispatch(
                                {
                                    "type": DispatchTypes.Math,
                                    "payload": MathOperations.Eql
                                })
                        }
                    />
                </Grid>
            </Grid>
        </Container >
    );

}