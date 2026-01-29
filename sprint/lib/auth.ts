export async function fetchWithAuth(url: string, accessToken: string) {
  let res = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (res.status === 401) {
    const refreshRes = await fetch("/api/auth/refresh", { method: "POST" });
    const data = await refreshRes.json();

    res = await fetch(url, {
      headers: { Authorization: `Bearer ${data.accessToken}` },
    });
  }

  return res;
}
