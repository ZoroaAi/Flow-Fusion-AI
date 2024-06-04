import Stripe from 'stripe';
import Airtable from 'airtable';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const base = new Airtable({ apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY }).base(process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { token, userId } = req.body;

  try {
    const charge = await stripe.charges.create({
      amount: 5000, // Amount in cents
      currency: 'usd',
      description: 'Resource Access',
      source: token,
    });

    // Update user status in Airtable
    await base('Users').update([
      {
        id: userId,
        fields: {
          HasPaid: true,
        },
      },
    ]);

    res.status(200).json({ message: 'Payment successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
