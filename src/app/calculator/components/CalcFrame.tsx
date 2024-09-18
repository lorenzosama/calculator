'use client'
import { Container, Paper, TextField } from "@mui/material";
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
        Clear = "clear"
    }


    type CalcAction =
        | {
            "type": DispatchTypes.Num,
            "payload": string
        }
        | {
            "type": DispatchTypes.Math,
            "payload": MathOperations
        } |
        {
            "type": "clear"
        };

    type CalcState = {
        displayValue: string,
        savedValue?: number
        hasEqualBeenPushed: boolean
        currentOperation: MathOperations
        //We could store history or something but let's keep it simple
        /*
        Ok I'm going to have to add a few things
        1. savedValue
        2. register2
        3. currentOperation
        
        Register1 is where we'll save the values once we have more complicated calculations
        currentOperation will tell me what kind of math to do

        Anytime a math key is used we 
        1. If no currentOperation: move what is in the display into savedValue
        2. If operation: perform that operation on savedValue and display and store in savedValue
        */
    };

    const defaultCalcState: CalcState = {
        displayValue: '0',
        hasEqualBeenPushed: true

    };


    function reducer(calcState: CalcState, action: CalcAction) {
        switch (action.type) {
            case DispatchTypes.Num:
                let newValString;
                if (calcState.hasEqualBeenPushed) {
                    newValString = action.payload

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
                const displayAsNum = parseFloat(calcState.displayValue);
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
                            currentOperation: MathOperations.Add
                        });
                    case MathOperations.Eql:
                        if (calcState.currentOperation == null || calcState.savedValue === undefined) {
                            return (defaultCalcState);
                        }
                        if (calcState.currentOperation == MathOperations.Add) {
                            let total = displayAsNum + calcState.savedValue;
                            return ({
                                ...calcState,
                                savedValue: total,
                                displayValue: total.toString()
                            })

                        }


                }
            default:
                return calcState;
        }
    };


    const [state, dispatch] = useReducer(reducer, defaultCalcState)


    function appendNumber(val: string) {
        dispatch({ 'type': DispatchTypes.Num, 'payload': val });
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
                        <MathButton display={"Clear"} action=
                            {
                                () => dispatch({ 'type': DispatchTypes.Clear })
                            }
                        />
                    </Grid>
                    <Grid size={1}>
                        <MathButton display={"+/-"}
                            action={
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
                            action={
                                () => dispatch(
                                    {
                                        "type": DispatchTypes.Math,
                                        "payload": MathOperations.Div
                                    })
                            }
                        />
                    </Grid>
                    <Grid size={1}>
                        <NumButton display='7' action={appendNumber} />
                    </Grid>
                    <Grid size={1}>
                        <NumButton display='8' action={appendNumber} />
                    </Grid>
                    <Grid size={1}>
                        <NumButton display='9' action={appendNumber} />
                    </Grid>
                    <Grid size={1}>
                        <MathButton display={"*"}
                            action={
                                () => dispatch(
                                    {
                                        "type": DispatchTypes.Math,
                                        "payload": MathOperations.Mult
                                    })
                            } />
                    </Grid>
                    <Grid size={1}>
                        <NumButton display='4' action={appendNumber} />
                    </Grid>
                    <Grid size={1}>
                        <NumButton display='5' action={appendNumber} />
                    </Grid>
                    <Grid size={1}>
                        <NumButton display='6' action={appendNumber} />
                    </Grid>
                    <Grid size={1}>
                        <MathButton display={"-"}
                            action={
                                () => dispatch(
                                    {
                                        "type": DispatchTypes.Math,
                                        "payload": MathOperations.Sub
                                    })
                            }
                        />
                    </Grid>
                    <Grid size={1}>
                        <NumButton display='1' action={appendNumber} />
                    </Grid>
                    <Grid size={1}>
                        <NumButton display='2' action={appendNumber} />
                    </Grid>
                    <Grid size={1}>
                        <NumButton display='3' action={appendNumber} />
                    </Grid>
                    <Grid size={1}>
                        <MathButton display={"+"}
                            action={
                                () => dispatch(
                                    {
                                        "type": DispatchTypes.Math,
                                        "payload": MathOperations.Add
                                    })
                            }
                        />
                    </Grid>
                    <Grid size={2}>
                        <NumButton display='0' action={appendNumber} />
                    </Grid>
                    <Grid size={1}>
                        <NumButton display='.' action={appendNumber} />
                    </Grid>
                    <Grid size={1}>
                        <MathButton display={"="}
                            action={
                                () => dispatch(
                                    {
                                        "type": DispatchTypes.Math,
                                        "payload": MathOperations.Eql
                                    })
                            }
                        />
                    </Grid>
                </Grid>
            </Paper >
        </Container >
    );

}