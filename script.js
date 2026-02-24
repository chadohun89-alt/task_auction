/* 공통 변수 */

let currentPrice = 0;     // 현재 입찰가
let timeLeft = 60;        // 남은 시간
let timerInterval = null; // 타이머 제어용

/* 작품 선택 및 경매 시작  */

function selectArt(title, artist, price) {
    // 카드 이미지 가져오기
    const clickedCard = window.event.currentTarget;
    const selectedImgSrc = clickedCard.querySelector('img').src;

    // 섹션 전환
    document.getElementById('catalog-section').classList.add('hidden');
    document.getElementById('auction-room').classList.remove('hidden');

    // 작품 정보 반영
    document.getElementById('art-title').innerText = title;
    document.getElementById('art-artist').innerText = artist;
    document.getElementById('auction-art-img').src = selectedImgSrc;

    // 시작가 저장
    currentPrice = Number(price);

    // 초기화
    timeLeft = 60;
    document.getElementById('seconds').innerText = timeLeft;
    document.getElementById('bid-history').innerHTML = "";

    // 입찰 버튼 활성화
    const bidButtons = document.querySelectorAll('.btn-bid');
    bidButtons.forEach(button => {
        button.disabled = false;
        button.style.opacity = "1";
        button.style.cursor = "pointer";
    });

    window.scrollTo(0, 0);

    updateUI();
    startTimer();
}

/* 타이머 */
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

/* 입찰 로직 */
function placeBid(increment) {
    if (timeLeft <= 0) return;

    currentPrice += increment;

    const historyList = document.getElementById('bid-history');
    if (historyList) {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="history-user">User</span>
            <span class="history-price">₩${currentPrice.toLocaleString()}</span>
        `;
        historyList.prepend(li);
    }

    updateUI();
}

/* UI 업데이트 */
function updateUI() {
    const priceDisplay = document.getElementById('current-price');
    if (priceDisplay) {
        priceDisplay.innerText = `₩${currentPrice.toLocaleString()}`;
    }
}

/* 경매 종료 */
function endAuction() {
    const resultModal = document.getElementById('result-modal');
    if (resultModal) {
        resultModal.classList.remove('hidden');
        document.getElementById('winner-info').innerText = "AUCTION CLOSED";
        document.getElementById('final-price-display').innerText =
            "최종 낙찰가: ₩" + currentPrice.toLocaleString();
    }

    const bidButtons = document.querySelectorAll('.btn-bid');
    bidButtons.forEach(button => {
        button.disabled = true;
        button.style.opacity = "0.5";
        button.style.cursor = "not-allowed";
    });

    if (timerInterval) clearInterval(timerInterval);
}

/* 갤러리 초기화 */
function resetGallery() {
    if (timerInterval) clearInterval(timerInterval);
    location.reload();
}