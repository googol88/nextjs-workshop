import Head from "next/head";
import Main from "../components/main";

export default function App({ data, latest }) {
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
      <Main images={data && data.photos} latest={data && data.latest} />
    </>
  );
}

export async function getStaticPaths() {
  function getDateX(firstDate, daysBack) {
    let date = new Date(firstDate);
    date.setDate(date.getDate() - daysBack);
    console.log(date);
    return date.toISOString().split("T")[0];
  }

  let currentDate = (
    await fetch(
      `https://api.nasa.gov/mars-photos/api/v1/manifests/perseverance?api_key=${process.env.KEY}`
    ).then((r) => r.json())
  ).photo_manifest.max_date;

  return {
    paths: [...Array(30).keys()].map((x) => ({
      params: {
        date: getDateX(currentDate, x),
      },
    })),
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  // later, add try catch block to catch 404s, see https://github.com/sampoder/intro-to-nextjs
  let currentDate = (
    await fetch(
      `https://api.nasa.gov/mars-photos/api/v1/manifests/perseverance?api_key=${process.env.KEY}`
    ).then((r) => r.json())
  ).photo_manifest.max_date;

  let data = await fetch(
    `https://api.nasa.gov/mars-photos/api/v1/rovers/perseverance/photos?api_key=${process.env.KEY}&earth_date=${params.date}`
  ).then((r) => r.json());
  return {
    props: { data, latest: currentDate == params.date },
    revalidate: 30,
  };
}
