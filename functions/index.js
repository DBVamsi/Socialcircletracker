const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const { differenceInDays } = require("date-fns");

admin.initializeApp();
const db = admin.firestore();

// Configure Nodemailer with your Gmail App Password
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: functions.config().gmail.email,
    pass: functions.config().gmail.password,
  },
});

exports.sendDailyReminders = functions.pubsub
    .schedule("every 24 hours")
    .onRun(async (context) => {
      // 1. Get all users who have opted-in for email notifications
      const usersSnapshot = await db
          .collection("users")
          .where("emailNotifications", "==", true)
          .get();

      if (usersSnapshot.empty) {
        console.log("No users opted in for notifications.");
        return null;
      }

      // 2. For each user, find their overdue contacts
      const promises = usersSnapshot.docs.map(async (userDoc) => {
        const user = userDoc.data();
        const userId = userDoc.id;

        const contactsSnapshot = await db
            .collection("contacts")
            .where("ownerId", "==", userId)
            .get();

        if (contactsSnapshot.empty) {
          return;
        }

        const overdueContacts = [];
        contactsSnapshot.forEach((contactDoc) => {
          const contact = contactDoc.data();
          const lastContactDate = contact.lastContacted ?
            contact.lastContacted.toDate() :
            new Date(0); // If never contacted, treat as very old
          const daysSinceLastContact = differenceInDays(
              new Date(),
              lastContactDate,
          );

          if (daysSinceLastContact >= contact.frequency) {
            overdueContacts.push(contact.name);
          }
        });

        // 3. If there are overdue contacts, send an email
        if (overdueContacts.length > 0) {
          const mailOptions = {
            from: `Social Circle Tracker <${functions.config().gmail.email}>`,
            to: user.email,
            subject: "Your Social Circle Reminders",
            html: `
              <p>Hi ${user.displayName},</p>
              <p>It\'s time to reconnect with:</p>
              <ul>
                ${overdueContacts.map((name) => `<li>${name}</li>`).join("")}
              </ul>
              <p>Have a great day!</p>
            `,
          };

          try {
            await transporter.sendMail(mailOptions);
            console.log(`Reminder email sent to ${user.email}`);
          } catch (error) {
            console.error("Error sending email:", error);
          }
        }
      });

      return Promise.all(promises);
    });