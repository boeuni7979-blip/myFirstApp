import Link from 'next/link';

export default function Home() {
  return (
    <div className="container" id="homeContainer" style={{ textAlign: 'center' }}>
      <header className="header">
        <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>AntiGravity</h1>
        <p>환영합니다</p>
      </header>

      <div className="cta-group">
        <Link href="/login" className="btn" style={{ textDecoration: 'none', display: 'inline-block', textAlign: 'center' }}>
          로그인
        </Link>
        <Link href="/signup" className="btn" style={{ background: 'transparent', border: '1px solid var(--primary)', textDecoration: 'none', display: 'inline-block', textAlign: 'center' }}>
          회원가입
        </Link>
      </div>
    </div>
  );
}
