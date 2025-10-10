async function sendEmail(data) {
  console.log("📧 Email (Development Mode):");
  console.log("To:", data.to);
  console.log("Subject:", data.subject);
  console.log("Content:", data.text);
  console.log("─".repeat(50));

  // In development, always return success without actually sending
  return true;
}

module.exports = sendEmail;
