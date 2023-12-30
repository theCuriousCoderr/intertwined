export default async function postHook(url, payload, bearer = false) {
  try {
    let token = bearer && JSON.parse(localStorage.getItem("token"));
    let headers = !bearer
      ? { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
      : {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*"
        };

    let response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(payload),
    });
    let data = await response.json();
    if (response.status === 201) {
      return { success: data.message };
    } else if (response.status === 202) {
      return { warning: data.message };
    } else {
      return { error: data.message };
    }
  } catch (err) {
    return { error: "Request Failed" };
  }
}
