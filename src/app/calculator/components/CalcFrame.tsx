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
        NoneSelected = "none", //used only in error situations

    };
    enum DispatchTypes {
        Num = "number",
        Math = "math",
        Clear = "clear",
        Percent = "percent",
        Eql = "equals", //the "done" function really
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
        } |
        {
            "type": DispatchTypes.Eql
        }
        ;

    type CalcState = {
        displayValue: string,
        runningAnswer?: number
        hasEqualBeenPushed: boolean
        currentOperation?: MathOperations,
        lastOperand: number
    };

    const defaultCalcState: CalcState = {
        displayValue: '0',
        hasEqualBeenPushed: false,
        lastOperand: 0,
        currentOperation: undefined

    };

    const [state, dispatch] = useReducer(reducer, defaultCalcState)


    function reducer(calcState: CalcState, action: CalcAction): CalcState {
        switch (action.type) {
            case DispatchTypes.Num:
                let newValString;
                if (calcState.displayValue == '0') {
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
                //maybe we have if else statements here
                if (action.payload == MathOperations.Inv) {
                    const toInvert = parseFloat(calcState.displayValue) * -1;
                    return ({
                        ...calcState,
                        displayValue: toInvert.toString(),
                    });
                }
                else { //all other math actions should have shared work
                    let currentOperation: MathOperations = MathOperations.NoneSelected;
                    const numInDisplay: number = parseFloat(calcState.displayValue);
                    switch (action.payload) {
                        case MathOperations.Add:
                            currentOperation = MathOperations.Add;
                            break;
                        case MathOperations.Sub:
                            currentOperation = MathOperations.Sub;
                            break;
                        case MathOperations.Mult:
                            currentOperation = MathOperations.Mult;
                            break;
                        case MathOperations.Div:
                            currentOperation = MathOperations.Div;
                            break;
                    }
                    return ({
                        ...calcState,
                        runningAnswer: numInDisplay,
                        currentOperation: currentOperation,
                        displayValue: '0',
                        lastOperand: numInDisplay
                    });

                }
            case DispatchTypes.Eql:
                if (calcState.currentOperation == null || calcState.runningAnswer === undefined) {
                    return (defaultCalcState);
                }
                //let toReturn = { ...calcState }
                let lastOperand = calcState.lastOperand;
                let hasEqualBeenPushed = calcState.hasEqualBeenPushed;

                const displayAsNum = parseFloat(calcState.displayValue);
                if (!hasEqualBeenPushed) {
                    lastOperand = displayAsNum; //this ensures we don't double
                    hasEqualBeenPushed = true;
                }

                //TODO: need to add code so total is determined 
                //if there's a last operand. And so save the last operand.
                //This might be a bit difficult or complex so maybe we need to 
                //extrapolate it out
                let runningAnswer = calcState.runningAnswer
                switch (calcState.currentOperation) {
                    case MathOperations.Add:
                        runningAnswer = lastOperand + calcState.runningAnswer;
                        break;
                    case MathOperations.Sub:
                        runningAnswer = calcState.runningAnswer - lastOperand;
                        break;
                    case MathOperations.Div:
                        runningAnswer = calcState.runningAnswer / lastOperand;
                        break;
                    case MathOperations.Mult:
                        runningAnswer = calcState.runningAnswer * lastOperand;
                        break;
                }
                return ({
                    ...calcState,
                    hasEqualBeenPushed: hasEqualBeenPushed,
                    lastOperand: lastOperand,
                    runningAnswer: runningAnswer,
                    displayValue: runningAnswer.toString(),
                });
            case DispatchTypes.Percent:
                const dispAsNum = parseFloat(calcState.displayValue);
                const shiftenDisplayNum = dispAsNum * .01;
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
                    <MathButton display={"Clear"}
                        mathButtonAction=
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
                        isCurrentOperation={false}
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
                        isCurrentOperation={state.currentOperation == MathOperations.Div}
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
                        isCurrentOperation={state.currentOperation == MathOperations.Mult}
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
                        isCurrentOperation={state.currentOperation == MathOperations.Sub}
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
                        isCurrentOperation={state.currentOperation == MathOperations.Add}
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
                                    "type": DispatchTypes.Eql,
                                })
                        }
                    />
                </Grid>
            </Grid>
        </Container >
    );

}