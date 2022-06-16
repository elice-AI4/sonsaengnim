// my-theme.ts
import { DefaultTheme } from "styled-components";

const theme: DefaultTheme = {
  borderRadius: "5px",

  colors: {
    main: "cyan",
    secondary: "magenta",
    my_red: "red",
    h1_color: "red",
    user_color: "blue",
  },

  text: {
    largest: "4rem",
  },

  navbar: {
    height: "7rem",
    backgroundColor: "transparent",
    title: {
      fontSize: "3rem",
      fontWeight: "700",
    },
    link: {
      fontSize: "2.0rem",
      fontWeight: "700",
      hoverLineColor: "#FFC774",
    },
  },

  learning: {
    button: {
      width: "45rem",
      height: "33rem",
      mediumWidth: "41rem",
      mediumHeight: "28rem",
      smallWidth: "35rem",
      smallHeight: "25rem",
      title: "5rem",
      mediumTitle: "4rem",
    },
    play: {
      darkBlue: "#2a306a",
      cyan: " #9adcdd",
    },
  },
};

export { theme };
