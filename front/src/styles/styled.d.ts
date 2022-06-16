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

    navbar: {
      height: string;
      backgroundColor: string;
      title: {
        fontSize: string;
        fontWeight: string;
      };
      link: {
        fontSize: string;
        fontWeight: string;
        hoverLineColor: string;
      };
    };

    learning: {
      button: {
        width: string;
        height: string;
        mediumWidth: string;
        mediumHeight: string;
        smallWidth: string;
        smallHeight: string;
        title: string;
        mediumTitle: string;
      };
      play: {
        darkBlue:string;
      }
    };
  }
}
