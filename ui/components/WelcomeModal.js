import { Component } from "react";
import styled from "styled-components";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleRight,
  faArrowCircleLeft,
  faCircle,
  faExternalLinkAlt
} from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CardContainer = styled.div`
  max-width: 520px;
  background: white;
  border-radius: 8px;
  min-height: 300px;
  padding: 30px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h2 {
    margin: 10px 0;
    font-size: 24px;
    font-weight: 500;
    line-height: 1.33;
  }
  p {
    color: #62676d;
    font-size: 18px;
    line-height: 1.5;
    margin-top: 8px;
  }
  img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
  }
`;

const Arrow = styled.div`
  font-size: 50px;
  padding: 20px;
  color: ${props => (props.active ? "rgba(0, 0, 0, 0.3)" : "rgba(0,0,0,0)")};
  cursor: ${props => (props.active ? "pointer" : "default")};
  &:hover {
    color: ${props => (props.active ? "rgba(0, 0, 0, 0.8)" : "rgba(0,0,0,0)")};
  }
  @media only screen and (max-width: 750px) {
    font-size: 30px;
    padding: 5px;
  }
`;

const ProgressDots = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
`;

const ProgressDot = styled.div`
  cursor: pointer;
  color: ${props => (props.filled ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0.2)")};
  padding: 5px;
  font-size: 14px;
  &:hover {
    color: rgba(0, 0, 0, 0.6);
  }
`;
export const Button = styled.button`
  background: #0000ff;
  display: block;
  color: white;
  font-size: 14px;
  padding: 18px 22px;
  border-radius: 6px;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 500;
  border: 0;
  cursor: pointer;
  transition: background-color 50ms ease-in-out;

  &:hover {
    background: #0000af;
  }
`;

const cards = [
  <>
    <a href="https://github.com/pairhub/pairhub" target="_blank">
      <img src="/static/github-star.gif" />
    </a>

    <h2>Give PairHub a star on GitHub! 🙏✨</h2>

    <p>
      PairHub is free and open source. You can help the project gain some
      exposure by giving a star on{" "}
      <a href="https://github.com/pairhub/pairhub" target="_blank">
        GitHub
      </a>
      . There you can also become a contributor, report issues and suggest
      features!
    </p>
    <a href="https://github.com/pairhub/pairhub" target="_blank">
      <Button>
        Go to repo <Icon icon={faExternalLinkAlt} />
      </Button>
    </a>
  </>,
  <>
    <h2>We've sent a Slack invite to your email</h2>
    <p>Join and say hi! 👋</p>
  </>
];

const WelcomeModal = () => {
  const [step, setStep] = React.useState(0);

  const handleKeyDown = e => {
    if (e.key === "ArrowRight") {
      nextCard();
    } else if (e.key === "ArrowLeft") {
      prevCard();
    }
  };

  React.useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  const nextCard = () => {
    if (step < cards.length - 1) setStep(step + 1);
  };

  const prevCard = () => {
    if (step > 0) setStep(step - 1);
  };

  const setCard = step => {
    setStep(step);
  };

  return (
    <>
      <Container>
        <Arrow onClick={prevCard} active={step > 0}>
          <Icon icon={faArrowCircleLeft} />
        </Arrow>
        <CardContainer>{cards[step]}</CardContainer>
        <Arrow onClick={nextCard} active={step < cards.length - 1}>
          <Icon icon={faArrowCircleRight} />
        </Arrow>
      </Container>
      <ProgressDots>
        {cards.map((_, i) => (
          <ProgressDot key={i} onClick={() => setCard(i)} filled={i === step}>
            <Icon icon={faCircle} />
          </ProgressDot>
        ))}
      </ProgressDots>
    </>
  );
};

export default WelcomeModal;
