import { useContext, useState } from "react";
import { apiClient } from "../services/apis";
import { AuthContext } from "../Context/AuthContext";

const usePost = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { onOpenLoginModal } = useContext(AuthContext);

  const postData = async (postData) => {
    setLoading(true);
    try {
      const response = await apiClient.post(url, postData);
      setData(response.data);
      return response.data;
    } catch (err) {
      setError(err);
      console.log(err);
      if (err.response.status === 401) {
        onOpenLoginModal();
      }
      throw err.response.data.message;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, postData };
};

export default usePost;
