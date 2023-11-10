import axios from 'axios';
import { useState } from 'react'


/**
 * A hook that handles sending a POST request to an API endpoint.
 *
 * @param {string} url - The URL of the API endpoint.
 * @param {object} postData - The data to be sent in the POST request.
 * @return {object} - An object containing the response data, error, loading state, and a function to send the POST request.
 */
const useApiPost = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
  
    const sendPostRequest = async (url, postData) => {
      try {
        setLoading(true);
        const response = await axios.post(url, postData);
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
  
    return { data, error, loading, sendPostRequest };
}

export default useApiPost