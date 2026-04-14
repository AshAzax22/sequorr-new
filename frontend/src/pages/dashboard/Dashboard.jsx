import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import styles from './Dashboard.module.css'
import { useAuth } from '../../context/AuthContext'
import api from '../../services/api'
import AccessGate from '../../components/accessGate/AccessGate'

const Dashboard = () => {
    const { user } = useAuth()
    const navigate = useNavigate()
    const [heatmap, setHeatmap] = useState([])
    const [todayScore, setTodayScore] = useState(50) // Baseline
    const [tooltipData, setTooltipData] = useState(null)
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
    const [activeTab, setActiveTab] = useState('overview') // 'overview' or 'profile'
    
    // Profile Update State
    const { logout, updateProfile } = useAuth()
    const [profileData, setProfileData] = useState({ name: user?.name || '', email: user?.email || '', password: '' })
    const [updateStatus, setUpdateStatus] = useState('')

    const handleMouseMove = (e, day) => {
        setTooltipData(day)
        setMousePos({ x: e.clientX, y: e.clientY })
    }

    const handleMouseLeave = () => {
        setTooltipData(null)
    }

    useEffect(() => {
        if (!user) {
            return;
        }

        const fetchAnalytics = async () => {
            try {
                const data = await api.get('/api/dashboard/heatmap')
                setHeatmap(data)
                
                // Set today's score if it exists in the heatmap array
                const today = new Date().toISOString().split('T')[0]
                const todayData = data.find(item => item.date === today)
                if (todayData) setTodayScore(todayData.score)

            } catch (err) {
                console.error("Failed to load dashboard data", err)
            }
        }

        fetchAnalytics()
    }, [user, navigate])

    const getHeatColor = (score) => {
        if (score < 30) return '#ff4b4b'; // Crisis/Angry
        if (score < 45) return '#ff9800'; // Anxious
        if (score <= 55) return '#555555'; // Neutral
        if (score < 75) return '#1db954'; // Calm
        return '#2EEE34'; // Peak Joy
    }

    const getPathwayColor = (name) => {
        const colors = {
            "Sunlit Path": "#FFD700",
            "Quiet Valley": "#1db954",
            "Storm Shelter": "#ff4b4b",
            "Reflective Lake": "#4a90e2",
            "Safe Harbor": "#ff9800"
        };
        return colors[name] || "#555";
    }

    const getLabel = (score) => {
        if (score < 30) return 'Distressed';
        if (score < 45) return 'Anxious';
        if (score <= 55) return 'Neutral';
        if (score < 75) return 'Calm';
        return 'Happy';
    }

    const getRecommendedPathways = () => {
        if (heatmap.length === 0) return [];
        
        const latest = heatmap[heatmap.length - 1];
        if (!latest.emotionTallies) return [];
        
        const tallies = latest.emotionTallies;
        const sorted = Object.entries(tallies)
            .sort(([, a], [, b]) => b - a)
            .filter(([, count]) => count > 0);

        const pathwayMeta = {
            "Sunlit Path": { icon: "☀️", desc: "Share your high energy with others." },
            "Quiet Valley": { icon: "🍃", desc: "Find stillness in community." },
            "Storm Shelter": { icon: "⛈️", desc: "A place to vent and release." },
            "Reflective Lake": { icon: "🌊", desc: "Depth for quiet contemplation." },
            "Safe Harbor": { icon: "⚓", desc: "Support for overwhelmed minds." }
        };

        if (sorted.length === 0) {
            return [{ name: "Quiet Valley", ...pathwayMeta["Quiet Valley"], type: "Discovery" }];
        }

        return sorted.slice(0, 2).map(([name], idx) => ({
            name,
            ...pathwayMeta[name],
            type: idx === 0 ? "Primary" : "Support"
        }));
    }

    const getEmotionPulse = () => {
        if (heatmap.length === 0) return null;
        const latest = heatmap[heatmap.length - 1];
        if (!latest.emotionTallies) return null;
        
        const total = Object.values(latest.emotionTallies).reduce((a, b) => a + b, 0);
        if (total === 0) return null;

        return Object.entries(latest.emotionTallies).map(([name, count]) => ({
            name,
            percent: (count / total) * 100,
            color: getPathwayColor(name)
        })).filter(e => e.percent > 0);
    }

    const recommendations = getRecommendedPathways();
    const pulse = getEmotionPulse();

    return (
        <>
            <Navbar />
            <div className={styles.pageContainer}>
                <div className={styles.content}>
                    <AccessGate title="Dashboard" subtitle="Sign in to view your personalized daily mental health insights and heatmaps.">
                        
                        <div className={styles.tabHeader}>
                            <button 
                                className={`${styles.tabBtn} ${activeTab === 'overview' ? styles.active : ''}`}
                                onClick={() => setActiveTab('overview')}
                            >
                                Overview
                            </button>
                            <button 
                                className={`${styles.tabBtn} ${activeTab === 'profile' ? styles.active : ''}`}
                                onClick={() => setActiveTab('profile')}
                            >
                                Profile Settings
                            </button>
                        </div>

                        {activeTab === 'overview' ? (
                            <>
                                <div className={styles.headerRow}>
                            <div>
                                <h1 className={styles.title}>Welcome back, {user?.name || "User"}.</h1>
                                <p className={styles.subtitle}>Your AI-driven mental health overview.</p>
                            </div>
                            <div className={styles.scoreCardMain}>
                                <h2>Daily Fusion Score</h2>
                                <div className={styles.scoreCircle} style={{borderColor: getHeatColor(todayScore)}}>
                                    <span style={{color: getHeatColor(todayScore)}}>{Math.round(todayScore)}</span>
                                    <small>/100</small>
                                </div>
                                <p>{getLabel(todayScore)}</p>
                            </div>
                        </div>

                        <div className={styles.dashboardGrid}>
                            {/* THE HEATMAP MODULE */}
                            <div className={`${styles.chartCard} ${styles.fullWidth}`}>
                                <h3>Mental Health Heatmap (30-Day Trend)</h3>
                                <p className={styles.triggerNote}>Horizontally scroll to view past days. Hover for tracked AI insights.</p>
                                
                                <div className={styles.heatmapScrollArea}>
                                    {heatmap.length === 0 ? (
                                        <p style={{color: '#888'}}>No data yet. Do a Face Scan or write a Journal entry!</p>
                                    ) : (
                                        heatmap.map((day, idx) => (
                                            <div 
                                                key={idx} 
                                                className={styles.heatBlock} 
                                                style={{ backgroundColor: getHeatColor(day.score) }}
                                                onMouseMove={(e) => handleMouseMove(e, day)}
                                                onMouseLeave={handleMouseLeave}
                                            />
                                        ))
                                    )}
                                </div>
                            </div>
                                                       <div className={styles.chartCard} style={{gridColumn: 'span 1'}}>
                                <div className={styles.hubHeader}>
                                    <h2>Pathway Hub</h2>
                                </div>
                                
                                {pulse && (
                                    <div className={styles.pulseContainer}>
                                        <div className={styles.pulseLabel}>
                                            <span>Daily Emotion Pulse</span>
                                            <span>{Math.round(pulse.reduce((a,b) => a + b.percent, 0))}% Clarity</span>
                                        </div>
                                        <div className={styles.pulseBar}>
                                            {pulse.map((p, idx) => (
                                                <div 
                                                    key={idx} 
                                                    className={styles.pulseSegment} 
                                                    style={{ width: `${p.percent}%`, backgroundColor: p.color }}
                                                    title={p.name}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className={styles.recGrid}>
                                    {recommendations.length > 0 ? (
                                        recommendations.map((rec, idx) => (
                                            <div 
                                                key={idx} 
                                                className={styles.recCard}
                                                onClick={() => navigate(`/pathway/${encodeURIComponent(rec.name)}`)}
                                            >
                                                <div className={styles.recMain}>
                                                    <span className={styles.recType} style={{color: getPathwayColor(rec.name)}}>{rec.type}</span>
                                                    <span className={styles.recName}>{rec.name}</span>
                                                    <span className={styles.recDesc}>{rec.desc}</span>
                                                </div>
                                                <div className={styles.recIcon}>{rec.icon}</div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className={styles.recCard} onClick={() => navigate('/pathways')}>
                                            <div className={styles.recMain}>
                                                <span className={styles.recType}>Discovery</span>
                                                <span className={styles.recName}>Quiet Valley</span>
                                                <span className={styles.recDesc}>Start your emotional journey here.</span>
                                            </div>
                                            <div className={styles.recIcon}>🍃</div>
                                        </div>
                                    )}
                                </div>
                                <button className={styles.exploreAll} onClick={() => navigate('/pathways')}>
                                    Explore All Pathways
                                </button>
                            </div>

                            {/* ANALYTICS MODULES */}
                            <div className={styles.chartCard}>
                                <h3>How it Works</h3>
                                <p className={styles.triggerNote}>
                                    Sequorr builds your Daily Fusion Score using true multimodal offline AI. 
                                </p>
                            </div>
                        </div>
                            </>
                        ) : (
                            <div className={styles.profileContainer}>
                                <div className={styles.chartCard}>
                                    <h3>Account Details</h3>
                                    <div className={styles.profileForm}>
                                        <div className={styles.inputGroup}>
                                            <label>Full Name</label>
                                            <input 
                                                type="text" 
                                                value={profileData.name} 
                                                onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                                            />
                                        </div>
                                        <div className={styles.inputGroup}>
                                            <label>Email Address</label>
                                            <input 
                                                type="email" 
                                                value={profileData.email} 
                                                onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                                            />
                                        </div>
                                        <div className={styles.inputGroup}>
                                            <label>New Password (leave blank to keep current)</label>
                                            <input 
                                                type="password" 
                                                placeholder="••••••••"
                                                value={profileData.password} 
                                                onChange={(e) => setProfileData({...profileData, password: e.target.value})}
                                            />
                                        </div>
                                        
                                        {updateStatus && <p className={styles.statusMessage}>{updateStatus}</p>}
                                        
                                        <div className={styles.profileActions}>
                                            <button 
                                                className={styles.saveBtn}
                                                onClick={async () => {
                                                    setUpdateStatus('Updating...')
                                                    const success = await updateProfile(profileData)
                                                    setUpdateStatus(success ? 'Profile updated successfully!' : 'Update failed.')
                                                }}
                                            >
                                                Save Changes
                                            </button>
                                            <button 
                                                className={styles.logoutBtn}
                                                onClick={() => {
                                                    logout()
                                                    navigate('/')
                                                }}
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </AccessGate>
                </div>
            </div>
            
            {/* Dynamic Hover Tooltip outside the scroll context */}
            {tooltipData && (
                <div 
                    className={styles.tooltipDynamic}
                    style={{
                        top: Math.max(10, mousePos.y - 20) + 'px',
                        left: Math.min(window.innerWidth - 300, mousePos.x + 20) + 'px',
                    }}
                >
                    <strong>{new Date(tooltipData.date).toLocaleDateString(undefined, {weekday: 'short', month: 'short', day: 'numeric'})}</strong>
                    <div className={styles.tooltipScore} style={{color: getHeatColor(tooltipData.score)}}>
                        Score: {Math.round(tooltipData.score)}
                    </div>
                    <div className={styles.tooltipStats}>
                        <span>Scans: {tooltipData.factors.faceDetectionsCount}</span>
                        <span>Journals: {tooltipData.factors.journalCount}</span>
                    </div>
                    
                    {tooltipData.journalInsights && tooltipData.journalInsights.length > 0 && (
                        <div className={styles.tooltipInsights}>
                            <div className={styles.insightsTitle}>Key Triggers / Insights</div>
                            <ul>
                                {tooltipData.journalInsights.map((insight, i) => (
                                    <li key={i}>{insight}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
            
            <Footer />
        </>
    )
}

export default Dashboard
