export {};

declare global {
  interface Window {
    drawConnectors: any;
    drawLandmarks: any;
  }
}
// https://robkendal.co.uk/blog/how-to-fix-property-does-not-exist-on-window-type-in-typescript
