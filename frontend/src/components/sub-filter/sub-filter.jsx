import { useEffect, useState } from "react";
import "./sub-filter.css";
import { findPostsLength } from "../../api/getPostsApi";

export default function Sfilter({
  category,
  setCategory,
  location,
  setLocation,
}) {
  const [postsLength, setPostsLength] = useState(0);

  useEffect(() => {
    async function getPostsLength() {
      try {
        // await가 반드시 필요함
        const response = await findPostsLength();

        // API가 숫자만 반환하거나, { count: 숫자 } 형태 모두 대응
        setPostsLength(
          typeof response === "number" ? response : response.count ?? 0
        );
      } catch (error) {
        console.error("게시글 수를 불러오지 못했습니다.", error);
      }
    }

    getPostsLength();
  }, []);

  return (
    <div className="sub-filter">
      <span>등록된 물품:</span>
      <strong>&nbsp; {postsLength}</strong>

      {/* 카테고리 필터 */}
      <select
        value={category}
        onChange={(event) => setCategory(event.target.value)}
      >
        <option value="all">카테고리 전체</option>
        <option value="우산">우산</option>
        <option value="전자기기">전자기기</option>
        <option value="필기구">필기구</option>
        <option value="지갑">지갑</option>
        <option value="기타">기타</option>
      </select>

      {/* 장소 필터 */}
      <select
        value={location}
        onChange={(event) => setLocation(event.target.value)}
      >
        <option value="all">장소 전체</option>
        <option value="대학생기숙사 A동">대학생기숙사 A동</option>
        <option value="대학생기숙사 B동">대학생기숙사 B동</option>
        <option value="지스트대학 A,B,C동">지스트대학 A,B,C동</option>
        <option value="제 2학생회관">제 2학생회관</option>
        <option value="제 1학생회관">제 1학생회관</option>
        <option value="기타">기타</option>
      </select>
    </div>
  );
}
