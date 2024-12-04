import { useEffect } from "react";
import styled from "styled-components"

interface StepControlProps {
    currentStep: number;
    steps: string[];
    nextStep: () => void;
    prevStep: () => void;
}

const BtControll = styled.div`
    button{
        background-color: white;
        border: 1px solid #ccc;
        cursor: pointer;
        font-size: 14px;
        color: #00b2a9 ;
        border-radius: 3px;
        padding: 5px 20px;
    }
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
`


const StepControl = (props: StepControlProps) => {
    useEffect(() => {
        // window.scrollTo(0, 0);
    })
    return (
        <div className="d-flex justify-content-between mt-4">
            <BtControll>
                {props.currentStep > 1 && (
                    <button className="btn btn-secondary" type="button" onClick={props.prevStep}>
                        Previous
                    </button>
                )}
                {props.currentStep < props.steps.length && (
                    <button className="btn btn-secondary" type="button" onClick={props.nextStep}>
                        Next
                    </button>
                )}
                {props.currentStep === props.steps.length && (
                    <button className="btn btn-secondary" type="button" onClick={props.nextStep}>
                        Submit
                    </button>
                )}
            </BtControll>

        </div>
    )
}
export default StepControl;
