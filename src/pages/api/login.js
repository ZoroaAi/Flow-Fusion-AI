import Airtable from "airtable";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const base = new Airtable({ apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY }).base(process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID);

export default async function handler(req, res){
    if(req !== "POST"){
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { email, password } = req.body;

    try{
        // Find User in Airtable
        const records = await base('Users').select({
            filterByFormula: `{Email} = "${email}"`,
        }).firstPage();

        if(records.length === 0){
            return res.status(400).json({ error: "Invalid credentials" });
        }

        const user = records[0].fields;

        // Check Password
        const isPasswordValid = await bcrypt.compare(password, user.Password);
        if(!isPasswordValid){
            return res.status(400).json({ error: "Invalid credentials" });
        }

        // Generate JWT Token
        const token = jwt.sign({email}, process.env.JWT_SECRET, { expiresIn: '1h'});
        
        res.status(200).json({token});
    }catch(error){
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}