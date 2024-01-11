import Email from "../model/email.js";
import client from "../postmark.js";

export const sendEmail = async (req, res) => {
  try {
    const { to, from, subject, body } = req.body;

    await client.sendEmail({
      From: to,
      To: from,
      Subject: subject,
      TextBody: body,
    });

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
};

export const saveSendEmails = async (request, response) => {
  try {
    const email = await new Email(request.body);
    email.save();

    response.status(200).json("email saved successfully");
  } catch (error) {
    response.status(500).json(error.message);
  }
};

export const getEmails = async (request, response) => {
  try {
    let emails;

    if (request.params.type === "starred") {
      emails = await Email.find({ starred: true, bin: false });
    } else if (request.params.type === "bin") {
      emails = await Email.find({ bin: true });
    } else if (request.params.type === "allmail") {
      emails = await Email.find({});
    } else if (request.params.type === "inbox") {
      emails = [];
    } else {
      emails = await Email.find({ type: request.params.type });
    }

    response.status(200).json(emails);
  } catch (error) {
    response.status(500).json(error.message);
  }
};

export const toggleStarredEmail = async (request, response) => {
  try {
    await Email.updateOne(
      { _id: request.body.id },
      { $set: { starred: request.body.value } }
    );
    response.status(201).json("Value is updated");
  } catch (error) {
    response.status(500).json(error.message);
  }
};

export const deleteEmails = async (request, response) => {
  try {
    await Email.deleteMany({ _id: { $in: request.body } });
    response.status(200).json("emails deleted successfully");
  } catch (error) {
    response.status(500).json(error.message);
  }
};

export const moveEmailsToBin = async (request, response) => {
  try {
    await Email.updateMany(
      { _id: { $in: request.body } },
      { $set: { bin: true, starred: false, type: "" } }
    );
  } catch (error) {
    response.status(500).json(error.message);
  }
};
