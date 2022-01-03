import Head from 'next/head'
import Main from '../components/main';

export default function App({ data }) {
  return (
    <>
      <Head>
        <title>Mars Rover Cam</title>
        <meta name="description" content="Pictures from the Perseverance Rover" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main data={data} />
    </>
  )
}

export async function getStaticProps() {
  /*let data = [];
  const cameras = [
    "NAVCAM_LEFT",
    "MCZ_LEFT",
    "MCZ_RIGHT",
    "SKYCAM"
  ];
  cameras.forEach(async (camera) => {
    const response = await fetch(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/perseverance/latest_photos?camera=${camera}&api_key=${process.env.KEY}`
    ).then((r) => r.json());
    data.push(response["latest_photos"][0]);
    console.log(data);
  });*/
  let data = await fetch(
	`https://api.nasa.gov/mars-photos/api/v1/rovers/perseverance/latest_photos?api_key=${process.env.KEY}&camera=navcam_left`
  ).then((r) => r.json());
  return { props: { data }, revalidate: 30 };
}