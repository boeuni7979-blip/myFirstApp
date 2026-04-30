'use client';

import { loginAction } from '@/app/actions';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const result = await loginAction(formData);

    if (result?.error) {
      alert(result.error);
    } else {
      alert('환영합니다!');
      router.push('/welcome');
    }
  }

  return (
    <div className="container" id="loginContainer">
      <header className="header">
        <h1>다시 오신 것을 환영합니다</h1>
        <p>로그인을 위해 정보를 입력해 주세요.</p>
      </header>

      <form id="loginForm" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">이메일 주소</label>
          <div className="input-container">
            <input type="email" id="email" name="email" placeholder="name@company.com" required />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="password">비밀번호</label>
          <div className="input-container">
            <input type="password" id="password" name="password" placeholder="••••••••" required />
          </div>
        </div>

        <div className="remember-me">
          <label>
            <input type="checkbox" name="remember" />
            계정 기억하기
          </label>
          <a href="#" style={{ color: 'var(--primary)', textDecoration: 'none' }}>비밀번호를 잊으셨나요?</a>
        </div>

        <button type="submit" className="btn" id="loginBtn">로그인</button>
      </form>

      <p className="footer-text">
        계정이 없으신가요? <Link href="/signup">회원가입하기</Link>
      </p>
    </div>
  );
}
