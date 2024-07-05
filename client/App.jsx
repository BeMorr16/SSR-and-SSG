import React, { Suspense } from "react";
import { lazy } from "react";
const LazyComponent = lazy(() => import('./LazyComponent.jsx'))
// function isomorphicAlert(message) {
//     if (typeof window !== "undefined") {
//         alert("window is available", message)
//     } else {
//         // default value
//     }
// }

function Home() {
    const [showInfo, setShowInfo] = React.useState(false);

  const toggleInfo = () => {
      setShowInfo(!showInfo);
  };

  return (
      <div>
          {!showInfo ? <h1 onClick={toggleInfo}>Homepage</h1> : <h1 onClick={toggleInfo}>Information</h1>}
          <Suspense fallback={<p>Loading..</p>}>
              <LazyComponent/>
          </Suspense>
    </div>
  );
}

export function HomePage() {
  return (
    <Layout>
      <Home />
    </Layout>
  );
}

// The Layout component defines the basic structure of the HTML document.
// It includes a <nav> element and a placeholder for child components.
export default function Layout({ children }) {
  return (
    <html>
      <head>
        <title></title>
        <link rel="" href=""></link>
      </head>
      <body>
        <nav>
          <ul>
            <li>Bens SSR react App</li>
          </ul>
        </nav>
        {children}
      </body>
    </html>
  );
}
