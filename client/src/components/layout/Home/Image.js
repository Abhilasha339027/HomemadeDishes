import { withStyles } from "@material-ui/core";
import React from "react";
import artboard1 from "../../../media/1.gif";
import artboard2 from "../../../media/2.gif";
import artboard3 from "../../../media/3.gif";

const styles = {
  root: {
    width: "50%",
    marginLeft: "auto",
    marginRight: "auto",
  },
};

class Image extends React.Component {
  constructor(props) {
    super(props);
    this.state = { img: "" };
  }

  componentDidMount() {
    if (this.props.img === 0) {
      this.setState({ img: artboard1 });
    } else if (this.props.img === 1) {
      this.setState({ img: artboard2 });
    } else {
      this.setState({ img: artboard3 });
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <img src={this.state.img} width="200px" alt="img" />
      </div>
    );
  }
}

export default withStyles(styles)(Image);
