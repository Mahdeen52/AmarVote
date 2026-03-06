import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';

const DashboardPage = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    return (
        <>
            <Header />

            <div className="dashboard-hero">
                <div className="container">
                    <div style={{ maxWidth: '600px' }}>
                        <h1>Welcome back, {user?.name.split(' ')[0]}! 👋</h1>
                        <p style={{ fontSize: '1.25rem', opacity: 0.9 }}>
                            Your voice matters. Participate in the democratic process for <strong>{user?.constituency}</strong>.
                        </p>
                    </div>
                </div>
            </div>

            <main className="container">
                <div className="grid grid-3" style={{ marginTop: '-4rem' }}>
                    <div className="stat-card">
                        <div className="stat-icon">📍</div>
                        <div className="stat-label">Constituency</div>
                        <div className="stat-value">{user?.constituency}</div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon">{user?.hasVoted ? '✅' : '⏳'}</div>
                        <div className="stat-label">Voting Status</div>
                        <div className="stat-value">{user?.hasVoted ? 'Complete' : 'Pending'}</div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon">🛡️</div>
                        <div className="stat-label">Security Status</div>
                        <div className="stat-value">Verified</div>
                    </div>
                </div>

                <section style={{ marginTop: '4rem' }}>
                    <div className="card-glass" style={{ padding: '3rem', borderRadius: '2rem', textAlign: 'center' }}>
                        <h2 style={{ marginBottom: '1.5rem' }}>Ready to make your choice?</h2>
                        <div className="flex-center" style={{ gap: '1.5rem', flexWrap: 'wrap' }}>
                            {!user?.hasVoted ? (
                                <button
                                    className="btn btn-primary btn-lg"
                                    onClick={() => navigate('/vote')}
                                    style={{ padding: '1rem 3rem' }}
                                >
                                    🗳️ Go to Voting Booth
                                </button>
                            ) : (
                                <div style={{
                                    padding: '1rem 2rem',
                                    background: 'var(--gray-100)',
                                    borderRadius: '1rem',
                                    color: 'var(--primary-dark)',
                                    fontWeight: '600'
                                }}>
                                    ✅ You have successfully cast your vote
                                </div>
                            )}

                            <button
                                className="btn btn-secondary btn-lg"
                                onClick={() => navigate('/results')}
                                style={{ padding: '1rem 3rem' }}
                            >
                                📊 View Live Results
                            </button>
                        </div>
                    </div>
                </section>

                <section style={{ marginTop: '4rem' }}>
                    <h3 style={{ marginBottom: '2rem', textAlign: 'center' }}>Important Guidelines</h3>
                    <div className="grid grid-3">
                        <div className="card" style={{ padding: '2rem' }}>
                            <div style={{ color: 'var(--primary-green)', fontSize: '1.5rem', marginBottom: '1rem', fontWeight: '800' }}>01</div>
                            <h4 style={{ marginBottom: '0.75rem' }}>Verify Identity</h4>
                            <p>Ensure your NID and details match your registration record before proceeding.</p>
                        </div>
                        <div className="card" style={{ padding: '2rem' }}>
                            <div style={{ color: 'var(--primary-green)', fontSize: '1.5rem', marginBottom: '1rem', fontWeight: '800' }}>02</div>
                            <h4 style={{ marginBottom: '0.75rem' }}>One-time Vote</h4>
                            <p>You can only vote once. After confirmation, your choice cannot be altered.</p>
                        </div>
                        <div className="card" style={{ padding: '2rem' }}>
                            <div style={{ color: 'var(--primary-green)', fontSize: '1.5rem', marginBottom: '1rem', fontWeight: '800' }}>03</div>
                            <h4 style={{ marginBottom: '0.75rem' }}>Live Results</h4>
                            <p>Real-time updates are available for transparency after you cast your vote.</p>
                        </div>
                    </div>
                </section>
            </main>

            <footer style={{ padding: '4rem 0', textAlign: 'center', opacity: 0.6 }}>
                <p>&copy; 2026 VoteSecure Platform. All rights reserved.</p>
            </footer>
        </>
    );
};

export default DashboardPage;
