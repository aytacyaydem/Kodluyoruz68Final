import axios from 'axios';
import React, {useState} from 'react';

/*Api çağrıları yapmak için kullanılan Hooks'tur. 
Data gönderilmeyecekse boş string gönderilebilir.
*/
export default function useApi() {
  const API_URL = 'https://www.themealdb.com/api/json/v1/1/';
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function useRequest(endpoint, method, data, callback) {
    setLoading(true);
    const response = await axios({
      method: method,
      data: data ? data : '',
      url: API_URL + endpoint,
      headers: {
        'Content-Type': 'application/json',
      },
    }).catch((err) => setError(err));
    setResult(response.data);
    setLoading(false);
    callback && callback();
  }

  return {result, loading, error, useRequest};
}
