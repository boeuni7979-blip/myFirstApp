'use client';

import { signupAction } from '@/app/actions';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignupPage() {
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const result = await signupAction(formData);

    if (result?.error) {
      alert(result.error);
    } else {
      alert('회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.');
      router.push('/login');
    }
  }

  return (
    <div className="container" id="signupContainer">
      <header className="header">
        <h1>계정 생성</h1>
        <p>프리미엄 커뮤니티의 일원이 되어보세요.</p>
      </header>

      <form id="signupForm" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">이름</label>
          <div className="input-container">
            <input type="text" id="name" name="name" placeholder="홍길동" required />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="email">이메일 주소</label>
          <div className="input-container">
            <input type="email" id="email" name="email" placeholder="name@company.com" required />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="password">비밀번호</label>
          <div className="input-container">
            <input type="password" id="password" name="password" placeholder="••••••••" required minLength={8} />
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
              최소 8자 이상의 비밀번호를 입력해 주세요.
            </p>
          </div>
        </div>

        <div className="remember-me">
          <label>
            <input type="checkbox" name="terms" required />
            <a href="#">이용약관</a>에 동의합니다
          </label>
        </div>

        <button type="submit" className="btn" id="signupBtn">시작하기</button>
      </form>

      <p className="footer-text">
        이미 계정이 있으신가요? <Link href="/login">여기서 로그인하세요</Link>
      </p>
    </div>
  );
}
