import { Carousel } from "@material-tailwind/react";
 
export default function Gallery() {
  return (
    <Carousel
      className="rounded-xl flex"
      navigation={({ setActiveIndex, activeIndex, length }) => (
        <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
          {new Array(length).fill("").map((_, i) => (
            <span
              key={i}
              className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                activeIndex === i ? "bg-white w-8" : "bg-white/50 w-4"
              }`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      )}
    >
      <img
        src="https://images.pexels.com/photos/361186/forest-mushrooms-nature-autumn-361186.jpeg?cs=srgb&dl=pexels-pixabay-361186.jpg&fm=jpg"
        alt="image 1"
        className="h-full w-full object-cover"
      />
      <img
        src="https://c4.wallpaperflare.com/wallpaper/790/930/534/cenote-ik-kil-yucatan-peninsula-lake-cenotes-wallpaper-preview.jpg"
        alt="image 2"
        className="h-full w-full object-cover"
      />
      <img
        src='https://tvazteca.brightspotcdn.com/dims4/default/5b8f52b/2147483647/strip/true/crop/870x480+0+0/resize/968x534!/format/jpg/quality/80/?url=http%3A%2F%2Ftv-azteca-brightspot.s3.amazonaws.com%2F5f%2F25%2Fa53c82fb6a6d7c07e7b2728a8d2c%2F0'
        alt="image 3"
        className="h-full w-full object-cover"
      />
    </Carousel>
  );
}