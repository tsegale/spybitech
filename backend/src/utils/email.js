// Real email delivery is a later task. For now this just logs the reset
// link so the flow can be tested end to end without an email provider.
async function sendPasswordResetEmail(email, resetLink) {
  console.log(`[email stub] Password reset requested for ${email}`);
  console.log(`[email stub] Reset link: ${resetLink}`);
}

module.exports = { sendPasswordResetEmail };
