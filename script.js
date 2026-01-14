// ==========================
// PHONG BÌ: click mở/đóng
// ==========================
const envelope = document.getElementById("envelope");
const envelopeLetter = document.getElementById("envelope-letter");
const acceptBtn = document.getElementById("accept-btn");
const envelopeSection = document.getElementById("envelope-section");
const mainInterface = document.getElementById("main-interface");

envelope.addEventListener("click", function () {
  envelope.classList.toggle("open");

  if (envelope.classList.contains("open")) {
    setTimeout(() => {
      envelopeLetter.style.pointerEvents = "auto";
    }, 500);
  } else {
    envelopeLetter.style.pointerEvents = "none";

    const scrollBox = envelopeLetter.querySelector(".letter-content");
    if (scrollBox) scrollBox.scrollTop = 0;
  }
});

// chặn click trong thư làm đóng phong bì
envelopeLetter.addEventListener("click", function (e) {
  e.stopPropagation();
});

// bấm accept -> vào giao diện chính
acceptBtn.addEventListener("click", function (e) {
  e.stopPropagation();
  envelopeSection.classList.add("hidden");
  mainInterface.classList.remove("hidden");
  window.scrollTo(0, 0);
});

// ==========================
// TAB
// ==========================
const tabBtns = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

tabBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    tabBtns.forEach((b) => b.classList.remove("active"));
    tabContents.forEach((tc) => tc.classList.remove("active"));

    this.classList.add("active");
    document.getElementById(this.dataset.tab).classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

// ==========================
// ALBUM FILTER
// ==========================
const albumBtns = document.querySelectorAll(".album-btn");
const albumItems = document.querySelectorAll(".album-item");

albumBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    albumBtns.forEach((b) => b.classList.remove("active"));
    this.classList.add("active");

    const filter = this.dataset.album;
    albumItems.forEach((item) => {
      if (filter === "all" || item.classList.contains(filter)) {
        item.style.display = "";
      } else {
        item.style.display = "none";
      }
    });
  });
});

// ==========================
// VIDEO PLAYLIST
// ==========================
const videoThumbs = document.querySelectorAll(".video-thumb");
const videoPlayer = document.querySelector(".video-player iframe");

videoThumbs.forEach((thumb) => {
  thumb.addEventListener("click", function () {
    const videoId = this.dataset.video;
    videoPlayer.src = `https://www.youtube.com/embed/${videoId}`;

    videoThumbs.forEach((t) => t.classList.remove("active"));
    this.classList.add("active");
  });
});

// ==========================
// SHARE (giả lập)
// ==========================
const shareBtns = document.querySelectorAll(".share-btn[data-share]");
shareBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    const type = this.dataset.share;
    const url = window.location.href;
    let shareUrl = "";

    if (type === "facebook") {
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        url
      )}`;
    } else if (type === "zalo") {
      shareUrl = `https://zalo.me/share?url=${encodeURIComponent(url)}`;
    } else if (type === "messenger") {
      shareUrl = `https://www.facebook.com/dialog/send?link=${encodeURIComponent(
        url
      )}`;
    }

    if (shareUrl) window.open(shareUrl, "_blank");
  });
});

// ==========================
// 🎵 NHẠC NỀN: bật/tắt
// ==========================
const musicBtn = document.getElementById("music-control");
const musicIcon = document.getElementById("music-icon");
const musicText = document.getElementById("music-text");
const bgMusic = document.getElementById("bg-music");

// mặc định: tắt
let isPlaying = localStorage.getItem("bgMusic") === "on";

function updateMusicUI() {
  if (isPlaying) {
    musicBtn.classList.add("playing");
    musicText.textContent = "Nhạc: Bật";
    musicIcon.textContent = "🎶";
  } else {
    musicBtn.classList.remove("playing");
    musicText.textContent = "Nhạc: Tắt";
    musicIcon.textContent = "🎵";
  }
}

async function playMusic() {
  try {
    await bgMusic.play();
  } catch (e) {
    // browser chặn autoplay -> không sao
  }
}

function stopMusic() {
  bgMusic.pause();
  bgMusic.currentTime = 0;
}

musicBtn.addEventListener("click", async () => {
  isPlaying = !isPlaying;
  localStorage.setItem("bgMusic", isPlaying ? "on" : "off");

  updateMusicUI();

  if (isPlaying) {
    bgMusic.volume = 0.35;
    await playMusic();
  } else {
    stopMusic();
  }
});

updateMusicUI();
if (isPlaying) {
  bgMusic.volume = 0.35;
  playMusic();
}
