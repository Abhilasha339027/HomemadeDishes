import { useMutation } from "@apollo/client";
import { Box, Typography } from "@material-ui/core";
import React, { useContext, useEffect } from "react";
import { CalendlyEventListener, InlineWidget } from "react-calendly";
import { FormContext } from "../../../../contexts/chefApplicationForm";
import { CHEF_APPLICATION_COMPLETE } from "../../../../queries/chef";
import useStyles from "../../../../styles/GlobalStyles";

function Calendar() {
  const { values, handleChange, onChange } = useContext(FormContext);
  const classes = useStyles();

  const [chefApplicationComplete] = useMutation(CHEF_APPLICATION_COMPLETE, {
    onCompleted: (res) => console.log(res),
    onError: (err) => console.log(err),
  });

  useEffect(() => {
    handleChange({ ...values, target: { name: "refValue", value: "" } });
  }, []);

  useEffect(() => {
    if (!values.finish) {
      // console.log(values.finish);
      chefApplicationComplete();
    }
  }, [values.finish]);

  const enableFinish = () => {
    onChange({ refValue: 1, finish: false });
    // handleChange({ target: { value: false, name: "finish" } });
    // handleChange({ ...values, target: { value: 1, name: "refValue" } });
  };

  const disableFinish = () =>
    handleChange({ target: { value: true, name: "finish" } });

  return (
    <Box>
      <Box mx={20} textAlign="center">
        <Typography variant="h6" paragraph className={classes.fontBold}>
          Before you get started, we’d love to taste a few sample dishes from
          your menu.
        </Typography>
        <Typography variant="body1" paragraph className={classes.fontBold2}>
          We can't wait to taste your dishes! Please prepare 3 sample sizes main
          dishes from your menu. A sample size is 1.5 cups of food (just enough
          for our team to taste)! Select a no-touch drop-off to submit your
          samples.
        </Typography>
        <Typography variant="body1" paragraph className={classes.fontBold2}>
          Select a day and time and our team will reach out to coordinate sample
          drop off.
        </Typography>
      </Box>

      <CalendlyEventListener
        onEventTypeViewed={disableFinish}
        onEventScheduled={enableFinish}
      >
        <InlineWidget url="https://calendly.com/yummymaker/onboarding" />
        {/* <div style={{ height: "630px", width: "100%" }}> */}
        {/* <iframe
            title="Calendly Event Scheduler"
            height="100%"
            width="100%"
            frameBorder="0"
            src="https://calendly.com/shahzaibumaar953/30min"
          />
        </div> */}
      </CalendlyEventListener>
      {/* <InlineWidget
        styles={{ width: "100%", height: 800 }}
      /> */}
    </Box>
  );
}

export default Calendar;
