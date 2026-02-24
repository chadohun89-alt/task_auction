let currentPrice = 0;
let timeLeft = 60;
let timerInterval = null;

/* 작품 선택 및 경매 시작 */

/**
 * @param {string} title - 작품 제목
 * @param {string} artist - 작가 이름
 * @param {number} price - 시작 가격
 */

function selectArt(title, artist, price) {
    const e = window.event || event;
    const clickedCard = e.currentTarget;
    const selectedImgSrc = clickedCard.querySelector('img').src;

    document.getElementById('catalog-section').classList.add('hidden');
    document.getElementById('auction-room').classList.remove('hidden');
    
    document.getElementById('art-title').innerText = title;
    document.getElementById('art-artist').innerText = artist;
    
    // 이미지 소스 적용
    const mainImg = document.getElementById('auction-art-img');
    mainImg.src = selectedImgSrc;
    
    // 화면 최상단으로 스크롤 
    window.scrollTo(0, 0);

    currentPrice = price;
    timeLeft = 60; 
    document.getElementById('bid-history').innerHTML = "";
    
    updateUI();
    startTimer();
}

function resetGallery() {
    // 1. 실행 중인 타이머가 있다면 중지
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }

    // 2. 섹션 전환 (경매장 숨기고 카탈로그 표시)
    document.getElementById('auction-room').classList.add('hidden');
    document.getElementById('catalog-section').classList.remove('hidden');

    // 3. 결과 모달이 떠 있다면 닫기
    const modal = document.getElementById('result-modal');
    if (modal) {
        modal.classList.add('hidden');
    }

    // 4. 화면 최상단으로 스크롤
    window.scrollTo(0, 0);
}

// 타이머 관리
let auctionTimer = null; // 타이머 제어를 위한 변수만 남겨둡니다.

// 1. 경매 화면 진입 (여기서 timeLeft를 시작합니다)
function selectArt(title, artist, startPrice, estimate) {
    document.getElementById('catalog-section').classList.add('hidden');
    document.getElementById('auction-room').classList.remove('hidden');
    
    document.getElementById('art-title').innerText = title;
    document.getElementById('art-artist').innerText = artist;
    
    // 이미지 복사 로직 (제목 매칭 강화)
    const cards = document.querySelectorAll('.art-card');
    cards.forEach(card => {
        const cardTitle = card.querySelector('h3').innerText;
        if(cardTitle.includes(title) || title.includes(cardTitle)) {
            document.getElementById('auction-art-img').src = card.querySelector('img').src;
        }
    });

    document.getElementById('current-price').innerText = `₩${startPrice.toLocaleString()}`;
    
    // ★ 전역 변수 대신, 60초라는 숫자를 직접 전달하며 타이머 시작
    startAuctionTimer(60); 
}

// 2. 남은 시간 카운트다운 (매개변수로 시간을 받음)
function startAuctionTimer(seconds) {
    let timeLeft = seconds; // 함수 내부 변수로 관리
    const secondsDisplay = document.getElementById('seconds');
    
    if (auctionTimer) clearInterval(auctionTimer);

    auctionTimer = setInterval(() => {
        timeLeft--;
        if (secondsDisplay) secondsDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(auctionTimer);
            endAuction(); 
        }
    }, 1000);
}

// 3. 종료 처리 및 모달 표시
function endAuction() {
    if (auctionTimer) clearInterval(auctionTimer);
    
    // 시간 표시 0으로 고정
    const secondsDisplay = document.getElementById('seconds');
    if (secondsDisplay) secondsDisplay.textContent = "0";

    // 버튼 비활성화 (담당 기능)
    const bidButtons = document.querySelectorAll('.btn-bid');
    bidButtons.forEach(button => {
        button.disabled = true;
        button.style.opacity = "0.5";
        button.style.cursor = "not-allowed";
    });

    // 결과 모달 노출 (담당 기능)
    const modal = document.getElementById('result-modal');
    if (modal) {
        modal.classList.remove('hidden');
        
        // 최종 낙찰가 표시
        const currentPrice = document.getElementById('current-price').innerText;
        const priceDisplay = document.getElementById('final-price-display');
        if (priceDisplay) priceDisplay.innerText = `최종 낙찰가: ${currentPrice}`;
    }
}

// 4. 초기화
function resetGallery() {
    location.reload();
}

// 입찰 로직

/* ============================================================
   공통 변수 설정
   ============================================================ */
// let currentPrice = 0;    // 현재 입찰가 (황유빈 담당 핵심 변수)
// let timeLeft = 60;       // 남은 시간
// let timerInterval = null; // 타이머 제어용

/* ============================================================
   1~2번 항목: 작품 선택 및 화면 전환 (장지은/팀원 담당)
   ============================================================ */
