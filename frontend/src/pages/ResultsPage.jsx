import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { candidatesAPI } from '../services/api';
import Header from '../components/Header';

const ResultsPage = () => {
    const { user } = useAuth();

    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchResults();
    }, []);

    const fetchResults = async () => {
        try {
            const response = await candidatesAPI.getResults(user?.constituency);
            setCandidates(response.data.candidates || []);
        } catch (err) {
            setError('Failed to load results');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const getTotalVotes = () => {
        return candidates.reduce((sum, c) => sum + (c.votes || 0), 0);
    };

    const getPercentage = (votes) => {
        const total = getTotalVotes();
        if (total === 0) return 0;
        return ((votes / total) * 100).toFixed(1);
    };

    if (loading) {
        return (
            <>
                <Header />
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Loading results...</p>
                </div>
            </>
        );
    }

    return (
        <>
            <Header />

            <div className="container page">
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <h1>Election Results</h1>
                    <p style={{ fontSize: '1.1rem', marginTop: '8px' }}>
                        Constituency: <strong style={{ color: 'var(--primary-green)' }}>{user?.constituency}</strong>
                    </p>
                </div>

                {error && (
                    <div className="alert alert-error" style={{ maxWidth: '600px', margin: '0 auto 24px' }}>
                        {error}
                    </div>
                )}

                <div className="grid grid-3" style={{ marginBottom: '4rem' }}>
                    <div className="stat-card">
                        <div className="stat-icon">🗳️</div>
                        <div className="stat-label">Total Participation</div>
                        <div className="stat-value">{getTotalVotes()} Votes</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">👥</div>
                        <div className="stat-label">Running Candidates</div>
                        <div className="stat-value">{candidates.length}</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">📈</div>
                        <div className="stat-label">Reporting Status</div>
                        <div className="stat-value">Real-time</div>
                    </div>
                </div>

                <h2 style={{ marginBottom: '24px' }}>Results by Candidate</h2>

                {candidates.length > 0 ? (
                    <div style={{ display: 'grid', gap: '1.5rem' }}>
                        {candidates.map((candidate, index) => (
                            <div
                                key={candidate._id}
                                className="card"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '2rem',
                                    padding: '1.5rem 2.5rem',
                                    border: index === 0 ? '2px solid var(--primary-green)' : '1px solid var(--gray-100)',
                                    background: index === 0 ? 'var(--gray-50)' : 'var(--white)',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                            >
                                {index === 0 && (
                                    <div style={{
                                        position: 'absolute',
                                        top: 0,
                                        right: 0,
                                        padding: '0.25rem 1rem',
                                        background: 'var(--primary-green)',
                                        color: 'white',
                                        fontSize: '0.75rem',
                                        fontWeight: '800',
                                        borderRadius: '0 0 0 1rem'
                                    }}>
                                        LEADING
                                    </div>
                                )}

                                <div style={{
                                    fontWeight: '800',
                                    fontSize: '1.25rem',
                                    color: index === 0 ? 'var(--primary-green)' : 'var(--gray-400)',
                                    width: '3rem'
                                }}>
                                    0{index + 1}
                                </div>

                                <div className="candidate-avatar" style={{
                                    width: '3.5rem',
                                    height: '3.5rem',
                                    fontSize: '1.25rem',
                                    flexShrink: 0,
                                    margin: 0
                                }}>
                                    {candidate.name.charAt(0).toUpperCase()}
                                </div>

                                <div style={{ flex: 1 }}>
                                    <h3 style={{ marginBottom: '0.25rem', fontSize: '1.25rem' }}>
                                        {candidate.name}
                                    </h3>
                                    <div className="candidate-party" style={{ margin: 0 }}>{candidate.party}</div>
                                </div>

                                <div style={{ textAlign: 'right', minWidth: '6rem' }}>
                                    <div style={{
                                        fontSize: '1.5rem',
                                        fontWeight: '800',
                                        color: 'var(--primary-dark)'
                                    }}>
                                        {candidate.votes || 0}
                                    </div>
                                    <div style={{
                                        fontSize: '0.875rem',
                                        fontWeight: '600',
                                        color: 'var(--primary-green)'
                                    }}>
                                        {getPercentage(candidate.votes || 0)}%
                                    </div>
                                </div>

                                <div style={{ width: '200px', display: 'none', lg: 'block' }}>
                                    <div style={{
                                        height: '0.5rem',
                                        background: 'var(--gray-100)',
                                        borderRadius: '1rem',
                                        overflow: 'hidden'
                                    }}>
                                        <div style={{
                                            height: '100%',
                                            width: `${getPercentage(candidate.votes || 0)}%`,
                                            background: index === 0
                                                ? 'var(--primary-green)'
                                                : 'var(--gray-400)',
                                            borderRadius: '1rem',
                                            transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)'
                                        }}></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="card" style={{ textAlign: 'center', padding: '48px' }}>
                        <p>No results available yet</p>
                    </div>
                )}
            </div>

            <div style={{ padding: '40px 0' }}></div>
        </>
    );
};

export default ResultsPage;
