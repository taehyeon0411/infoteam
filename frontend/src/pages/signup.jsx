import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../api/auth';
import './auth.css';

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    nickname: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');

    if (form.password.length < 8) {
      setError('비밀번호는 8자 이상 입력해주세요.');
      return;
    }

    try {
      setIsSubmitting(true);

      await signup(form);

      alert('회원가입이 완료되었습니다. 로그인해주세요.');
      navigate('/login');
    } catch (err) {
      setError(err.message || '회원가입에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="auth-main">
      <section className="auth-page-container">
        <div className="auth-page-heading">
          <span className="auth-page-label">찾취 계정</span>
          <h1>회원가입</h1>
          <p>간단한 정보 입력 후 찾취 서비스를 이용해 보세요.</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
            <label htmlFor="email">이메일</label>
            <input
              id="email"
              name="email"
              className="auth-input"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="이메일을 입력해주세요"
              autoComplete="email"
              required
            />
          </div>

          <div className="auth-field">
            <label htmlFor="nickname">닉네임</label>
            <input
              id="nickname"
              name="nickname"
              className="auth-input"
              type="text"
              value={form.nickname}
              onChange={handleChange}
              placeholder="게시판에서 사용할 닉네임"
              autoComplete="nickname"
              required
            />
          </div>

          <div className="auth-field">
            <label htmlFor="password">비밀번호</label>
            <input
              id="password"
              name="password"
              className="auth-input"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="8자 이상 입력해주세요"
              autoComplete="new-password"
              minLength={8}
              required
            />
            <p className="auth-password-guide">
              비밀번호는 8자 이상 입력해주세요.
            </p>
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
            {isSubmitting ? '가입 중...' : '회원가입'}
          </button>
        </form>

        <p className="auth-switch-text">
          이미 계정이 있으신가요?
          <Link to="/login">로그인</Link>
        </p>
      </section>
    </main>
  );
}
