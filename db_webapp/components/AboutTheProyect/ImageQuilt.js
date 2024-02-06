import Image from 'next/image';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Difacquim1 from '@public/Difacquim_1.jpg'; // Adjust the relative path
import Difacquim2 from '@public/Difacquim_2.jpg'; // Adjust the relative path
import Herbology from '@public/herbology.jpg'; // Adjust the relative path

const itemData = [
  {
    img: Difacquim1,
    title: 'Breakfast',
    rows: 2,
    cols: 2,
  },
  {
    img: Difacquim2,
    title: 'equipo',
    rows: 2,
    cols: 2,
  },
  {
    img: Herbology,
    title: 'Breakfast',
    rows: 2,
    cols: 2,
  },
  // Add more items as needed
];

export default function QuiltedImageList() {
  return (
    <ImageList sx={{ width: 500, height: 450 }} variant="quilted" cols={4} rowHeight={121}>
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
    </ImageList>
  );
}
