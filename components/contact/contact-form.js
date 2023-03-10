import { useState, useEffect } from "react";
import classes from "./contact-form.module.css";
import Notification from "../ui/notification";

async function sendData(contactDetails) {
    const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(contactDetails),
        headers: {
            "Content-Type": "application/json"
        }
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error("something went wrong");
    }
}

function ContactForm() {
    const [enteredEmail, setEmail] = useState("");
    const [enteredName, setName] = useState("");
    const [enteredMessage, setMessage] = useState("");
    const [requestStatus, setRequestStatus] = useState(); //pending/success/failure

    useEffect(() => {
        if (requestStatus === 'success' || requestStatus === 'error') {
            const timer = setTimeout(() => {
                setRequestStatus(null);

            }, 3000)

            return () => clearTimeout(timer);
        }
    }, [requestStatus]);

    async function sendMessageHandler(event) {
        event.preventDefault();

        setRequestStatus('pending');

        try {
            await sendData({ email: enteredEmail, name: enteredName, message: enteredMessage });
            setRequestStatus('success');
            setEmail('');
            setMessage('');
            setName('');
        } catch (err) {
            setRequestStatus('error');
        }


    }

    let notification;

    if (requestStatus === 'pending') {
        notification = {
            status: 'pending',
            title: 'sending message',
            message: 'your msg is on its way'
        }
    }


    if (requestStatus === 'success') {
        notification = {
            status: 'success',
            title: 'success',
            message: 'msg was sent'
        }
    }

    if (requestStatus === 'error') {
        notification = {
            status: 'error',
            title: 'error',
            message: 'something went wrong'
        }
    }

    return (
        <section className={classes.contact}>
            <h1>How can I help you?</h1>

            <form className={classes.form} onSubmit={sendMessageHandler}>
                <div className={classes.controls}>
                    <div className={classes.control}>
                        <label htmlFor="email">Your email</label>
                        <input
                            type="email"
                            id="email"
                            value={enteredEmail}
                            required
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>

                    <div className={classes.control}>
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" value={enteredName}
                            required
                            onChange={(event) => setName(event.target.value)} />
                    </div>
                </div>
                <div className={classes.control}>
                    <label htmlFor="message">Your message</label>
                    <textarea id="message" rows="5" required value={enteredMessage}
                        onChange={(event) => setMessage(event.target.value)} />
                </div>

                <div className={classes.actions}>
                    <button>Send Message</button>
                </div>
            </form>
            {notification && <Notification status={notification.status} message={notification.message} title={notification.title} />}
        </section>
    );
}

export default ContactForm;
