import ReactGA from "react-ga";
import Router from "next/router";

export const initGA = () => {
  ReactGA.initialize("UA-7337696-12");
};

export const logPageView = ({ url }) => {
  ReactGA.set({ page: url });
  ReactGA.pageview(url);
};

export function logPageViews() {
  Router.events.on("routeChangeComplete", url => {
    logPageView(url);
  });
}

export const logEvent = (category = "", action = "") => {
  if (category && action) {
    ReactGA.event({ category, action });
  }
};
export const logException = (description = "", fatal = false) => {
  if (description) {
    ReactGA.exception({ description, fatal });
  }
};
