import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const signature = request.headers.get("stripe-signature");
    const body = await request.text();

    if (!signature) {
      return NextResponse.json(
        { error: "Missing stripe-signature header" },
        { status: 400 }
      );
    }

    const event = JSON.parse(body);

    switch (event.type) {
      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object;
        console.log("Payment succeeded:", paymentIntent.id);

        //  Will Update booking status to confirmed

        return NextResponse.json({ received: true });
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object;
        console.log("Payment failed:", paymentIntent.id);

        //  Will Update booking status to payment_failed
        // Send notification to user

        return NextResponse.json({ received: true });
      }

      case "charge.refunded": {
        const charge = event.data.object;
        console.log("Charge refunded:", charge.id);

        //  Will Update booking status to refunded
        // Send notification to user

        return NextResponse.json({ received: true });
      }

      case "invoice.paid": {
        const invoice = event.data.object;
        console.log("Invoice paid:", invoice.id);

        return NextResponse.json({ received: true });
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object;
        console.log("Invoice payment failed:", invoice.id);

        return NextResponse.json({ received: true });
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object;
        console.log("Subscription cancelled:", subscription.id);

        return NextResponse.json({ received: true });
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
        return NextResponse.json({ received: true });
    }
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 400 }
    );
  }
}