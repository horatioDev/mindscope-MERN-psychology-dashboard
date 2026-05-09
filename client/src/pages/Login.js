const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await loginUser(formData);

    // Store JWT token
    localStorage.setItem("token", response.data.token);

    // Store logged in user
    localStorage.setItem("user", JSON.stringify(response.data));

    // Redirect to dashboard
    window.location.href = "/";

  } catch (error) {
    console.log(error);
  }
};
