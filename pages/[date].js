import Head from 'next/head'
import Main from '../components/main';

export default function App({ data, latest }) {
  const image = data.photos[0];
  console.log(image);
  return (
    <>
      <Head>
        <title>Mars Rover Cam</title>
        <meta name="description" content="Pictures from the Perseverance Rover" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main url={image["img_src"]} title={image.camera["full_name"]} date={image.earth_date} latest={latest}/>
    </>
  )
}

export async function getStaticPaths() {
  function getDateX(firstDate, daysBack) {
    let yesterday = new Date(firstDate);
    yesterday.setDate(yesterday.getDate() - daysBack);
    return yesterday.toISOString().split("T")[0];
  }
  
  let currentDate = (
    await fetch(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/perseverance/latest_photos?api_key=${process.env.KEY}`
    ).then((r) => r.json())
  ).latest_photos[0].earth_date;
  
  return {
    paths: [...Array(180).keys()].map((x) => ({
      params: {
        date: getDateX(currentDate, x),
      },
    })),
    fallback: true
  };
}

export async function getStaticProps({ params }) {
  let currentDate = (
    await fetch(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/perseverance/latest_photos?api_key=${process.env.KEY}`
    ).then((r) => r.json())
  ).latest_photos[0].earth_date;

  let data = await fetch(
	`https://api.nasa.gov/mars-photos/api/v1/rovers/perseverance/photos?api_key=${process.env.KEY}&earth_date=${params.date}&camera=navcam_left`
  ).then((r) => r.json());
  return { props: { data, latest: currentDate == params.date ? true : false }, revalidate: 30 };
}