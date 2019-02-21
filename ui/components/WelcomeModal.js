import { Component } from 'react';

import { WelcomeContainer, Arrow, ProgressDots, ProgressDot } from '../styles/WelcomeModal';
import { Button, CardContainer } from '../styles/Shared';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import {
  faArrowCircleRight,
  faArrowCircleLeft,
  faCircle,
  faExternalLinkAlt,
} from '@fortawesome/free-solid-svg-icons';

const cards = [
  <>
    <a href="https://github.com/pairhub/pairhub" target="_blank">
      <img src="/static/github-star.gif" />
    </a>

    <h2>Give PairHub a star on GitHub! 🙏✨</h2>

    <p>
      PairHub is free and open source. You can help the project gain some exposure by giving a star
      on{' '}
      <a href="https://github.com/pairhub/pairhub" target="_blank">
        GitHub
      </a>
      . There you can also become a contributor, report issues and suggest features!
    </p>
    <a href="https://github.com/pairhub/pairhub" target="_blank">
      <Button>
        Go to repo <Icon icon={faExternalLinkAlt} />
      </Button>
    </a>
  </>,
  <>
    <h2>Also, join the Gitter chat and say hi!</h2>

    <p>
      By joining Gitter (with your GitHub account) you will be able to receive direct messages from
      other users.
    </p>
    <a href="https://gitter.im/pairhub/Lobby" target="_blank">
      <Button>
        Go to chat <Icon icon={faExternalLinkAlt} />
      </Button>
    </a>
  </>,
];

class WelcomeModal extends Component {
  state = {
    step: 0,
  };

  componentWillMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.key === 'ArrowRight') {
      this.nextCard();
    } else if (e.key === 'ArrowLeft') {
      this.prevCard();
    }
  };

  nextCard = () => {
    if (this.state.step < cards.length - 1) this.setState({ step: this.state.step + 1 });
  };

  prevCard = () => {
    if (this.state.step > 0) this.setState({ step: this.state.step - 1 });
  };

  setCard = step => {
    this.setState({ step });
  };

  render() {
    return (
      <>
        <WelcomeContainer>
          <Arrow onClick={this.prevCard} active={this.state.step > 0}>
            <Icon icon={faArrowCircleLeft} />
          </Arrow>
          <CardContainer>{cards[this.state.step]}</CardContainer>
          <Arrow onClick={this.nextCard} active={this.state.step < cards.length - 1}>
            <Icon icon={faArrowCircleRight} />
          </Arrow>
        </WelcomeContainer>
        <ProgressDots>
          {cards.map((_, i) => (
            <ProgressDot key={i} onClick={() => this.setCard(i)} filled={i <= this.state.step}>
              <Icon icon={faCircle} />
            </ProgressDot>
          ))}
        </ProgressDots>
      </>
    );
  }
}
export default WelcomeModal;

// <li>Join Gitter chat</li>
// <li>Create your first post</li>
// <li>Read guide</li>
// <li>Read code of conduct</li>
