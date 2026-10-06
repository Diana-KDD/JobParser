export function createUrlRequest(apiUrl, params) {
  const paramsUrl = new URLSearchParams();
  for (let key in params) {
    paramsUrl.set(key, params[key]);
  }

  const urlRequest = new URL(apiUrl);
  urlRequest.search = paramsUrl.toString();

  return urlRequest;
}

export async function parsing(apiKey, url) {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "Application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    });

    if (response.ok) {
      const resJson = await response.json();
      return resJson.data;
    }
    return [];
  } catch (error) {
    console.log(error);
  }
}
