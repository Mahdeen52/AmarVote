import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
    const { user, logout } = useAuth();
    const location = useLocation();

    return (
        <header className="header">
            <div className="container">
                <div className="header-content">
                    <Link to="/dashboard" className="logo">
                        <div className="logo-icon">🗳️</div>
                        <span>VoteSecure</span>
                    </Link>

                    {user && (
                        <nav className="nav">
                            <Link
                                to="/dashboard"
                                className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
                            >
                                Dashboard
                            </Link>
                            {!user.hasVoted && (
                                <Link
                                    to="/vote"
                                    className={`nav-link ${location.pathname === '/vote' ? 'active' : ''}`}
                                >
                                    Vote
                                </Link>
                            )}
                            <Link
                                to="/results"
                                className={`nav-link ${location.pathname === '/results' ? 'active' : ''}`}
                            >
                                Results
                            </Link>
                        </nav>
                    )}

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        {user && (
                            <>
                                <div style={{ textAlign: 'right', display: 'none', md: 'block' }}>
                                    <p style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-dark)' }}>
                                        {user.name}
                                    </p>
                                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                        {user.constituency}
                                    </p>
                                </div>
                                <button onClick={logout} className="btn btn-secondary btn-sm" style={{ padding: '0.5rem 1rem' }}>
                                    Logout
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
