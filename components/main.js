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
  const date = router.asPath === '/' ? images[0].earth_date : router.asPath.replace('/', '');
  const corner = [
    (styles.top+' '+styles.left),
    (styles.top+' '+styles.right),
    (styles.bottom+' '+styles.left),
    (styles.bottom+' '+styles.right)
  ];
  return (
    <div className={styles.container}>

      <main className={styles.main}>
        {images ? (
          <>
            {images.slice(0, 4).map((image, index) => {
              <a key={index} href={images.img_src}>
                <div className={`${styles.img} ` + corner[index]} style={{backgroundImage: `url(${image.img_src})`}}></div>
              </a>
            })}
            {/*<div className={`${styles.img} ${styles.top} ${styles.left}`} style={{backgroundImage: `url(${images[0].img_src})`}}></div>
            <div className={`${styles.img} ${styles.top} ${styles.right}`} style={{backgroundImage: `url(${images[1].img_src})`}}></div>
            <div className={`${styles.img} ${styles.bottom} ${styles.left}`} style={{backgroundImage: `url(${images[2].img_src})`}}></div>
            <div className={`${styles.img} ${styles.bottom} ${styles.right}`} style={{backgroundImage: `url(${images[3].img_src})`}}></div>*/}
            <p className={styles.label}>{images[0].camera.full_name}</p>
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