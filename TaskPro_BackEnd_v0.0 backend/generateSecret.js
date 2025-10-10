const fs = require("fs");
const crypto = require("crypto");

const generateRandomSecret = () => {
  return crypto.randomBytes(32).toString("hex");
};

const existingEnvPath = ".env";
const secretToken = "ACCESS_TOKEN_KEY";
const refreshToken = "REFRESH_TOKEN_KEY";

// Check if the .env file exists
if (fs.existsSync(existingEnvPath)) {
  // Read existing .env file content
  const existingEnvContent = fs.readFileSync(existingEnvPath, "utf-8");

  // Check if keys already exist in .env file content
  if (
    existingEnvContent.includes(secretToken) &&
    existingEnvContent.includes(refreshToken)
  ) {
    console.log(
      `The keys "${secretToken}" and "${refreshToken}" already exist in the .env file. There is no need to generate them.`
    );
  } else {
    // Generate keys
    const secretKey = generateRandomSecret();
    const refreshSecretKey = generateRandomSecret();

    // Update or add keys to .env file content
    let updatedEnvContent = existingEnvContent;
    if (!existingEnvContent.includes(secretToken)) {
      updatedEnvContent += `\n${secretToken.toUpperCase()}=${secretKey}`;
    }
    if (!existingEnvContent.includes(refreshToken)) {
      updatedEnvContent += `\n${refreshToken.toUpperCase()}=${refreshSecretKey}`;
    }

    // Write updated content to .env file
    fs.writeFileSync(existingEnvPath, updatedEnvContent);

    console.log("Secrets generated and added to .env file.");
  }
} else {
  console.error(
    "The .env file does not exist. Make sure it has been created in the current directory."
  );
}
