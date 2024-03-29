exports = async function onUserCreation(user) {
  const customUserDataCollection = context.services
    .get("mongodb-atlas")
    .db("PlantHealthcare")
    .collection("users");
  try {
    await customUserDataCollection.insertOne({
      // Save the user's account ID to your configured user_id_field
      user_id: user.id,
      // Store any other user data you want
      role: "default",
      email: user.data.email
    });
  } catch (e) {
    console.error(`Failed to create custom user data document for user:${user.id}`);
    throw e
  }
}