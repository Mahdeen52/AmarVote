import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../services/api';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        dob: '',
        nid: '',
        constituency: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const constituencies = [
        "Metropolis", "Old Town", "Green Valley", "Highlands", "Riverdale", "Seaside"
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'nid') {
            // Only allow digits and max 13 characters
            const digitsOnly = value.replace(/\D/g, '').slice(0, 13);
            setFormData(prev => ({ ...prev, [name]: digitsOnly }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.nid.length !== 13) {
            setError('National ID must be exactly 13 digits');
            return;
        }

        setLoading(true);
        setError('');

        try {
            await authAPI.register(formData);
            setSuccess('Registration successful! Redirecting to login...');
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card card">
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div className="login-icon">📝</div>
                    <h1 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Create Account</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Register to participate in the voting process</p>
                </div>

                {error && <div className="alert alert-error">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            className="form-input"
                            placeholder="Enter your full name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="grid grid-2" style={{ gap: '1rem' }}>
                        <div className="form-group">
                            <label className="form-label">Date of Birth</label>
                            <input
                                type="date"
                                name="dob"
                                className="form-input"
                                value={formData.dob}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Constituency</label>
                            <select
                                name="constituency"
                                className="form-input"
                                value={formData.constituency}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select...</option>
                                {constituencies.map(c => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">National ID (13 Digits)</label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type="text"
                                name="nid"
                                className="form-input"
                                placeholder="0000 0000 0000 0"
                                value={formData.nid}
                                onChange={handleChange}
                                required
                                style={{
                                    letterSpacing: formData.nid ? '0.2rem' : 'normal',
                                    fontWeight: '600'
                                }}
                            />
                            {formData.nid.length === 13 && (
                                <span style={{
                                    position: 'absolute',
                                    right: '1rem',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    color: 'var(--primary-green)',
                                    fontSize: '1.25rem'
                                }}>
                                    ✓
                                </span>
                            )}
                        </div>
                        <div style={{
                            height: '4px',
                            background: 'var(--gray-100)',
                            marginTop: '0.5rem',
                            borderRadius: '2px',
                            overflow: 'hidden'
                        }}>
                            <div style={{
                                height: '100%',
                                width: `${(formData.nid.length / 13) * 100}%`,
                                background: formData.nid.length === 13 ? 'var(--primary-green)' : 'var(--primary-light)',
                                transition: 'width 0.3s ease'
                            }}></div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ width: '100%', marginTop: '1rem' }}
                        disabled={loading}
                    >
                        {loading ? (
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                <div className="loading-spinner" style={{ width: 16, height: 16, borderWidth: 2 }}></div>
                                <span>Registering...</span>
                            </div>
                        ) : 'Create Your Voter ID'}
                    </button>
                </form>

                <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.875rem' }}>
                    <p style={{ color: 'var(--text-muted)' }}>
                        Already have an account?{' '}
                        <Link to="/" style={{ color: 'var(--primary-green)', fontWeight: '600', textDecoration: 'none' }}>
                            Sign in here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
