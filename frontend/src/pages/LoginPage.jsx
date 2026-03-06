import { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
    const navigate = useNavigate();
    const { login, isAuthenticated } = useAuth();
    const formRef = useRef(null);

    const [formData, setFormData] = useState({
        name: '',
        dob: '',
        nid: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Redirect if already authenticated
    if (isAuthenticated) {
        navigate('/dashboard', { replace: true });
        return null;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        // For NID: only allow digits and max 13 characters
        if (name === 'nid') {
            const digitsOnly = value.replace(/\D/g, '').slice(0, 13);
            setFormData(prev => ({ ...prev, [name]: digitsOnly }));

            // Auto-submit when 13 digits are entered and other fields are filled
            if (digitsOnly.length === 13 && formData.name && formData.dob) {
                setTimeout(() => {
                    formRef.current?.requestSubmit();
                }, 300);
            }
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Basic validation
        if (!formData.name || !formData.dob || !formData.nid) {
            setError('All fields are required');
            setLoading(false);
            return;
        }

        // NID must be exactly 13 digits
        if (formData.nid.length !== 13) {
            setError('National ID must be exactly 13 digits');
            setLoading(false);
            return;
        }

        const result = await login(formData);

        if (result.success) {
            navigate('/dashboard');
        } else {
            setError(result.error);
        }

        setLoading(false);
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <div className="login-icon">🗳️</div>
                    <h1 style={{ marginBottom: '0.5rem' }}>Welcome Back</h1>
                    <p>Enter your details to access the voting portal</p>
                </div>

                <form ref={formRef} onSubmit={handleSubmit}>
                    {error && (
                        <div className="alert alert-error">
                            {error}
                        </div>
                    )}

                    <div className="form-group">
                        <label className="form-label" htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="form-input"
                            placeholder="e.g. John Doe"
                            value={formData.name}
                            onChange={handleChange}
                            disabled={loading}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="dob">Date of Birth</label>
                        <input
                            type="date"
                            id="dob"
                            name="dob"
                            className="form-input"
                            value={formData.dob}
                            onChange={handleChange}
                            disabled={loading}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="nid">National ID Number</label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type="text"
                                id="nid"
                                name="nid"
                                className="form-input"
                                placeholder="13-digit NID"
                                value={formData.nid}
                                onChange={handleChange}
                                disabled={loading}
                                maxLength={13}
                                inputMode="numeric"
                                pattern="[0-9]*"
                                style={{ paddingRight: '3rem' }}
                            />
                            {formData.nid.length === 13 && (
                                <span style={{
                                    position: 'absolute',
                                    right: '1rem',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    color: 'var(--primary-green)',
                                    fontWeight: 'bold'
                                }}>
                                    ✓
                                </span>
                            )}
                        </div>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginTop: '0.5rem',
                            fontSize: '0.75rem'
                        }}>
                            <span style={{ color: 'var(--text-muted)' }}>Must be 13 digits</span>
                            <span style={{ color: formData.nid.length === 13 ? 'var(--primary-green)' : 'var(--text-muted)' }}>
                                {formData.nid.length}/13
                            </span>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary btn-lg"
                        style={{ width: '100%', marginTop: '1rem' }}
                        disabled={loading}
                    >
                        {loading ? (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <div className="loading-spinner" style={{ width: 20, height: 20, borderWidth: 2 }}></div>
                                <span>Verifying...</span>
                            </div>
                        ) : (
                            'Sign In'
                        )}
                    </button>

                    <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem' }}>
                        <p style={{ color: 'var(--text-muted)' }}>
                            <Link to="/register" style={{ color: 'var(--primary-green)', fontWeight: '600', textDecoration: 'none' }}>
                                Register if new account
                            </Link>
                        </p>
                    </div>
                </form>

                <div style={{
                    marginTop: '2rem',
                    paddingTop: '1.5rem',
                    borderTop: '1px solid var(--gray-100)',
                    textAlign: 'center'
                }}>
                    <p style={{ fontSize: '0.875rem' }}>
                        Secured by <strong>VoteSecure</strong> Technology
                    </p>
                </div>
            </div>

            <footer style={{ marginTop: 'auto', padding: '2rem 1rem', textAlign: 'center', color: 'var(--gray-400)', fontSize: '0.875rem' }}>
                <p>© 2026 VoteSecure Platform. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default LoginPage;
