import Image from 'next/image';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Difacquim1 from '@public/Difacquim_1.jpg'; // Adjust the relative path
import Difacquim2 from '@public/Difacquim_2.jpg'; // Adjust the relative path
import Difacquim3 from '@public/Difacquim_3.jpg'; // Adjust the relative path
import Difacquim4 from '@public/Difacquim_4.jpg'; // Adjust the relative path
import Difacquim5 from '@public/Difacquim_5.jpeg'; // Adjust the relative path
import styles from '@components/AboutTheProyect/styles.css'



const itemData = [
  {
    img: Difacquim5,
    title: 'equipo',
    rows: 5,
    cols: 5,
  },
  {
    img: Difacquim2,
    title: 'equipo',
    rows: 5,
    cols: 5,
  },
  {
    img: Difacquim1,
    title: 'Breakfast',
    rows: 5,
    cols: 5,
  },

  {
    img: Difacquim3,
    title: 'Graduation',
    rows: 5,
    cols: 5,
  }

  // Add more items as needed
];

export default function QuiltedImageList() {
  return (
<div className={'image-list-container'}>
      <div className={`quilted-list`}>
        {itemData.map((item) => (
          <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
            <Image
              src={item.img}
              alt={item.title}
              width={121 * (item.cols || 1)}
              height={121 * (item.rows || 1)}
              layout="responsive"
              loading="lazy"
            />
          </ImageListItem>
        ))}
        
      </div>
    </div>
  );
}
