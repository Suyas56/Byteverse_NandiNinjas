export function generateVerificationOtpEmailTemplate(otpCode) {
    return `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; background-color: #333;">
    <h2 style="color: #fff; text-align: center;">Verify Your Email Address</h2>
    <p style="font-size: 16px; color: #ccc;">Dear User,</p>
    <p style="font-size: 16px; color: #ccc;">To complete your registration or login, please use the following OTP code:</p>
    <div style="text-align: center; margin: 20px 0;">
        <span style="display: inline-block; font-size: 24px; font-weight: bold; color: #000; padding: 10px 20px; background-color: #fff; border-radius: 5px;">
            ${otpCode}
        </span>
    </div>
    <p style="font-size: 16px; color: #ccc;">This code is valid for 15 minutes. Please do not share this code with anyone.</p>
    <p style="font-size: 16px; color: #ccc;">If you did not request this email, please ignore it.</p>
    <footer style="margin-top: 20px; text-align: center; font-size: 14px; color: #666;">
        <p>Thank you,<br>BookWorm Team</p>
        <p style="font-size: 12px; color: #444;">This is an automated message. Please do not reply to this email.</p>
    </footer>
</div>`;
}

export function generateForgotPasswordEmailTemplate(resetPasswordUrl) {
    return `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #2c3e50; background-color: #2c3e50; border-radius: 5px;">
    <h2 style="color: #fff; text-align: center;">Reset Your Password</h2>
    <p style="font-size: 16px; color: #ecf0f1;">Dear User,</p>
    <p style="font-size: 16px; color: #ecf0f1;">You requested to reset your password. Please click the button below to create a new password:</p>
    <div style="text-align: center; margin: 20px 0;">
        <a href="${resetPasswordUrl}" 
           style="display: inline-block; padding: 12px 24px; background-color: #3498db; font-size: 16px; font-weight: bold; color: #fff; text-decoration: none; border-radius: 4px;">
            Reset Password
        </a>
    </div>
    <p style="font-size: 16px; color: #ecf0f1;">If you did not request this, please ignore this email. The link will expire in 24 hours.</p>
    <p style="font-size: 16px; color: #ecf0f1;">If the button above doesn't work, copy and paste the following URL into your browser:</p>
    <p style="font-size: 14px; color: #3498db; word-wrap: break-word;">${resetPasswordUrl}</p>
    <footer style="margin-top: 20px; text-align: center; font-size: 14px; color: #bdc3c7;">
        <p>Thank you,<br>BookNest Team</p>
        <p style="font-size: 12px; color: #95a5a6;">This is an automated message. Please do not reply to this email.</p>
    </footer>
</div>`;
}