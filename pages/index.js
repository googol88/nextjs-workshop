import Head from 'next/head'
import { useState } from 'react'
import styles from '../styles/Home.module.css'

export default function Home({ data }) {
  const [image, setImage] = useState(data["latest_photos"][0]);
  return (
    <div className={styles.container}>
      <Head>
        <title>Mars Rover Cam</title>
        <meta name="description" content="Pictures from the Perseverance Rover" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Mars Rover Cam
        </h1>
        <p className={styles.description}>
          Pictures from the Perseverance Rover
        </p>
        {/*data.map((image, id) => (
          <img key={id} src={image.img_src} alt={image.camera.full_name} />
        ))*/}
        <img src={image["img_src"]} alt={image.camera["full_name"]} />
      </main>

      <footer className={styles.footer}>
        {new Date().toLocaleDateString()}
      </footer>
    </div>
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