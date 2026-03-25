import { NextResponse } from "next/server";
import Retell from "retell-sdk";

const retell = new Retell({
  apiKey: process.env.RETELL_API_KEY!, 
});

export async function POST() {
  try {
    // Replace with your Agent ID from Retell Dashboard
    const agentId = "agent_484637ae32a3af01feecf89d39"; 
    
    const webCallResponse = await retell.call.createWebCall({
      agent_id: agentId,
    });

    return NextResponse.json({ access_token: webCallResponse.access_token });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create call" }, { status: 500 });
  }
}
