import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { motion, AnimatePresence } from 'framer-motion';
import './contact.css';

const Contact = () => {
  const form = useRef();
  const [sent, setSent] = useState(false);
  const [status, setStatus] = useState('idle'); // idle | sending | error

  const sendEmail = (e) => {
    e.preventDefault();

    // Spam trap: real visitors never see or fill this field, bots usually do.
    if (form.current.elements.website.value) return;

    setStatus('sending');
    emailjs.sendForm(
      'service_a9lpv3h',
      'template_gg53xdk',
      form.current,
      '_rog0EzLsh6n5TU3Q'
    ).then(() => {
      setStatus('idle');
      setSent(true);
      form.current.reset();
    }).catch(() => {
      setStatus('error');
    });
  };

  return (
    <section className="contact container section" id="contact">
      <h2 className="section__title_contacts">Contact Me</h2>

      <div className="contact__container grid">
        <div className="contact__info">
          <h3 className="contact__title">Let's talk about your project!</h3>
          <p className="contact__lead">
            Have a site to build, fix or speed up? Tell me what you need and I'll get back to you.
          </p>
          <p className="contact__status">
            <span className="contact__status-dot" aria-hidden="true" />
            Available for new projects
          </p>
          <p className="contact__reply">Usually replies within one business day.</p>
          <ul className="contact__links">
            <li><a href="https://github.com/dastanramazan" target="_blank" rel="noopener noreferrer">GitHub</a></li>
            <li><a href="https://www.linkedin.com/in/dramazan/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
            <li><a href="https://x.com/DastanRamazan" target="_blank" rel="noopener noreferrer">X</a></li>
          </ul>
        </div>

        <div className="form-wrapper">
          <form ref={form} onSubmit={sendEmail} className="action contact__form">
            <div className="contact__form-group">
              <div className="contact__form-div">
                <input type="text" name="name" className="text contact__form-input" placeholder="Your name" required />
              </div>
              <div className="contact__form-div">
                <input type="email" name="email" className="text contact__form-input" placeholder="Your email" required />
              </div>
            </div>
            <div className="contact__form-div">
              <input type="text" name="subject" className="text contact__form-input" placeholder="Subject" required />
            </div>
            <div className="contact__form-div contact-form-area">
              <textarea
                name="message"
                cols="30"
                rows="10"
                className="contact__form-input"
                placeholder="Write your message here"
                required
              ></textarea>
            </div>
            <input
              type="text"
              name="website"
              className="contact__trap"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />
            <button type="submit" className="btn" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Send Message'}
            </button>
            {status === 'error' && (
              <p className="contact__error" role="alert">
                Sorry, the message didn't go through. Please try again in a moment.
              </p>
            )}
          </form>

          {/* Animated Overlay with Dismiss Button */}
          <AnimatePresence>
            {sent && (
              <motion.div
                className="form-overlay"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.4 }}
              >
                <button className="close-overlay" onClick={() => setSent(false)}>×</button>
                {/* ✅ SVG Checkmark Animation */}
                    <motion.svg
                      className="checkmark-svg"
                      width="80"
                      height="80"
                      viewBox="0 0 52 52"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <motion.circle
                        cx="26"
                        cy="26"
                        r="25"
                        stroke="#00ff9d"
                        strokeWidth="2"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                      />
                      <motion.path
                        d="M14 27L22 35L38 19"
                        stroke="#00ff9d"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.6, delay: 0.2, ease: "easeInOut" }}
                      />
                    </motion.svg>

                
                <p>Your message has been sent!</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Contact;
