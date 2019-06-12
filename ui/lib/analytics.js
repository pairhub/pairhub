import ReactGA from "react-ga";
import Router from "next/router";

export const initGA = () => {
  ReactGA.initialize("UA-7337696-12");
};

export const logPageView = () => {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
  console.log(window.location.pathname);
};

export function logPageViews() {
  Router.events.on("routeChangeComplete", url => {
    logPageView();
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