function selectArt(title, artist, price) {
    const e = window.event || event;
    const clickedCard = e.currentTarget;
    const selectedImgSrc = clickedCard.querySelector('img').src;

    // 섹션 전환
    document.getElementById('catalog-section').classList.add('hidden');
    document.getElementById('auction-room').classList.remove('hidden');
    
    // 작품 정보 UI 반영
    document.getElementById('art-title').innerText = title;
    document.getElementById('art-artist').innerText = artist;
    document.getElementById('auction-art-img').src = selectedImgSrc;
    
    // [중요] 시작 가격을 입찰 변수에 저장 (황유빈 로직 연결)
    currentPrice = Number(price); 
    
    // 초기화 작업
    timeLeft = 60; 
    document.getElementById('bid-history').innerHTML = "";
    window.scrollTo(0, 0);

    // 화면 갱신 및 타이머 시작
    updateUI();
    startTimer();
}

/* ============================================================
   3번 항목: 타이머 및 경매 종료 (이창호 담당)
   ============================================================ */
function startTimer() {
    if (timerInterval) clearInterval(timerInterval);
    
    const secondsDisplay = document.getElementById('seconds');
    
    timerInterval = setInterval(() => {
        timeLeft--;
        if (secondsDisplay) secondsDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endAuction();
        }
    }, 1000);
}

function endAuction() {
    
    
    // 입찰 버튼 비활성화
    const bidButtons = document.querySelectorAll('.btn-bid');
    bidButtons.forEach(button => {
        button.disabled = true;
        button.style.opacity = "0.5";
        button.style.cursor = "not-allowed";
    });
}

function resetGallery() {
    if (timerInterval) clearInterval(timerInterval);
    document.getElementById('auction-room').classList.add('hidden');
    document.getElementById('catalog-section').classList.remove('hidden');
    window.scrollTo(0, 0);
}

/* ============================================================
   공통 변수 (모든 기능의 데이터 소스)
   ============================================================ */
// let currentPrice = 0;    // 현재 입찰가 
// let timeLeft = 60;       // 남은 시간
// let timerInterval = null; 

/* ============================================================
   기존 selectArt 함수 (유빈 님 로직과 연결 필수)
   ============================================================ */
function selectArt(title, artist, price) {
    const e = window.event || event;
    const clickedCard = e.currentTarget;
    const selectedImgSrc = clickedCard.querySelector('img').src;

    document.getElementById('catalog-section').classList.add('hidden');
    document.getElementById('auction-room').classList.remove('hidden');
    
    document.getElementById('art-title').innerText = title;
    document.getElementById('art-artist').innerText = artist;
    document.getElementById('auction-art-img').src = selectedImgSrc;
    
    // [핵심] 유빈 님의 currentPrice 변수에 시작가 저장
    currentPrice = Number(price); 
    
    timeLeft = 60; 
    document.getElementById('bid-history').innerHTML = "";
    window.scrollTo(0, 0);

    updateUI(); // 시작가를 화면에 먼저 표시
    startTimer();
}

/* ============================================================
   4번 항목: 입찰 로직 (황유빈 담당 최종형)
   ============================================================ */

/**
 * 입찰 실행 함수: 버튼 클릭 시 호출
 * @param {number} increment - 증액 금액 (+50000, +100000)
 */
function placeBid(increment) {
    // 1. 입찰 규칙 적용: 현재가에 클릭한 금액만큼 증액
    const nextPrice = currentPrice + increment;
    
    // 2. 전역 변수 업데이트 (최고가 갱신)
    currentPrice = nextPrice;
    
    // 3. 기록 반영 (Bid History 리스트 추가)
    const historyList = document.getElementById('bid-history');
    if (historyList) {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="history-user">User</span>
            <span class="history-price">₩${currentPrice.toLocaleString()}</span>
        `;
        historyList.prepend(li); // 최신 내역이 위로 쌓이게 처리
    }

    // 4. 화면 UI 업데이트 호출 (실시간 숫자 반영)
    updateUI();
}

/**
 * UI 갱신 함수: 현재가를 화면에 표시
 */
function updateUI() {
    const priceDisplay = document.getElementById('current-price');
    if (priceDisplay) {
        // 숫자를 세 자릿수 콤마 형식으로 변환 (120,000,000)
        priceDisplay.innerText = currentPrice.toLocaleString();
    }
}

/* ============================================================
   종료 로직 (팝업 제거 버전)
   ============================================================ */
function endAuction() {
    // 팝업(alert) 없이 모달창만 띄워 흐름을 유지합니다.
    const resultModal = document.getElementById('result-modal');
    if (resultModal) {
        resultModal.classList.remove('hidden');
        document.getElementById('winner-info').innerText = "AUCTION CLOSED";
        document.getElementById('final-price-display').innerText = "최종 낙찰가: ₩" + currentPrice.toLocaleString();
    }

    // 버튼 비활성화
    const bidButtons = document.querySelectorAll('.btn-bid');
    bidButtons.forEach(button => {
        button.disabled = true;
        button.style.opacity = "0.5";
        button.style.cursor = "not-allowed";
    });

    if (timerInterval) clearInterval(timerInterval);
}

// (기타 startTimer, resetGallery 함수는 기존 코드 유지)


// 기록 반영 및 최종 결과
