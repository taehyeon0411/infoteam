import { useEffect, useState } from "react";
import "./Post.css";
import { Link } from "react-router-dom";
import { findPosts } from "../../api/getPostsApi";

export default function Post({selected, keyword, category, location,
}) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function findAll() {
      try {
        const result = await findPosts();

        setPosts(Array.isArray(result) ? result : []);
      } catch (error) {
        console.error("게시글을 불러오지 못했습니다.", error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    }

    findAll();
  }, []);

  // 검색어 공백 제거 + 대소문자 구분 없이 검색
  const normalizedKeyword = (keyword ?? "").trim().toLowerCase();

  // 전체 / 습득물 / 분실물 / 검색 / 카테고리 / 장소 필터
  const filteredPosts = posts.filter((post) => {
    // 메인 필터: 전체, 습득물, 분실물
    const matchesType =
      selected === "all" ||
      (selected === "found" && post.lost_found === "FOUND") ||
      (selected === "lost" && post.lost_found === "LOST");

    // 물품명 검색
    const matchesKeyword =
      !normalizedKeyword ||
      (post.itemName ?? "")
        .toLowerCase()
        .includes(normalizedKeyword);

    //카테고리 필터
    const matchesCategory =
      category === "all" || post.category === category;

    //장소ㅗ 필터
    const matchesLocation =
      location === "all" || post.foundLocation === location;

    // 모든 조건을 만족하는 게시글 리턴
    return (
      matchesType &&
      matchesKeyword &&
      matchesCategory &&
      matchesLocation
    );
  });

  if (loading) {
    return (
      <section className="posts-section">
        <p className="empty-message">
          게시글을 불러오는 중입니다...
        </p>
      </section>
    );
  }

  return (
    <section className="posts-section">
      <div className="post-list">
        {filteredPosts.length === 0 ? (
          <p className="empty-message">
            검색 조건에 맞는 게시글이 없습니다.
          </p>
        ) : (
          filteredPosts.map((post) => (
            <Link to={`/posts/${post.id}`} key={post.id}>
              <article className="post-card">
                {/* 물품명 */}
                <h3 className="post-title">{post.itemName}</h3>

                {/* 이미지 */}
                <div className="post-image-area">
                  {post.imageUrl ? (
                    <img
                      className="post-image"
                      src={post.imageUrl}
                      alt={post.itemName}
                    />
                  ) : (
                    <div className="no-image">사진 없음</div>
                  )}
                </div>

                {/* 장소 + 카테고리 */}
                <div className="post-info">
                  <p className="post-location">
                    📍 {post.foundLocation}
                  </p>

                  <span className="post-category">
                    {post.category}
                  </span>
                </div>
              </article>
            </Link>
          ))
        )}
      </div>
    </section>
  );
}
