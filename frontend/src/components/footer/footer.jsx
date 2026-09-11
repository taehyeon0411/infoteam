import "./footer.css";
import { CgProfile } from "react-icons/cg";
import { FaPlusCircle, FaListUl } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  const handleClickToPosts = () => {
    navigate('/posts');
  };

  const handleClickToPostRegister = () => {
    navigate('/posts/register');
  };

  const handleClickToMyInfo = () => {
    // 로그인 성공 시 Login 페이지에서 저장한 토큰 확인
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      navigate('/profile');
      return;
    }

    navigate('/login');
  };

  return (
    <nav className="nav">
      <button className="nav-item active" onClick={handleClickToPosts}>
        <FaListUl size={25} />
        <span>목록</span>
      </button>

      <button className="nav-item add" onClick={handleClickToPostRegister}>
        <FaPlusCircle size={31} />
        <span>등록</span>
      </button>

      <button className="nav-item" onClick={handleClickToMyInfo}>
        <CgProfile size={29} />
        <span>내 정보</span>
      </button>
    </nav>
  );
}
