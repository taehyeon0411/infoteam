import { Link, useNavigate } from 'react-router-dom';
import './Profile.css';

export default function Profile() {
  const navigate = useNavigate();

  const savedUser = localStorage.getItem('user');
  const user = savedUser ? JSON.parse(savedUser) : null;

  function handleLogout() {
    const confirmed = window.confirm('로그아웃 하시겠습니까?');

    if (!confirmed) return;

    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');

    alert('로그아웃되었습니다.');
    navigate('/login');
  }

  // 로그인하지 않은 상태라면
  if (!user) {
    return (
      <main className="myinfo-main">
        <section className="myinfo-container">
          <div className="myinfo-login-card">
            <div className="myinfo-profile-icon">♙</div>

            <h1>로그인이 필요합니다</h1>
            <p>
              내 정보와 내가 등록한 분실물·습득물을
              <br />
              확인하려면 로그인해 주세요.
            </p>

            <Link to="/login" className="myinfo-login-button">
              로그인하기
            </Link>

            <Link to="/signup" className="myinfo-signup-link">
              아직 계정이 없나요? 회원가입
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="myinfo-main">
      <section className="myinfo-container">
        <header className="myinfo-heading">
          <span className="myinfo-heading-label">MY PAGE</span>
          <h1>내 정보</h1>
          <p>내 계정과 등록한 게시글을 관리할 수 있어요.</p>
        </header>

        <section className="myinfo-profile-card">
          <div className="myinfo-avatar">
            {user.nickname?.charAt(0).toUpperCase() || 'U'}
          </div>

          <div className="myinfo-profile-text">
            <strong>{user.nickname || '사용자'}님</strong>
            <span>{user.email}</span>
          </div>
        </section>

        <section className="myinfo-menu-section">
          <h2>게시글 관리</h2>

          <Link to="/posts?mine=true" className="myinfo-menu-item">
            <span className="myinfo-menu-icon myinfo-document-icon">▤</span>

            <span className="myinfo-menu-content">
              <strong>내가 등록한 물품</strong>
              <small>내가 작성한 분실물·습득물 게시글 보기</small>
            </span>

            <span className="myinfo-arrow">›</span>
          </Link>
        </section>

        <section className="myinfo-menu-section">
          <h2>계정 관리</h2>

          <div className="myinfo-menu-item">
            <span className="myinfo-menu-icon myinfo-email-icon">@</span>

            <span className="myinfo-menu-content">
              <strong>이메일</strong>
              <small>{user.email}</small>
            </span>
          </div>

          <button
            type="button"
            className="myinfo-menu-item myinfo-logout-button"
            onClick={handleLogout}
          >
            <span className="myinfo-menu-icon myinfo-logout-icon">↪</span>

            <span className="myinfo-menu-content">
              <strong>로그아웃</strong>
              <small>현재 기기에서 계정을 로그아웃합니다.</small>
            </span>

            <span className="myinfo-arrow">›</span>
          </button>
        </section>
      </section>
    </main>
  );
}
