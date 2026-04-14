import React, { useState, useEffect } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import styles from './Journal.module.css'
import { analyzeTextEmotion } from '../../services/TextEngine'
import { encryptText, decryptText } from '../../services/encryption'
import { useAuth } from '../../context/AuthContext'
import api from '../../services/api'
import AccessGate from '../../components/accessGate/AccessGate'

const Journal = () => {
    const { user } = useAuth()
    const [entry, setEntry] = useState('')
    const [analysis, setAnalysis] = useState(null)
    const [analyzing, setAnalyzing] = useState(false)
    const [pastJournals, setPastJournals] = useState([])

    // Load past journals on mount
    useEffect(() => {
        const fetchJournals = async () => {
            if (!user) return;
            try {
                const data = await api.get('/api/journal');
                // Decrypt all past journals client-side
                const decryptedData = data.map(j => ({
                    ...j,
                    text: decryptText(j.encryptedText)
                }))
                setPastJournals(decryptedData)
            } catch (err) {
                console.error("Failed to load journals", err)
            }
        }
        fetchJournals()
    }, [user])

    const handleSaveAndAnalyze = async () => {
        if (!entry.trim() || !user) return;
        setAnalyzing(true)

        try {
            // 1. Analyze offline
            const { emotionScores, remarks } = await analyzeTextEmotion(entry)
            setAnalysis({ scores: emotionScores, remarks })

            // 2. Encrypt offline
            const encryptedText = encryptText(entry)

            // 3. Save to backend securely
            const data = await api.post('/api/journal', {
                encryptedText,
                emotionScores,
                remarks
            })

            // Update local state
            setPastJournals([{ ...data, text: entry }, ...pastJournals])
            setEntry('')
        } catch (err) {
            console.error("Error saving journal", err)
        } finally {
            setAnalyzing(false)
        }
    }

    return (
        <>
            <Navbar />
            <div className={styles.pageContainer}>
                <div className={styles.content}>
                    <h1 className={styles.title}>Secure AI Journal</h1>
                    <p className={styles.subtitle}>100% Encrypted. Local AI analysis. Your words never leave your device unencrypted.</p>
                    
                    <AccessGate title="Secure AI Journal" subtitle="Sign in to access your 100% encrypted private reflections and emotional analytics.">
                        <div className={styles.journalLayout}>
                            <div className={styles.editorSection}>
                                <textarea
                                    className={styles.textArea}
                                    placeholder="How are you feeling right now? What's on your mind?"
                                    value={entry}
                                    onChange={(e) => setEntry(e.target.value)}
                                />
                                <button 
                                    className={styles.analyzeBtn} 
                                    onClick={handleSaveAndAnalyze}
                                    disabled={analyzing || !entry.trim()}
                                >
                                    {analyzing ? 'Encrypting & Saving...' : 'Save & Analyze'}
                                </button>
                            </div>

                            <div className={styles.analysisSection}>
                                {analysis ? (
                                    <div className={styles.analysisCard}>
                                        <h3>Latest Analysis</h3>
                                        <div className={styles.statBox}>
                                            <p className={styles.statLabel}>Primary Emotion</p>
                                            <p className={styles.statValue}>{Object.keys(analysis.scores)[0] || 'Neutral'}</p>
                                        </div>
                                        <div className={styles.reflectionBox}>
                                            <p className={styles.statLabel}>AI Insight:</p>
                                            <p className={styles.aiText}>{analysis.remarks}</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className={styles.placeholderCard}>
                                        <p>Start writing to see AI reflections and emotional triggers here.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                        {/* Previous Journals */}
                                <div style={{marginTop: '30px'}} className={styles.pastJournals}>
                                    <h3>Past Journals</h3>
                                    <div className={styles.pastJournalsList}>
                                        {pastJournals.map((j, i) => (
                                            <div key={i} style={{background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '10px'}}>
                                                <small style={{color: '#888'}}>{new Date(j.createdAt).toLocaleDateString()}</small>
                                                <p style={{marginTop: '8px', fontSize: '0.95rem'}}>{j.text}</p>
                                                <div style={{marginTop: '10px', fontSize: '0.8rem', color: '#2EEE34'}}>
                                                    Insight: {j.remarks}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                    </AccessGate>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Journal
