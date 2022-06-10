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
    backgroundColor: "orange",
    title: {
      fontSize: "3rem",
      fontWeight: "700",
    },
    link: {
      fontSize: "1.5rem",
      fontWeight: "700",
    },
  },

  learning: {
    button: {
      width: "50rem",
      height: "30rem",
      title: "5rem",
    },
  },
};

export { theme };
