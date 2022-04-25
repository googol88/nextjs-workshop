import Head from "next/head";
import Main from "../components/main";

export default function App({ data }) {
  return (
    <>
      <Head>
        <title>Mars Rover Cam</title>
        <meta
          name="description"
          content="Pictures from the Perseverance Rover"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main images={data.latest_photos} latest={true} />
    </>
  );
}

export async function getStaticProps() {
  let data = await fetch(
    `https://api.nasa.gov/mars-photos/api/v1/rovers/perseverance/latest_photos?api_key=${process.env.KEY}`
  ).then((r) => r.json());
  return { props: { data }, revalidate: 30 };
}
