const API_URL = 'http://localhost:3000';

export async function signup({ email, password, nickname }) {
  const response = await fetch(`${API_URL}/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
      nickname,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    // Nest ValidationPipe 오류는 message가 배열일 수도 있다.
    const message = Array.isArray(data.message)
      ? data.message.join('\n')
      : data.message;

    throw new Error(message || '회원가입에 실패했습니다.');
  }

  return data;
}

export async function login({ email, password }) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    const message = Array.isArray(data.message)
      ? data.message.join('\n')
      : data.message;

    throw new Error(message || '로그인에 실패했습니다.');
  }

  return data;
}
