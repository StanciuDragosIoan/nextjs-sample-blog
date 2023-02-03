import { MongoClient } from "mongodb";

async function handler(req, res) {
    if (req.method === "POST") {
        const { email, name, message } = req.body;

        if (!email || !email.includes("@") || !name || name.trim === '' || !message || message.trim() === "") {
            res.status(422).json({ msg: "invalid input" });
            return;
        }

        //store in db
        const newMessage = {
            email,
            name,
            message
        }

        const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@cluster0.a2ftxtg.mongodb.net/${process.env.db_name}?retryWrites=true&w=majority`;

        let client;
        //connect db
        try {


            client = await MongoClient.connect(connectionString);
        } catch (err) {
            res.status(500).json({ message: "db connection failed.." });
        }

        const db = client.db();

        try {


            const result = await db.collection('messages').insertOne(newMessage);
            newMessage.id = result.insertedId;


        } catch (err) {
            client.close();
            res.status(500).json({ msg: 'save in db saved' })
            return;
        }

        client.close();
        console.log(newMessage);

        res.status(201).json({ message: 'Successfully stored message!', userMessage: newMessage });
    }
}

export default handler;