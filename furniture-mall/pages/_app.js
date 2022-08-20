import { useRef, useState } from 'react';
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import { useRouter } from "next/router";

const Noop = ({ children }) => <>{children}</>;

function MyApp({ Component, pageProps }) {

  const router = useRouter();
	const Layout = (Component).Layout || Noop;
  
  const queryClientRef = useRef();
	if (!queryClientRef.current) {
		queryClientRef.current = new QueryClient();
	}

  return (
      <QueryClientProvider client={queryClientRef.current}>
          <Hydrate state={pageProps.dehydratedState}>
            <Layout pageProps={pageProps}>
                <Component {...pageProps} key={router.route} />
            </Layout>
          </Hydrate>
      </QueryClientProvider>
  )

}

export default MyApp;