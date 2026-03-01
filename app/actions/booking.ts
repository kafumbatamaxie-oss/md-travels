"use server";

import { Resend } from "resend";
import { redirect } from "next/navigation";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function bookSpecialPackage(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const people = formData.get("people") as string;
  const pickupDate = formData.get("pickupDate") as string;

  // ---- HARD CODED PACKAGE ----
  const packageDetails = {
    vehicle: "Luxury 65-Seater Bus",
    trips: [
      { name: "Airport Transfer (Arrival)", price: 4250 },
      { name: "Daily Trips (3 Days)", price: 12000 },
      { name: "Airport Transfer (Return)", price: 4250 },
    ],
  };

  const total = packageDetails.trips.reduce(
    (sum, t) => sum + t.price,
    0
  );

  const tripList = packageDetails.trips
    .map((t) => `${t.name} — R${t.price}`)
    .join("<br/>");

  // ✅ SEND EMAIL
  await resend.emails.send({
    from: process.env.RESEND_FROM!,
    to: ["client@email.com"], // change to client email
    subject: "New Special Package Booking",
    html: `
      <h2>New Booking Request</h2>

      <h3>Customer Info</h3>
      Name: ${name}<br/>
      Email: ${email}<br/>
      Phone: ${phone}<br/>
      People: ${people}<br/>
      Pickup Date: ${pickupDate}<br/>

      <h3>Package</h3>
      Vehicle: ${packageDetails.vehicle}<br/><br/>

      <strong>Trips:</strong><br/>
      ${tripList}

      <h3>Total: R${total}</h3>
    `,
  });

  // ✅ REDIRECT TO SUCCESS PAGE
  redirect("/success");
}