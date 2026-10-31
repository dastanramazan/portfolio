import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import './chatWidget.css';

const GREETING = "👋 Hi! I'm Dastan's assistant. How can I help you today?";

const CV_URL = 'https://drive.google.com/file/d/1JO5ea-EMcER-OMve2-TcWePBKA38vJx4/view?usp=drive_link';
const TEASER_KEY = 'chatTeaserSeen';

// Reply logic — swap this out for a real API call once the AI backend is
// wired up. Keep the async signature so the rest of the widget (typing
// indicator, message list) doesn't need to change when you do. Until then it
// is upfront that free-form questions aren't answered yet and points to the
// quick actions instead of promising something that isn't there.
async function getBotReply(userText) {
  await new Promise((resolve) => setTimeout(resolve, 500 + Math.random() * 400));
  return "I can't answer free-form questions just yet. Pick one of the options above, or send Dastan a message from the Contact section and he'll reply personally.";
}

const safeStorage = {
  get: (k) => { try { return window.sessionStorage.getItem(k); } catch (e) { return null; } },
  set: (k, v) => { try { window.sessionStorage.setItem(k, v); } catch (e) { /* storage unavailable */ } },
};

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTeaser, setShowTeaser] = useState(false);
  const [messages, setMessages] = useState([{ from: 'bot', text: GREETING }]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bodyRef = useRef(null);
  const navigate = useNavigate();

  // Proactively invite engagement a few seconds after the page loads,
  // instead of only waiting for the visitor to notice the button.
  useEffect(() => {
    if (safeStorage.get(TEASER_KEY)) return undefined; // only invite once per visit
    const timer = setTimeout(() => {
      setIsOpen((open) => {
        if (!open) setShowTeaser(true);
        return open;
      });
      safeStorage.set(TEASER_KEY, '1');
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [messages, isTyping, isOpen]);

  const openChat = () => {
    setIsOpen(true);
    setShowTeaser(false);
  };

  const goTo = (hash) => {
    setIsOpen(false);
    navigate(hash);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;

    setMessages((prev) => [...prev, { from: 'user', text }]);
    setInput('');
    setIsTyping(true);

    const reply = await getBotReply(text);
    setMessages((prev) => [...prev, { from: 'bot', text: reply }]);
    setIsTyping(false);
  };

  return (
    <div className="chat-widget">
      <AnimatePresence>
        {showTeaser && !isOpen && (
          <motion.button
            type="button"
            className="chat-widget__teaser"
            onClick={openChat}
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.25 }}
          >
            <span
              className="chat-widget__teaser-close"
              role="button"
              tabIndex={0}
              aria-label="Dismiss"
              onClick={(e) => { e.stopPropagation(); setShowTeaser(false); }}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.stopPropagation(); setShowTeaser(false); } }}
            >
              ×
            </span>
            {GREETING}
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="chat-widget__panel"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <div className="chat-widget__header">
              <div>
                <p className="chat-widget__header-title">Dastan's Assistant</p>
                <p className="chat-widget__header-status">
                  <span className="chat-widget__status-dot" /> Quick links and ways to reach Dastan
                </p>
              </div>
              <button
                type="button"
                className="chat-widget__close"
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
              >
                ×
              </button>
            </div>

            <div className="chat-widget__body" ref={bodyRef}>
              {messages.map((m, i) => (
                <div key={i} className={`chat-widget__bubble chat-widget__bubble--${m.from}`}>
                  {m.text}
                </div>
              ))}
              <div className="chat-widget__actions">
                <button type="button" onClick={() => goTo('/#portfolio')}>See projects</button>
                <a href={CV_URL} target="_blank" rel="noopener noreferrer">Download CV</a>
                <button type="button" onClick={() => goTo('/#contact')}>Write to Dastan</button>
              </div>
              {isTyping && (
                <div className="chat-widget__bubble chat-widget__bubble--bot chat-widget__bubble--typing">
                  <span />
                  <span />
                  <span />
                </div>
              )}
            </div>

            <form className="chat-widget__form" onSubmit={handleSend}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message…"
                className="chat-widget__input"
                aria-label="Message"
              />
              <button type="submit" className="chat-widget__send" aria-label="Send message">
                <i className="icon-arrow-right"></i>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        className="chat-widget__button"
        onClick={() => (isOpen ? setIsOpen(false) : openChat())}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? '×' : '💬'}
      </button>
    </div>
  );
};

export default ChatWidget;
