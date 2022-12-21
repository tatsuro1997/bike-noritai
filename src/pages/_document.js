import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <boby>
          <div id="overlays" />
          <Main />
          <NextScript />
        </boby>
      </Html>
    );
  }
}

export default MyDocument;
