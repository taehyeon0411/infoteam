import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../api/auth';
import './auth.css';

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');

    try {
      setIsSubmitting(true);

      const data = await login({ email, password });

      // JWT와 사용자 정보만 브라우저에 저장
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('user', JSON.stringify(data.user));

      navigate('/');
    } catch (err) {
      setError(err.message || '로그인에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="auth-main">
      <section className="auth-page-container">
        <div className="auth-page-heading">
          <span className="auth-page-label">찾취 계정</span>
          <h1>로그인</h1>
          <p>계정에 로그인하고 분실물 정보를 확인해 보세요.</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
            <label htmlFor="email">이메일</label>
            <input
              id="email"
              className="auth-input"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="이메일을 입력해주세요"
              autoComplete="email"
              required
            />
          </div>

          <div className="auth-field">
            <label htmlFor="password">비밀번호</label>
            <input
              id="password"
              className="auth-input"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="비밀번호를 입력해주세요"
              autoComplete="current-password"
              required
            />
          </div>

          {error && (
            <p className="auth-error" role="alert">
              {error}
            </p>
          )}

          <button
            className="auth-submit-button"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? '로그인 중...' : '로그인'}
          </button>
        </form>

        <p className="auth-switch-text">
          아직 계정이 없으신가요?
          <Link to="/signup">회원가입</Link>
        </p>
      </section>
    </main>
  );
}
