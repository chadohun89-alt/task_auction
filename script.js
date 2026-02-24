let currentPrice = 0;

/*작품 선택 및 경매 시작*/

function selectArt(title, artist, price, estimate) {
    // 1. 섹션 전환 
    document.getElementById('catalog-section').classList.add('hidden');
    document.getElementById('auction-room').classList.remove('hidden');
    
    // 2. 작품 기본 정보 표시
    document.getElementById('art-title').innerText = title;
    document.getElementById('art-artist').innerText = artist;
    
    // 3. 이미지 소스 연동
    const cards = document.querySelectorAll('.art-card');
    cards.forEach(card => {
        const cardTitle = card.querySelector('h3').innerText;
        if(cardTitle.includes(title) || title.includes(cardTitle)) {
            const selectedImgSrc = card.querySelector('img').src;
            document.getElementById('auction-art-img').src = selectedImgSrc;
        }
    });
    
    // 4. 가격 데이터 초기화 및 UI 반영
    currentPrice = price;
    document.getElementById('current-price').innerText = `₩${currentPrice.toLocaleString()}`;
    
    // 5. 입찰 기록 초기화 
    const bidHistory = document.getElementById('bid-history');
    if (bidHistory) bidHistory.innerHTML = "";
    
    // 6. 화면 최상단으로 스크롤 
    window.scrollTo(0, 0);

    // 이후 타이머 시작 함수 호출 
    if (typeof startAuctionTimer === 'function') {
        startAuctionTimer(60); 
    } else if (typeof startTimer === 'function') {
        startTimer();
    }
}

// 타이머 관리
let auctionTimer = null; // 타이머 제어를 위한 변수만 남겨둡니다.


// 2. 남은 시간 카운트다운 (매개변수로 시간을 받음)
function startAuctionTimer(seconds) {
    timeLeft = seconds; // 함수 내부 변수로 관리
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
