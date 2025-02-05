export default async function postComment(values: any, postId: string) {
  console.log("values", values);
  const response = await fetch(
    `${import.meta.env.VITE_HOST_URL}/comments/${postId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },

      body: JSON.stringify({ values }),
    }
  );
  return await response.json();
}
