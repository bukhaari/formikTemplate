import React, { useState } from "react";
import { Formik, Form } from "formik";
import BaseBtn from "../controllers/BaseBtn";
import { Stepper, Step, StepLabel, CircularProgress } from "@material-ui/core";

function FormikStepper({ children, ...props }) {
  const childrenArray = React.Children.toArray(children);
  const [step, setStep] = useState(0);
  const [complated, setComplated] = useState(false);
  const currentChild = childrenArray[step];

  function isLastStep() {
    return step === childrenArray.length - 1;
  }

  return (
    <Formik
      {...props}
      onSubmit={async (values, helpers) => {
        if (isLastStep()) {
          await props.onSubmit(values, helpers);
          setComplated(true);
        } else {
          setStep((s) => s + 1);
        }
      }}
      validationSchema={currentChild.props.validationSchema}
    >
      {({ isSubmitting }) => (
        <Form autoComplete="off">
          <Stepper alternativeLabel activeStep={step}>
            {childrenArray.map((child, index) => (
              <Step
                key={child.props.label}
                completed={step > index || complated}
              >
                <StepLabel>{child.props.label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {currentChild}
          {step > 0 ? (
            <BaseBtn
              onClick={() => setStep((s) => s - 1)}
              type="button"
              label="Back"
              marginRight="2px"
              disabled={isSubmitting}
            />
          ) : null}

          <BaseBtn
            disabled={isSubmitting}
            label={isLastStep() ? "Submit" : "Next"}
            startIcon={isSubmitting ? <CircularProgress size="1rem" /> : null}
          />
        </Form>
      )}
    </Formik>
  );
}

function FormikStep({ children }) {
  return <>{children}</>;
}

export { FormikStepper, FormikStep };
