import { createClient } from "@supabase/supabase-js";
// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

console.log("Hello from Functions!")

Deno.serve(async (req) => {
  /*
  const { name } = await req.json()
  const data = {
    message: `Hello ${name}!`,
  }
  */

  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  // Read environment variables
  const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
  const SUPABASE_SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_KEY");

  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    return new Response("Missing Supabase credentials", { status: 500 });
  }

  // Initialize Supabase client
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

  try {
    const body = await req.json();
    console.log("Received Paddle Webhook:", body);

    if (body.alert_name === "payment_success") {
      const { passthrough, order_id, email } = body;

      const { data, error } = await supabase
        .from("purchases")
        .insert([
          {
            user_email: email,
            product_id: passthrough,
            transaction_id: order_id,
            status: "completed",
          },
        ]);

      if (error) {
        console.error("Database insert error:", error);
        return new Response("Error updating database", { status: 500 });
      }

      console.log("Purchase recorded:", data);
      return new Response(JSON.stringify({ message: "Webhook processed successfully" }), { status: 200 });
    }

    return new Response(JSON.stringify({ message: "Event ignored" }), { status: 200 });
  } catch (err) {
    console.error("Error handling webhook:", err);
    return new Response("Server error", { status: 500 });
  }

  /*
  return new Response(
    JSON.stringify(data),
    { headers: { "Content-Type": "application/json" } },
  )
  */
})


/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/handle-paddle-webhook' \
    --header 'Authorization: Bearer ' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
