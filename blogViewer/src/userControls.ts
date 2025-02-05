async function loggedInVerifier() {
  console.log("VERIFIER");
  try {
    const response = await fetch("http://localhost:3000/users/protected", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const json = await response.json();
    const user = await json.user;
    return (await user) || null;
  } catch (error) {
    console.log("Error", error);
  }
}

export { loggedInVerifier };
