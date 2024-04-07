export function sendRequest(url: string, method = "GET", data: any) {
  console.log(url, method, data);
  const requestOptions = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: data ? JSON.stringify(data) : null,
  };

  return fetch(url, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok (${response.status})`);
      }
      return response.json(); // This assumes the API returns JSON data
    })
    .then((data) => {
      return data; // You can process the data here if needed
    })
    .catch((error) => {
      console.error("Error:", error);
      throw error;
    });
}

export function sendRequestWithToken(
  url: string,
  method = "GET",
  data: any,
  token1 = null,
) {
  const requestOptions = {
    method: method,
    headers: {
      "Content-Type": "application/json", // Set the appropriate content type
      Authorization: `Bearer ${token1}`, // Add the bearer token header
    },
    body: data ? JSON.stringify(data) : null,
  };

  return fetch(url, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok (${response.status})`);
      }
      return response.json(); // This assumes the API returns JSON data
    })
    .then((data) => {
      return data; // You can process the data here if needed
    })
    .catch((error) => {
      console.error("Error:", error);
      throw error;
    });
}
