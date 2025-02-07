import nodemailer from "nodemailer";
import { MyEnvs } from "@/lib/envs";

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: MyEnvs.EMAIL_SERVER_USER,
      pass: MyEnvs.EMAIL_SERVER_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: `"Tu App" <${MyEnvs.EMAIL_FROM}>`,
    to,
    subject,
    html,
  });
}
