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

// shortens post with elipsis to keep tweet within 280 character limit
const truncateTweet = (text, max) =>
  text.substr(0, max).trim() + (text.length > max ? "..." : "");

const SocialButton = ({ post }) => {
  return (
    <Tippy
      content={
        <>
          <TwitterButton
            // url, hashtags, via, and elipsis make up 52 characters
            title={truncateTweet(post.content, 228)}
            url={`https://pairhub.io/post/${post._id}`}
            hashtags={["pairwithme"]}
            via={"pairhub"}
          >
            <TwitterIcon size={30} />
          </TwitterButton>
          <FacebookButton
            url={`https://pairhub.io/post/${post._id}`}
            hashtag="#pairwithme"
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
