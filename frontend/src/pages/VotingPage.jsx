import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { candidatesAPI, voteAPI } from '../services/api';
import Header from '../components/Header';

const VotingPage = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    const [candidates, setCandidates] = useState([]);
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [loading, setLoading] = useState(true);
    const [voting, setVoting] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        fetchCandidates();
    }, []);

    const fetchCandidates = async () => {
        try {
            const response = await candidatesAPI.getAll();
            setCandidates(response.data.candidates || []);
        } catch (err) {
            setError('Failed to load candidates');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSelectCandidate = (candidate) => {
        if (user?.hasVoted) return;
        setSelectedCandidate(candidate);
        setShowModal(true);
    };

    const handleConfirmVote = async () => {
        if (!selectedCandidate) return;

        setVoting(true);
        setError('');

        try {
            await voteAPI.cast(selectedCandidate._id);
            setSuccess('Your vote has been cast successfully!');
            setShowModal(false);

            // Update local user state
            setTimeout(() => {
                navigate('/results');
            }, 2000);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to cast vote');
            setShowModal(false);
        } finally {
            setVoting(false);
        }
    };

    if (loading) {
        return (
            <>
                <Header />
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Loading candidates...</p>
                </div>
            </>
        );
    }

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Header />

            <main className="container page">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h1 style={{ marginBottom: '1rem' }}>Cast Your Vote</h1>
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.5rem 1.5rem',
                        background: 'var(--gray-100)',
                        borderRadius: '2rem',
                        color: 'var(--primary-dark)',
                        fontWeight: '600'
                    }}>
                        📍 {user?.constituency} Constituency
                    </div>
                </div>

                {error && (
                    <div className="alert alert-error" style={{ maxWidth: '600px', margin: '0 auto 2rem' }}>
                        {error}
                    </div>
                )}

                {success && (
                    <div className="alert alert-success" style={{ maxWidth: '600px', margin: '0 auto 2rem' }}>
                        {success}
                    </div>
                )}

                {user?.hasVoted ? (
                    <div className="card-glass" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', padding: '4rem' }}>
                        <div style={{ fontSize: '5rem', marginBottom: '1.5rem' }}>✅</div>
                        <h2 style={{ marginBottom: '1rem' }}>Vote Recorded Successfully</h2>
                        <p style={{ marginBottom: '2.5rem', fontSize: '1.125rem' }}>
                            Thank you for participating! Your contribution to the democratic process has been safely encrypted and stored.
                        </p>
                        <button
                            className="btn btn-primary btn-lg"
                            onClick={() => navigate('/results')}
                        >
                            View Live Standings
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-3">
                            {candidates.map((candidate) => (
                                <div
                                    key={candidate._id}
                                    className={`candidate-card ${selectedCandidate?._id === candidate._id ? 'selected' : ''}`}
                                    onClick={() => handleSelectCandidate(candidate)}
                                >
                                    <div className="candidate-avatar">
                                        {candidate.name.charAt(0).toUpperCase()}
                                    </div>
                                    <h3 style={{ marginBottom: '0.5rem' }}>{candidate.name}</h3>
                                    <div className="candidate-party">{candidate.party}</div>

                                    <div style={{ marginTop: '2rem' }}>
                                        <button className="btn btn-secondary btn-sm" style={{ width: '100%' }}>
                                            Select Candidate
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {candidates.length === 0 && (
                            <div className="card" style={{ textAlign: 'center', padding: '4rem' }}>
                                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
                                <h3>No candidates found</h3>
                                <p>We couldn't find any registered candidates for your constituency.</p>
                            </div>
                        )}
                    </>
                )}
            </main>

            <footer style={{ marginTop: 'auto', padding: '4rem 0', textAlign: 'center', opacity: 0.6 }}>
                <p>Protected by Advanced Encryption Standards</p>
            </footer>

            {/* Confirmation Modal */}
            {showModal && (
                <div className="modal-overlay" onClick={() => !voting && setShowModal(false)}>
                    <div className="modal">
                        <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>🗳️</div>
                        <h2 style={{ marginBottom: '1rem' }}>Confirm Selection</h2>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                            You are about to cast your vote for:
                        </p>
                        <div style={{
                            padding: '1.5rem',
                            background: 'var(--gray-50)',
                            borderRadius: '1rem',
                            marginBottom: '2rem',
                            border: '1px solid var(--gray-100)'
                        }}>
                            <h3 style={{ color: 'var(--primary-dark)' }}>{selectedCandidate?.name}</h3>
                            <p style={{ fontWeight: '600', color: 'var(--primary-green)', marginTop: '0.25rem' }}>
                                {selectedCandidate?.party}
                            </p>
                        </div>

                        <p style={{ fontSize: '0.875rem', color: 'var(--error)', fontWeight: '600', marginBottom: '2rem' }}>
                            ⚠️ THIS ACTION CANNOT BE UNDONE
                        </p>

                        <div className="modal-actions">
                            <button
                                className="btn btn-secondary"
                                onClick={() => setShowModal(false)}
                                disabled={voting}
                            >
                                Re-evaluate
                            </button>
                            <button
                                className="btn btn-primary"
                                onClick={handleConfirmVote}
                                disabled={voting}
                            >
                                {voting ? (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <div className="loading-spinner" style={{ width: 16, height: 16, borderWidth: 2 }}></div>
                                        <span>Casting...</span>
                                    </div>
                                ) : 'Finalize Vote'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VotingPage;
