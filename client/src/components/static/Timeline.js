import React from "react";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import ExploreIcon from "@material-ui/icons/Explore";
import Payment from "@material-ui/icons/Payment";
import ChatIcon from "@material-ui/icons/Chat";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import useStyles from "../../styles/GlobalStyles";

export default function MyTimeline() {
  const classes = useStyles();

  return (
    <Timeline align="alternate">
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot color="secondary">
            <ExploreIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={5} className={classes.paper}>
            <Typography
              variant="h6"
              component="h3"
              className={classes.fontBold}
              color="textSecondary"
            >
              Explore
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              Once you sign up or login into your account, you can browse for
              your meal of choice by category, location or Yummymakers.
            </Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot color="secondary">
            <Payment />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={5} className={classes.paper}>
            <Typography
              variant="h6"
              component="h3"
              className={classes.fontBold}
              color="textSecondary"
            >
              Order And Pay
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              Once you select a meal of your choice and you make payment, you'll
              be instantly connected with a local chef of your choosing.
            </Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot color="secondary">
            <ChatIcon />
          </TimelineDot>
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={5} className={classes.paper}>
            <Typography
              color="textSecondary"
              variant="h6"
              component="h3"
              className={classes.fontBold}
            >
              Connect
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              To make your yummy experience even more pleasurable, you can
              easily connect with selected local chefs to discuss details of
              your meal and probably become best buddies.
            </Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}
