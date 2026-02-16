import { Picture } from "../types";

export async function fetchPictures(limit: number = 100): Promise<Picture[]> {
  try {
    const res = await fetch(
      `https://picsum.photos/v2/list?limit=${limit}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch pictures");
    }

    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}
