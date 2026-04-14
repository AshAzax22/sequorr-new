import React, { useEffect, useRef, useState } from 'react'
import { initEmotionEngine, analyzeFace, getDominantEmotion, drawResults } from '../../services/EmotionEngine'
import { useAuth } from '../../context/AuthContext'
import api from '../../services/api'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import styles from './FaceScan.module.css'
import AccessGate from '../../components/accessGate/AccessGate'

const FaceScan = () => {
    const { user } = useAuth()
    const videoRef = useRef(null)
    const canvasRef = useRef(null)
    const lastPing = useRef(0)
    const [modelsLoaded, setModelsLoaded] = useState(false)
    const [dominantEmotion, setDominantEmotion] = useState('Neutral')
    const [sessionStats, setSessionStats] = useState(null)

    useEffect(() => {
        if (!user) return;
        const fetchStats = async () => {
            try {
                const data = await api.get('/api/dashboard/heatmap')
                if (data && data.length > 0) {
                    const recent = data.slice(-7);
                    const totalScans = recent.reduce((acc, curr) => acc + curr.factors.faceDetectionsCount, 0);
                    const avgScore = recent.reduce((acc, curr) => acc + curr.score, 0) / recent.length;
                    
                    const today = new Date().toISOString().split('T')[0];
                    const todayData = data.find(d => d.date === today);

                    setSessionStats({
                        totalScans7Days: totalScans,
                        avgScore7Days: Math.round(avgScore),
                        todayScans: todayData ? todayData.factors.faceDetectionsCount : 0
                    });
                }
            } catch (err) {
                console.error("Failed to load session stats", err)
            }
        }
        fetchStats()
    }, [user])

    useEffect(() => {
        const loadModels = async () => {
            try {
                await initEmotionEngine()
                setModelsLoaded(true)
            } catch (err) {
                console.error("Error loading modern AI models", err)
            }
        }
        loadModels()
    }, [])

    useEffect(() => {
        if (modelsLoaded) {
            startVideo()
        }
    }, [modelsLoaded])

    const startVideo = () => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) => {
                if (videoRef.current) {
                    videoRef.current.srcObject = stream
                }
            })
            .catch((err) => console.error("Error accessing webcam", err))
    }

    const handleVideoPlay = () => {
        if (!videoRef.current || !canvasRef.current) return;

        const loop = async () => {
            if (videoRef.current && canvasRef.current && !videoRef.current.paused) {
                try {
                    const result = await analyzeFace(videoRef.current)
                    drawResults(canvasRef.current, videoRef.current, result)

                    if (result.face && result.face.length > 0) {
                        const dominant = getDominantEmotion(result.face[0])
                        setDominantEmotion(dominant.emotion)

                        // Passive backend sync: record data point every 5 seconds silently
                        const now = Date.now()
                        if (user && now - lastPing.current > 5000) {
                            lastPing.current = now;
                            api.post('/api/dashboard/facescan', { dominantEmotion: dominant.emotion })
                                .catch(e => console.log("Offline scan sync failed:", e))
                        }
                    }
                } catch (e) {
                    console.error("Inference loop error:", e)
                }
            }
            
            if (videoRef.current) {
                videoRef.current.animationId = requestAnimationFrame(loop)
            }
        }

        loop()
    }

    useEffect(() => {
        return () => {
           if (videoRef.current && videoRef.current.animationId) {
               cancelAnimationFrame(videoRef.current.animationId)
           }
        }
    }, [])

    return (
        <>
            <Navbar />
            <div className={styles.pageContainer}>
                <div className={styles.content}>
                    <h1 className={styles.title}>Real-time Face Scan</h1>
                    <p className={styles.subtitle}>Powered by State-of-the-Art `@vladmandic/human`. No video is uploaded to the server.</p>
                    
                    <AccessGate title="Sequorr Vision" subtitle="Sign in to analyze your micro-expressions securely in real-time. We never store video data.">
                        <div className={styles.scannerWrapper}>
                            {modelsLoaded ? (
                                <div className={styles.videoContainer}>
                                    <video 
                                        ref={videoRef} 
                                        autoPlay 
                                        muted 
                                        onPlay={handleVideoPlay}
                                        className={styles.videoStream}
                                        width="720"
                                        height="560"
                                    />
                                    <canvas ref={canvasRef} className={styles.canvasOverlay} />
                                </div>
                            ) : (
                                <p className={styles.loadingText}>Loading SOTA Neural Networks...</p>
                            )}
                            <div className={styles.sidePanelWrapper}>
                                <div className={styles.emotionPanel}>
                                    <h2>Current Emotion</h2>
                                    <h3 className={styles.dominantText}>{dominantEmotion}</h3>
                                </div>
                                {sessionStats && (
                                    <div className={styles.statsPanel}>
                                        <h3>Activity Insights</h3>
                                        <div className={styles.statRow}>
                                            <span className={styles.statLabel}>Today's Scans</span>
                                            <span className={styles.statValue}>{sessionStats.todayScans}</span>
                                        </div>
                                        <div className={styles.statRow}>
                                            <span className={styles.statLabel}>7-Day Total</span>
                                            <span className={styles.statValue}>{sessionStats.totalScans7Days}</span>
                                        </div>
                                        <div className={styles.statRow}>
                                            <span className={styles.statLabel}>7-Day Avg Score</span>
                                            <span className={styles.statValue} style={{color: 'var(--primary-green)'}}>{sessionStats.avgScore7Days}/100</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </AccessGate>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default FaceScan
