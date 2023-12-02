import { URL } from "../config/config";

export async function fetchImageUrl(productId) {
    try {
        const response = await fetch(`${URL}/products/${productId}/images`);
        if (!response.ok) {
            throw new Error(`Failed to fetch images. Status: ${response.status}`);
        }
        const imageUrls = await response.json()
        return imageUrls;
    } catch (error) {
      console.error('Error in fetchImageUrl:', error);
      throw new Error(`An error occurred: ${error.message}`);
    }
  }
  