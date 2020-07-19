/** @format */

import React, { Component } from "react";
import { connect } from "react-redux";
import { NotFasting, Fasting, ReadyToFast } from "components";

class Home extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    if (this.props.isFasting) {
      return <Fasting navigation={this.props.navigation}/>;
    } else if (this.props.isReady) {
      return <ReadyToFast navigation={this.props.navigation}/>;
    } else {
      return <NotFasting navigation={this.props.navigation} />;
    }
  }
}

const mapStateToProps = state => ({
  isFasting: state.timer.isFasting,
  isReady: state.timer.isReady
});

export default connect(mapStateToProps)(Home);
