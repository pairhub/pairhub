import styled, { css, injectGlobal } from "styled-components";
import Tippy from "@tippy.js/react";
import {
  TwitterShareButton,
  FacebookShareButton,
  TwitterIcon,
  FacebookIcon
} from "react-share";

const socialButtonStyle = css`
  display: inline-block;
  vertical-align: top;
  outline: none;
  cursor: pointer;
`;

const TwitterButton = styled(TwitterShareButton)`
  ${socialButtonStyle}
`;

const FacebookButton = styled(FacebookShareButton)`
  ${socialButtonStyle}
`;

injectGlobal`
  .tippy-tooltip.social-theme {
    background-color: transparent;
    border-radius: 4px;
    box-shadow: none;
    padding: 0;
  }
`;

// shortens post with elipsis to keep content within
// twitter's 280 character limit
const truncateTweet = (text, max) =>
  text.substr(0, max).trim() + (text.length > max ? "..." : "");

const SocialButton = ({ post }) => {
  return (
    <Tippy
      content={
        <>
          <TwitterButton
            // url, hashtags, via, and elipsis make up 57 characters
            title={truncateTweet(post.content, 223)}
            url={`https://pairhub.io/@${post.author.username}`}
            hashtags={["pairprogramming"]}
            via={"pairhub"}
          >
            <TwitterIcon size={30} />
          </TwitterButton>
          <FacebookButton
            url={`https://pairhub.io/@${post.author.username}`}
            hashtag="#pairhub"
          >
            <FacebookIcon size={30} />
          </FacebookButton>
        </>
      }
      theme="social"
      duration={100}
      interactive={true}
    >
      <button>Share</button>
    </Tippy>
  );
};

export default SocialButton;
