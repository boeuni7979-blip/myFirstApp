/**
 * 지정된 페이지로 이동하는 함수
 * @param {string} page - 이동할 페이지 파일명 (예: 'login.html')
 */
function navigateTo(page) {
    window.location.href = page;
}

/**
 * 회원가입 폼 제출을 처리하는 함수
 * 데이터를 LocalStorage에 저장합니다.
 */
function handleSignup(event) {
    // 폼 기본 제출 동작(페이지 새로고침) 방지
    event.preventDefault();

    // 폼 입력값 가져오기
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // 사용자 데이터 객체 생성
    const userData = {
        name: name,
        email: email,
        password: password,
        signupDate: new Date().toLocaleString()
    };

    // 1. 기존 가입된 사용자 목록 가져오기 (없으면 빈 배열)
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    // 2. 중복된 이름이 있는지 확인
    const isDuplicate = users.some(user => user.name === name);

    if (isDuplicate) {
        alert('이미 등록된 이름입니다. 다른 이름을 입력해 주세요.');
        return; // 가입 중단
    }

    // 3. 새로운 사용자 추가
    users.push(userData);

    // 4. LocalStorage에 'users'라는 키로 저장
    localStorage.setItem('users', JSON.stringify(users));

    console.log('새로운 사용자가 등록되었습니다:', userData);
    alert('회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.');

    // 로그인 페이지로 이동
    window.location.href = 'login.html';
}

/**
 * 로그인을 처리하는 함수
 * LocalStorage의 'users' 배열에서 데이터를 확인합니다.
 */
function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // 1. 저장된 사용자 목록 가져오기
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    // 2. 이메일과 비밀번호가 일치하는 사용자 찾기
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        // 로그인 성공: 세션처럼 현재 로그인한 사용자 정보 저장
        localStorage.setItem('loggedInUser', JSON.stringify(user));

        alert(`${user.name}님, 환영합니다!`);
        // 대시보드(환영) 페이지로 이동
        window.location.href = 'welcome.html';
    } else {
        // 로그인 실패
        alert('이메일 또는 비밀번호가 일치하지 않습니다.');
    }
}

/**
 * 로그아웃 처리 함수
 */
function handleLogout() {
    localStorage.removeItem('loggedInUser');
    window.location.href = 'index.html';
}
