import React from "react"
import PropTypes from "prop-types"

const propTypes = {
    delayInMs: PropTypes.number,
    scrollStepInPx: PropTypes.number,
}

const defaultProps = {
  delayInMs: 10,
  scrollStepInPx: 50,
}

class ScrollUpButton extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      intervalId: 0,
      visibleClass: 'invisible',
    }

    this.handleScroll = this.handleScroll.bind(this)
    this.onScrollStep = this.onScrollStep.bind(this)
    this.scrollToTop = this.scrollToTop.bind(this)

  }

  componentDidMount() {
      window.addEventListener("scroll", this.handleScroll)
      window.scrollTo(0, 0);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll)
  }

  handleScroll() {
    if (window.scrollY > 170) {
      this.setState({ visibleClass: "visible"})
    } else {
      this.setState({ visibleClass: "invisible"})
    }
  }
  
  onScrollStep = () => {
      if (window.pageYOffset === 0){
          clearInterval(this.state.intervalId);
      }
      window.scroll(0, window.pageYOffset - this.props.scrollStepInPx);
  }

  scrollToTop = () => {
      let intervalId = setInterval(this.onScrollStep, this.props.delayInMs);
      this.setState({ intervalId: intervalId });
  }

  render(){
    return (
    <div className={this.state.visibleClass} onClick={this.scrollToTop} style={goTopStyle}>
      Go Top
    </div>
    )
  }
}

ScrollUpButton.propTypes = propTypes
ScrollUpButton.defaultProps = defaultProps
export default ScrollUpButton

const goTopStyle = {
  position: 'fixed',
  cursor: 'pointer',
  bottom: '30px',
  right: '0',
  color: '#ffffff',
  backgroundColor: 'darkseagreen',
  zIndex: '1',
  width: '90px',
  textAlign: 'center',
  height: '45px',
  borderRadius: '10px 0 0 10px',
  lineHeight: '46px',
  WebkitTransition: '0.5s',
  transition: '0.5s',

}
