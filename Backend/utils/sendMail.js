import Brevo from "@getbrevo/brevo";

const apiInstance = new Brevo.TransactionalEmailsApi();

apiInstance.setApiKey(
  Brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

export const sendMail = async ({ to, subject, html }) => {
  await apiInstance.sendTransacEmail({
    sender: { email: "mindvsyou1@email.com", name: "MindvsYou Learning" },
    to: [{ email: to }],
    subject,
    htmlContent: html,
  });
};

