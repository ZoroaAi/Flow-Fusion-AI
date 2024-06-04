import Airtable from "airtable";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const base = new Airtable({ apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY }).base(process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID);

export default async function handler(req, res){
    if(req.method !== "POST"){
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { email, password } = req.body;

    try{
        //Check if User Exists:
        const records = await base('Users').select({
            filterByFormula: `{Email} = "${email}"`
        }).firstPage();

        if(records.length > 0){
            return res.status(400).json({message: 'User already exists.'});
        }

        // Hash Password
        const hashedPassword = await bcrypt.hash(password,10);

        // Create User
        await base('Users').create([{
            "fields": {
                "Email": email,
                "Password":  hashedPassword
            }
        }]);

        // Generate JWT Token
        const token = jwt.sign({email}, process.env.JWT_SECRET, { expiresIn: '1hr'});
        
        res.status(200).json({token});
    }catch(error){
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}