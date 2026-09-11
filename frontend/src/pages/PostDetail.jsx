import React, { useEffect, useState } from "react";
import "./PostDetail.css";
import { Link, useParams } from "react-router-dom";
import { findPostsDetail } from "../api/getPostsApi";

export default function PostDetail() {
  const { id } = useParams();
  const [postsDetail, setPostsDetail] = useState(null);

  useEffect(() => {
    async function findOne() {
      try {
       const result =  await findPostsDetail(id);
       setPostsDetail(result);
       
      } catch(error) {
        console.error(error);
      }
    }
    findOne();
  },[id]);

  if (!postsDetail) {
    return (
      <div className="post-not-found">
        <h2>게시글을 찾을 수 없습니다.</h2>
        <Link to="/posts">목록으로 돌아가기</Link>
      </div>
    );
  }

  const isFound = postsDetail.lost_found === "FOUND";

  return (
    <main className="post-detail">
      {/* 목록으로 이동 */}
      <Link to="/posts" className="back-link">
        ← 목록으로 돌아가기
      </Link>

      {/* 상태 뱃지 + 제목 */}
      <header className="detail-header">
        <span className={`type-badge ${isFound ? "found" : "lost"}`}>
          {isFound ? "습득물" : "분실물"}
        </span>

        <h1 className="detail-title">{postsDetail.itemName}</h1>

        <p className="detail-created-at">
          등록일 {new Date(postsDetail.createdAt).toLocaleDateString("ko-KR")}
        </p>
      </header>

      {/* 이미지 */}
      <section className="detail-image-box">
        {postsDetail.imageUrl ? (
          <img
            className="detail-image"
            src={postsDetail.imageUrl}
            alt={postsDetail.itemName}
          />
        ) : (
          <div className="no-image">
            <span>📷</span>
            <p>등록된 사진이 없습니다.</p>
          </div>
        )}
      </section>
      
      <section className="detail-card">
        <h2>물품 정보</h2>

        <div className="info-row">
          <span className="info-label">카테고리</span>
          <strong>{postsDetail.category}</strong>
        </div>

        <div className="info-row">
          <span className="info-label">
            {isFound ? "습득 장소" : "분실 추정 장소"}
          </span>
          <strong>📍 {postsDetail.foundLocation}</strong>
        </div>

        <div className="info-row">
          <span className="info-label">
            {isFound ? "습득 일시" : "분실 추정 일시"}
          </span>
          <strong>
            {new Date(postsDetail.foundAt).toLocaleString("ko-KR", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </strong>
        </div>

        <div className="info-row">
          <span className="info-label">처리 상태</span>
          <strong
            className={`status-text ${
              postsDetail.status === "OPEN" ? "open" : "completed"
            }`}
          >
            {postsDetail.status === "OPEN" ? "주인 찾는 중" : "전달 완료"}
          </strong>
        </div>
      </section>

      <section className="detail-card">
        <h2>상세 설명</h2>
        <p className="detail-description">{postsDetail.description}</p>
      </section>

      {isFound && (
        <section className="detail-card">
          <h2>보관 장소</h2>
          <p className="detail-description">🏢 {postsDetail.storageLocation}</p>
        </section>
      )}

      <section className="detail-card contact-card">
        <h2>연락 방법</h2>
        <p className="detail-description">{postsDetail.contact}</p>
      </section>
    </main>
  );
}
