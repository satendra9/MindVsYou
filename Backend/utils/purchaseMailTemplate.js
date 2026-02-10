export const purchaseMailTemplate = ({
  name,
  className,
  subject,
  driveLink,
}) => {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <p>Hi ${name},</p>

      <p>
        Thank you for purchasing <strong>${className} ${subject} Notes</strong>
        from <strong>MindvsYou Learning</strong>.
      </p>

      <p>
        📘 <strong>Download / View your notes here:</strong><br/>
        <a href="${driveLink}" target="_blank">${driveLink}</a>
      </p>

      <p style="color:#555;">
        Please keep this link for your personal use only and do not share it with others.
      </p>

      <p>
        If you face any issue accessing the file, feel free to reply to this email.
      </p>

      <p>
        Happy studying and all the best for your exams! 🎯
      </p>

      <br/>

      <p>
        Warm regards,<br/>
        <strong>Shilpi Singh</strong><br/>
        MindvsYou Learning
      </p>
    </div>
  `;
};
