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
    largest: "2rem",
  },

  navbar: {
    height: "7rem",
    backgroundColor: "orange",
    link: {
      fontSize: "1.5rem",
      fontWeight: "700",
    },
  },
};

export { theme };
