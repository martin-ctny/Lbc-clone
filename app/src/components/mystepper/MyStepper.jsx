import { Step, StepLabel, Stepper } from "@mui/material";
import React from "react";

const steps = ["Step 1", "Step 2"];

function MyStepper({ activeStep }) {
  return (
    <Stepper activeStep={activeStep} alternativeLabel>
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}

export default MyStepper;
