import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    borderRadius: string;

    colors: {
      main: string;
      secondary: string;
      my_red: string;
      h1_color: string;
      user_color: string;
    };

    text: {
      largest: string;
    };
  }
}
