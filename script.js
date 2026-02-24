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

// 타이머 관리
{
    let timeLeft = 60; 
    const secondsDisplay = document.getElementById('seconds');

    const auctionTimer = setInterval(() => {
        timeLeft--;
        if (secondsDisplay) secondsDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(auctionTimer);
            endAuction();
        }
    }, 1000);

    function endAuction() {
        
    }

function endAuction() {
         alert("경매가 종료되었습니다!");
        // 입찰 버튼 비활성화 (종료 후 클릭 방지)
        const bidButtons = document.querySelectorAll('.btn-bid');
        bidButtons.forEach(button => {
            button.disabled = true;
            button.style.opacity = "0.5";
            button.style.cursor = "not-allowed";
        });

        console.log("경매가 종료되었습니다.");
    }
}



// 입찰 로직



// 기록 반영 및 최종 결과
