import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }
  render() {
    return (
      <Html>
        <Head>
          {/* Geosearch ESRI leaflet */}
          {/* <link
            rel="stylesheet"
            href="https://unpkg.com/leaflet/dist/leaflet.css"
          />
          <script src="https://unpkg.com/leaflet/dist/leaflet-src.js"></script>

          <script src="https://unpkg.com/esri-leaflet"></script>

          <link
            rel="stylesheet"
            href="https://unpkg.com/esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css"
          />
          <script src="https://unpkg.com/esri-leaflet-geocoder"></script> */}

          {/* <style>
      #map {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
      }
    </style> */}
          <script
            src="https://upload-widget.cloudinary.com/global/all.js"
            type="text/javascript"
          ></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
export default MyDocument;
