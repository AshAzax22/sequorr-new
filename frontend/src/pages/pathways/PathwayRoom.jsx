import React, { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import styles from './Pathways.module.css'
import { useAuth } from '../../context/AuthContext'
import api from '../../services/api'

const PathwayRoom = () => {
    const { room } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [isSending, setIsSending] = useState(false);
    const scrollRef = useRef(null);

    const fetchMessages = async () => {
        try {
            const data = await api.get(`/api/pathway/${encodeURIComponent(room)}`);
            setMessages(data);
        } catch (err) {
            console.error("Failed to fetch pathway messages", err);
        }
    };

    useEffect(() => {
        if (!user) return;
        fetchMessages();
        const interval = setInterval(fetchMessages, 5000);
        return () => clearInterval(interval);
    }, [room, user]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || isSending) return;

        setIsSending(true);
        try {
            const data = await api.post(`/api/pathway/${encodeURIComponent(room)}`, { content: newMessage });
            setMessages(prev => [...prev, data]);
            setNewMessage('');
        } catch (err) {
            console.error("Failed to post message", err);
        } finally {
            setIsSending(false);
        }
    };

    if (!user) {
        return (
            <>
                <Navbar />
                <div className={styles.pageContainer}>
                    <div className={styles.content}>
                        <h2 className={styles.title}>Redirecting to Discovery...</h2>
                    </div>
                </div>
                <Footer />
            </>
        )
    }

    return (
        <>
            <Navbar />
            <div className={styles.pageContainer}>
                <div className={styles.content}>
                    <div className={styles.roomHeader}>
                        <button className={styles.backBtn} onClick={() => navigate('/pathways')}>← Back</button>
                        <div>
                            <h1 className={styles.title}>{room}</h1>
                            <p style={{color: 'var(--primary-green)', fontWeight: 600}}>Community Pathway</p>
                        </div>
                    </div>

                    <div className={styles.chatContainer}>
                        <div className={styles.messageArea} ref={scrollRef}>
                            {messages.length === 0 ? (
                                <div className={styles.emptyState}>
                                    <p>The path is quiet. Be the first to share your reflections.</p>
                                </div>
                            ) : (
                                messages.map((msg, idx) => (
                                    <div 
                                        key={idx} 
                                        className={`${styles.messageBubble} ${msg.user?._id === user._id ? styles.ownMessage : ''}`}
                                    >
                                        <span className={styles.author}>{msg.user?.name || 'Anonymous'}</span>
                                        <p className={styles.messageText}>{msg.content}</p>
                                        <span className={styles.timestamp}>
                                            {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                ))
                            )}
                        </div>

                        <form className={styles.inputArea} onSubmit={handleSendMessage}>
                            <input 
                                type="text" 
                                className={styles.messageInput} 
                                placeholder="Share your thoughts with the community..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                            />
                            <button className={styles.sendBtn} disabled={isSending}>
                                {isSending ? '...' : 'Post'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default PathwayRoom
