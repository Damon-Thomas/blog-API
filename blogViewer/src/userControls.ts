async function loggedInVerifier() {
  console.log("VERIFIER");
  console.log(`${import.meta.env.VITE_HOST_URL}/users/protected`);
  try {
    const response = await fetch(
      `${import.meta.env.VITE_HOST_URL}/users/protected`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const json = await response.json();
    const user = await json.user;
    return (await user) || null;
  } catch (error) {
    console.log("Error", error);
  }
}

export { loggedInVerifier };
