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



// 기록 반영 및 최종 결과
