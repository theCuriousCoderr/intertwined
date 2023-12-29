export default async function getHook(url, bearer = false) {
  try {
    let token = bearer && JSON.parse(localStorage.getItem("token"));
    let response;
    if (bearer) {
      response = await fetch(url, {
        mathod: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      response = await fetch(url);
    }
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
