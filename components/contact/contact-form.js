import React, { useEffect, useState } from 'react';
import Notification from '../ui/notification';
import classes from './contact-form.module.css';

const ContactForm = () => {

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [reqStatus, setReqStatus] = useState();
    const [reqError, setReqError] = useState('');

    useEffect(() => {
        if (reqStatus == 'success' || reqStatus === 'error') {
            const timer = setTimeout(() => {
                setReqStatus(null);
                setReqError(null);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, []);


    const sendMessageHandler = async (e) => {
        e.preventDefault();

        if (!email || !message || !name) {
            return;
        }

        setReqStatus("pending");

        const payload = {
            email: email,
            name: name,
            message: message
        }

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong!');
            }
            setReqStatus("success");
            setName('');
            setEmail('');
            setMessage('');
        } catch (e) {
            setReqError(e.message);
            setReqStatus("error");
        }
    }

    let notification;

    if (reqStatus === 'pending') {
        notification = {
            status: 'pending',
            title: "Sending Message ....",
            message: "Your Message is on its way!"
        }
    }
    if (reqStatus === 'success') {
        notification = {
            status: 'success',
            title: "Success!",
            message: "Your Message is sent successfully!"
        }
    }
    if (reqStatus === 'error') {
        notification = {
            status: 'error',
            title: "Error!!",
            message: reqError
        }
    }

    return (
        <section className={classes.contact}>
            <h1>How can I help you?</h1>
            <form className={classes.form} onSubmit={sendMessageHandler}>
                <div className={classes.controls}>
                    <div className={classes.control}>
                        <label htmlFor='email'>Your Email</label>
                        <input
                            type='email'
                            id='email'
                            required
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                    <div className={classes.control}>
                        <label htmlFor='name'>Your Name</label>
                        <input
                            type='text'
                            id='name'
                            required
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                    </div>
                </div>
                <div className={classes.control}>
                    <label htmlFor='message'>Your Message</label>
                    <textarea
                        id='message'
                        rows='5'
                        required
                        value={message}
                        onChange={(event) => setMessage(event.target.value)}
                    ></textarea>
                </div>

                <div className={classes.actions}>
                    <button>Send Message</button>
                </div>
            </form>
            {notification && (
                <Notification
                    status={notification.status}
                    title={notification.title}
                    message={notification.message}
                />
            )}
        </section>
    )
}

export default ContactForm
