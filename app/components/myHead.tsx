// myHead.tsx
import Head from 'next/head';

export default function MyHead() {
  return (
    <Head>
      {/* Agrega las etiquetas <link> y <script> aquí */}
      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v6.3.0/css/all.css"
        crossOrigin="anonymous"
      />
      {/* <link
        href="https://fonts.googleapis.com/css?family=Saira+Extra+Condensed:500,700"
        rel="stylesheet"
        type="text/css"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Muli:400,400i,800,800i"
        rel="stylesheet"
        type="text/css"
      /> */}
    </Head>
  );
}
