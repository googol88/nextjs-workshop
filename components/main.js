import Image from 'next/image';
import { useRouter } from 'next/router'
import Link from 'next/link'
import styles from '../styles/Main.module.css'

function getYesterday(firstDate) {
  let yesterday = new Date(firstDate);
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday.toISOString().split("T")[0];
}

function getTomorrow(firstDate) {
  let tomorrow = new Date(firstDate);
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split("T")[0];
}

export default function Main({ images }) {
  const router = useRouter();
  const image = images[0];
  const date = router.asPath === '/' ? image.earth_date : router.asPath.replace('/', '');
  return (
    <div className={styles.container}>

      <main className={styles.main}>
        {/*<h1 className={styles.title}>
          Mars Rover Cam
        </h1>
        <p className={styles.description}>
          Pictures from the Perseverance Rover
        </p>
        {data.map((image, id) => (
          <img key={id} src={image.img_src} alt={image.camera.full_name} />
        ))*/}
        {images ? (
          <>
            <div className={`${styles.img} ${styles.top} ${styles.left}`} style={{backgroundImage: `url(${images[0].img_src})`}}></div>
            <div className={`${styles.img} ${styles.top} ${styles.right}`} style={{backgroundImage: `url(${images[1].img_src})`}}></div>
            <div className={`${styles.img} ${styles.bottom} ${styles.left}`} style={{backgroundImage: `url(${images[2].img_src})`}}></div>
            <div className={`${styles.img} ${styles.bottom} ${styles.right}`} style={{backgroundImage: `url(${images[3].img_src})`}}></div>
            <p className={styles.label}>{image.camera.full_name}</p>
          </>
        ) : (
          <p>No picture available</p>
        )}
      </main>

      <footer className={styles.footer}>
        <Link href={`/${getYesterday(date)}`}>
          <a className={styles.btn}>&#x25C0;</a>
        </Link>
        <p className={styles.date}>{date}</p>
        <Link className={styles.btn} href={`/${getTomorrow(date)}`}>
          <a className={styles.btn}>&#x25B6;</a>
        </Link>
      </footer>
    </div>
  )
}