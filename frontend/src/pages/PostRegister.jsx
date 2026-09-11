import { useState } from "react";
import { Link } from "react-router-dom";
import "./PostRegister.css";

const initialForm = {
  lost_found: "FOUND",
  itemName: "",
  category: "",
  foundLocation: "",
  foundAt: "",
  description: "",
  imageUrl: "",
  storageLocation: "",
  contact: "",
};

export default function PostRegister() {
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState("");

  const isFound = form.lost_found === "FOUND";

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/posts", {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...form,

      // datetime-local 형식을 ISO 날짜로 변환
      foundAt: new Date(form.foundAt).toISOString(),
    }),
  });

  if (!response.ok) {
    throw new Error("게시글 등록에 실패했습니다.");
  }

  const createdPost = await response.json();

  console.log("등록 완료:", createdPost);
  setMessage("게시글이 등록되었습니다.");
} catch (error) {
  console.error(error);
  setMessage("등록 중 오류가 발생했습니다.");
}

  }

  return (
    <main className="post-create-page">
      <header className="create-header">
        <Link to="/posts" className="back-link">
          ← 목록으로 돌아가기
        </Link>

        <h1>게시글 등록</h1>
        <p>분실물 또는 습득물 정보를 입력해 주세요.</p>
      </header>

      <form className="post-create-form" onSubmit={handleSubmit}>
        <section className="form-section">
          <h2>게시글 유형</h2>

          <div className="type-select">
            <label
              className={`type-option ${isFound ? "selected found" : ""}`}
            >
              <input
                type="radio"
                name="lost_found"
                value="FOUND"
                checked={isFound}
                onChange={handleChange}
              />
              습득물
            </label>

            <label
              className={`type-option ${!isFound ? "selected lost" : ""}`}
            >
              <input
                type="radio"
                name="lost_found"
                value="LOST"
                checked={!isFound}
                onChange={handleChange}
              />
              분실물
            </label>
          </div>
        </section>

        <section className="form-section">
          <h2>물품 정보</h2>

          <div className="form-group">
            <label htmlFor="itemName">
              물품명 <em>*</em>
            </label>
            <input
              id="itemName"
              name="itemName"
              value={form.itemName}
              onChange={handleChange}
              placeholder="예: 검정색 카드지갑"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">
              카테고리 <em>*</em>
            </label>
            <select
              id="category"
              name="category"
              value={form.category}
              onChange={handleChange}
              required
            >
              <option value="">카테고리를 선택하세요</option>
              <option value="지갑">지갑</option>
              <option value="휴대폰">휴대폰</option>
              <option value="가방">가방</option>
              <option value="전자기기">전자기기</option>
              <option value="의류">의류</option>
              <option value="카드/신분증">카드/신분증</option>
              <option value="기타">기타</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="imageUrl">이미지 URL</label>
            <input
              id="imageUrl"
              name="imageUrl"
              type="url"
              value={form.imageUrl}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
            />
            <small>이미지 업로드 기능 전까지 URL로 테스트할 수 있어요.</small>
          </div>
        </section>

        <section className="form-section">
          <h2>{isFound ? "습득 정보" : "분실 정보"}</h2>

          <div className="form-group">
            <label htmlFor="foundLocation">
              {isFound ? "습득 장소" : "분실 추정 장소"} <em>*</em>
            </label>
            <input
              id="foundLocation"
              name="foundLocation"
              value={form.foundLocation}
              onChange={handleChange}
              placeholder="예: 도서관 1층 입구"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="foundAt">
              {isFound ? "습득 일시" : "분실 추정 일시"} <em>*</em>
            </label>
            <input
              id="foundAt"
              name="foundAt"
              type="datetime-local"
              value={form.foundAt}
              onChange={handleChange}
              required
            />
          </div>

          {isFound && (
            <div className="form-group">
              <label htmlFor="storageLocation">보관 장소</label>
              <input
                id="storageLocation"
                name="storageLocation"
                value={form.storageLocation}
                onChange={handleChange}
                placeholder="예: 학생회관 1층 안내 데스크"
              />
            </div>
          )}
        </section>

        <section className="form-section">
          <h2>추가 정보</h2>

          <div className="form-group">
            <label htmlFor="description">
              상세 설명 <em>*</em>
            </label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="물품의 색상, 특징, 분실/습득 당시 상황을 적어 주세요."
              rows="6"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="contact">
              연락 방법 <em>*</em>
            </label>
            <input
              id="contact"
              name="contact"
              value={form.contact}
              onChange={handleChange}
              placeholder="예: 학생회관 안내 데스크에 방문해 주세요."
              required
            />
          </div>
        </section>

        {message && <p className="form-message">{message}</p>}

        <div className="form-actions">
          <Link to="/posts" className="cancel-button">
            취소
          </Link>

          <button type="submit" className="submit-button">
            등록하기
          </button>
        </div>
      </form>
    </main>
  );
}
