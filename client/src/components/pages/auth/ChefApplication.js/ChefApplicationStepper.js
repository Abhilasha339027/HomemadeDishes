import React, { useContext } from "react";
import {
  Box,
  Button,
  Divider,
  Step,
  StepLabel,
  Stepper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { FormContext } from "../../../../contexts/chefApplicationForm";
import AddReferrer from "./AddReferrer";
import Summary from "./Summary";
import { useStyles } from "@material-ui/pickers/views/Calendar/Day";
import Calendar from "./Calendar";

function getSteps() {
  return ["How It Works", "Add Reference", "Deliver Food Samples"];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return <Summary />;

    case 1:
      return <AddReferrer />;

    case 2:
      return (
        <Box textAlign="center">
          <Calendar />
        </Box>
      );

    default:
      return "Unknown step ";
  }
}

function ChefApplicationStepper(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const { values } = useContext(FormContext);
  const isXs = useMediaQuery((theme) => theme.breakpoints.down("xs"));
  const theme = useTheme();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  if (activeStep === steps.length) {
    props.handleApplicationOpen();
  }

  return (
    <Box className={classes.newBackground1}>
      <div className={classes.newBackground1}>
        <Stepper
          activeStep={activeStep}
          orientation={isXs ? "vertical" : "horizontal"}
          style={{ backgroundColor: theme.palette.secondary.extra }}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>

      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed
            </Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            {getStepContent(activeStep)}
            <Divider />
            <Box mx="auto" width={150} my={2}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                // className={classes.backButton}
              >
                Back
              </Button>
              <Button
                disabled={
                  !values.finish && values?.refValue && values.refValue !== ""
                    ? false
                    : true
                }
                variant="contained"
                color="primary"
                onClick={handleNext}
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </Box>
          </div>
        )}
      </div>
    </Box>
  );
}

export default ChefApplicationStepper;
