import Head from "next/head";
import ContactForm from "../components/contact/contact-form";

function ContactPage() {
    return <>
        <Head>
            <title>Contact me</title>
            <meta name="description" content="send me all messages" />
        </Head>
        <ContactForm /></>
}

export default ContactPage;