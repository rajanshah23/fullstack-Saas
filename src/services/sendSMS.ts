import twilio from 'twilio'


const client = twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
);


const sendSMS = async (to: string, body: string): Promise<void> => {
  try {
    const message = await client.messages.create({
      body,
      to,
      from: process.env.TWILIO_PHONE_NUMBER!,
    });

    console.log("SMS sent! SID:", message.sid);
  } catch (error) {
    console.error("Failed to send SMS:", error);
    throw error;
  }
};


export default sendSMS







 