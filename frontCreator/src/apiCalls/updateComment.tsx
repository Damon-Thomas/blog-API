export default async function updatecomment(values: any, commentId: string) {
  const res = await fetch(
    `${import.meta.env.VITE_HOST_URL}/comments/${commentId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(values),
    }
  );
  if (res.ok) {
    console.log("Comment updated successfully", res);
    return { ...res, failure: false };
  } else return { message: res, failure: true };
}
