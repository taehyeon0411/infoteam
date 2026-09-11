const BASE_URL = 'http://localhost:3000/api/posts'

export async function findPosts() {
    const response = await fetch(BASE_URL);

    if(!response.ok) {
        throw new Error("게시글을 불러오지 못했습니다.");

    }
    const result = await response.json();

    return result.items;
}

export async function findPostsDetail(id) {
    const response = await fetch(`${BASE_URL}/${id}`)
    if(!response.ok) {
        throw new Error("게시글을 불러오지 못했습니다.");

    }
    return response.json();
}

export async function findPostsLength() {
    const response = await fetch(BASE_URL);

    if(!response.ok) {
        throw new Error("게시글을 불러오지 못했습니다.");

    }
    const result = await response.json();

    return result.totalCount;
}