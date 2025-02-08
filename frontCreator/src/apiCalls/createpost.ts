export default async function createPost(values: any) {
  const res = await fetch(`${import.meta.env.VITE_HOST_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(values),
  });
  if (res.ok) {
    return { ...res, failure: false };
  } else return { message: res, failure: true };
}
