import { fetchPictures } from "@/features/pictures/api/fetchPictures";
import { usePicturesStore } from "@/features/pictures/store/picturesStore";
import PicturesGrid from "@/features/pictures/components/PictureGrid";
import Hydrate from "@/features/pictures/components/Hydrate";

export default async function Home() {
  const pictures = await fetchPictures(100);

  return <Hydrate pictures={pictures} />;
}
