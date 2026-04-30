'use client';

import { useEffect } from 'react';
import { logoutAction } from '@/app/actions';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function WelcomeClient({ user }) {
  const router = useRouter();

  useEffect(() => {
    // Petals generation
    const petalsContainer = document.getElementById('petals-container');
    if (!petalsContainer) return;
    
    petalsContainer.innerHTML = ''; // clean up existing petals if any
    for (let i = 0; i < 20; i++) {
        createPetal();
    }

    function createPetal() {
        const petal = document.createElement('div');
        petal.className = 'petal';
        
        const size = Math.random() * 10 + 10 + 'px';
        petal.style.width = size;
        petal.style.height = size;
        
        petal.style.left = Math.random() * 100 + 'vw';
        petal.style.animationDuration = Math.random() * 5 + 5 + 's';
        petal.style.animationDelay = Math.random() * 5 + 's';
        
        petalsContainer.appendChild(petal);
    }
  }, []);

  async function handleLogout(e) {
    e.preventDefault();
    await logoutAction();
    router.push('/');
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        :root {
            --spring-bg: linear-gradient(135deg, #fff5f7 0%, #fff9db 50%, #f0fff4 100%);
            --petal-pink: #ffb7c5;
            --leaf-green: #98d8a0;
            --text-dark: #2d3436;
        }

        body {
            background: var(--spring-bg) !important;
            color: var(--text-dark) !important;
        }

        body::before {
            display: none !important;
        }

        .petal {
            position: absolute;
            background-color: var(--petal-pink);
            border-radius: 150% 0 150% 0;
            opacity: 0.3;
            z-index: 0;
            animation: fall linear infinite;
        }

        @keyframes fall {
            0% { transform: translateY(-10vh) rotate(0deg); opacity: 0; }
            10% { opacity: 0.6; }
            90% { opacity: 0.6; }
            100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
        }

        .welcome-container {
            background: rgba(255, 255, 255, 0.7);
            backdrop-filter: blur(15px);
            border: 1px solid rgba(255, 255, 255, 0.5);
            padding: 4rem 3rem;
            border-radius: 32px;
            text-align: center;
            max-width: 550px;
            width: 90%;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.05);
            animation: springUp 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            position: relative;
            z-index: 10;
        }

        @keyframes springUp {
            from { transform: scale(0.8); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }

        .spring-header h1 {
            font-size: 2.8rem;
            color: var(--text-dark);
            background: none;
            -webkit-text-fill-color: initial;
            margin-bottom: 1rem;
        }

        .user-highlight {
            color: var(--petal-pink);
            position: relative;
            display: inline-block;
        }

        .user-highlight::after {
            content: '';
            position: absolute;
            bottom: 5px;
            left: 0;
            width: 100%;
            height: 10px;
            background: rgba(255, 183, 197, 0.3);
            z-index: -1;
        }

        .spring-message {
            font-size: 1.1rem;
            color: #636e72;
            margin-bottom: 2.5rem;
            line-height: 1.6;
        }

        .btn-home {
            background: linear-gradient(to right, var(--petal-pink), #ff9a9e);
            border: none;
            padding: 1rem 2.5rem;
            border-radius: 50px;
            color: white;
            font-weight: 600;
            font-size: 1.1rem;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 10px 20px rgba(255, 183, 197, 0.4);
            text-decoration: none;
            display: inline-block;
        }

        .btn-home:hover {
            transform: translateY(-3px) scale(1.05);
            box-shadow: 0 15px 25px rgba(255, 183, 197, 0.5);
        }

        .logout-link {
            display: block;
            margin-top: 1.5rem;
            color: #b2bec3;
            text-decoration: none;
            font-size: 0.9rem;
            transition: color 0.3s;
            cursor: pointer;
        }

        .logout-link:hover {
            color: #ff7675;
        }
      `}} />

      <div id="petals-container" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', zIndex: 0, pointerEvents: 'none' }}></div>

      <div className="welcome-container">
        <header className="spring-header">
            <h1 style={{ whiteSpace: 'nowrap' }}>환영합니다, <span className="user-highlight">{user.name}</span>님!</h1>
            <p className="spring-message">
                따스한 햇살과 함께 새로운 시작이 찾아왔습니다.<br/>
                봄의 기운을 담은 특별한 경험을 시작해 보세요.
            </p>
        </header>

        <div className="content">
            <Link href="/" className="btn-home">홈으로 이동</Link>
            <a onClick={handleLogout} className="logout-link">로그아웃</a>
        </div>
      </div>
    </>
  );
}
