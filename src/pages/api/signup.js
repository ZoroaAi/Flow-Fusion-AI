import Airtable from "airtable";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from 'uuid';

const base = new Airtable({ apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY }).base(process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID);

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        console.error('Missing required fields:', { name, email, password });
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        console.log('Checking if user already exists with email:', email);
        const records = await base('Users').select({
            filterByFormula: `({Email} = "${email}")`
        }).firstPage();

        console.log('Fetched Records:', records);

        const existingRecord = records.find(record => record.fields.Email === email);
        if (existingRecord) {
            console.log('User already exists:', email);
            return res.status(400).json({ message: 'User already exists.' });
        }

        const uid = uuidv4();
        const hashedPassword = await bcrypt.hash(password, 10);

        console.log('Creating new user:', { uid, name, email });

        await base('Users').create([{
            "fields": {
                "User ID": uid,
                "Name": name,
                "Email": email,
                "Password": hashedPassword
            }
        }]);

        const token = jwt.sign({ email, name: user.Name }, process.env.JWT_SECRET, { expiresIn: '1h' });

        console.log('User created successfully:', email);

        res.status(200).json({ token });
    } catch (error) {
        console.error('Error during user registration:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
