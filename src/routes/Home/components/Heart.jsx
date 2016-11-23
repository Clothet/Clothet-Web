import React from 'react';
import fullHeartImage from "../assets/full-heart.png";
import emptyHeartImage from "../assets/empty-heart.png";


class Heart extends React.Component{

  constructor(props) {
    super(props);

    //State初始值
    this.state = {
      isFull: this.props.isFull,
    };

  }

  handleClick = (e) => {
    console.log(this); // React Component instance
  }

  // static defaultProps = {
  //   autoPlay: false,
  //   maxLoops: 10,
  // }
  // static propTypes = {
  //   autoPlay: React.PropTypes.bool.isRequired,
  //   maxLoops: React.PropTypes.number.isRequired,
  //   posterFrameSrc: React.PropTypes.string.isRequired,
  //   videoSrc: React.PropTypes.string.isRequired,
  // }

  render() {
    return (
      <div className={this.props.className}/>
    );
  }
}


export default Heart;
