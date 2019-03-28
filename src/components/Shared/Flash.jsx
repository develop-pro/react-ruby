import React from 'react';
import styled from 'styled-components';
import { CSSTransition, TransitionGroup } from 'react-transition-group'

const Alert = ({ children, ...props }) => (
  <CSSTransition
    {...props}
    timeout={1000}
    classNames="alerts"
  >
    {children}
  </CSSTransition>
);

const StyledAlert = styled(Alert)`
  .alerts-leave {
    opacity: 1;
    padding-bottom: 15px;
    padding-top: 15px;
    margin-bottom: 20px;
    height: 50px;
  }
  .alerts-leave.alerts-leave-active {
    overflow: hidden;
    opacity: 0.01;
    padding-top: 0px;
    padding-bottom: 0px;
    margin-bottom: 0px;
    height: 0px;
    transition: opacity 300ms ease-in,
                padding-top 500ms ease-in,
                padding-bottom 500ms ease-in,
                margin-bottom 500ms ease-in,
                height 500ms ease-in;
  }
`

const Container = styled.div`
  margin-top: 20px;
`

const Button = styled.button`
  float: right;
  border: none;
  background: transparent;
  outline: 0;
`

export default class Flash extends React.Component {
  constructor(props) {
    super(props)
    this.state = {messages: props.messages}
  }

  componentWillReceiveProps() {
    this.setState({messages: this.props.messages})
  }

  handleRemove(i) {
    let newMessages = this.state.messages.slice();
    newMessages.splice(i, 1);
    this.setState({ messages: newMessages });
  }

  render() {
    return (
      <Container>
        <TransitionGroup className='alerts'>
          {this.state.messages.map((message, i) => (
            <StyledAlert key={i} className={`alert alert-${message.status}`}>
              <div>
                {`${message.message} `}
                <Button onClick={() => this.handleRemove(i)}>
                  &times;
                </Button>
              </div>
            </StyledAlert>
          ))}
        </TransitionGroup>
      </Container>
    );
  }
}
