// --- merit-wrapperのアンダーラインアニメーション発火 ---
document.addEventListener('DOMContentLoaded', () => {
	const meritObserver = new IntersectionObserver((entries, observer) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.querySelectorAll('span').forEach(span => {
					span.classList.add('is-visible');
				});
				observer.unobserve(entry.target);
			}
		});
	}, {
		threshold: 0.3,
		rootMargin: '0px 0px -20% 0px'
	});

	document.querySelectorAll('.merit-wrapper').forEach(wrapper => {
		meritObserver.observe(wrapper);
	});
});

document.addEventListener('DOMContentLoaded', () => {
	// 1. 監視の設定（IntersectionObserver）
	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				const badge = entry.target.querySelector('.campaign-badge');
				if (badge) {
					badge.classList.add('is-visible');
					observer.unobserve(entry.target);
				}
			}
		});
	}, { 
		threshold: 0.1 
	});

	// 2. 監視の開始
	const cardUnits = document.querySelectorAll('.card-unit');
	if (cardUnits.length > 0) {
		cardUnits.forEach(unit => {
			observer.observe(unit);
		});
	} else {
		document.querySelectorAll('.card').forEach(card => {
			observer.observe(card);
		});
	}

	// ロゴクリックでページトップに戻る
	const logoLink = document.querySelector('header h1 a');
	if (logoLink) {
		logoLink.addEventListener('click', function(e) {
			e.preventDefault();
			window.scrollTo({ top: 0, behavior: 'smooth' });
		});
	}

	// ゆっくりスクロール関数
	function slowScrollTo(element, duration = 1000) {
		const start = window.pageYOffset;
		const end = element.getBoundingClientRect().top + window.pageYOffset;
		const distance = end - start;
		let startTime = null;

		function animation(currentTime) {
			if (!startTime) startTime = currentTime;
			const timeElapsed = currentTime - startTime;
			const progress = Math.min(timeElapsed / duration, 1);
			window.scrollTo(0, start + distance * easeInOutQuad(progress));
			if (progress < 1) {
				requestAnimationFrame(animation);
			}
		}

		function easeInOutQuad(t) {
			return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
		}

		requestAnimationFrame(animation);
	}

	// ページ内リンクのスムーススクロール
	document.querySelectorAll('a[href^="#"]').forEach(anchor => {
		anchor.addEventListener('click', function(e) {
			const targetId = this.getAttribute('href').slice(1);
			const target = document.getElementById(targetId);
			if (target) {
				e.preventDefault();
				slowScrollTo(target, 800);
			}
		});
	});

	// --- ビデオ操作の制御（intro用：ID使用 / usage用：Class使用） ---
	
	// A. introセクション用 (既存のIDベース)
	const introVideo = document.getElementById('lpVideo');
	const introOverlay = document.getElementById('playOverlay');
	const introCenterIcon = document.getElementById('centerIcon');
	const introMuteBtn = document.getElementById('muteBtn');

	if (introVideo && introOverlay) {
		introOverlay.addEventListener('click', () => {
			if (introVideo.paused) {
				introVideo.play();
				introCenterIcon.innerHTML = '<span class="pause-icon"></span>';
				introOverlay.classList.add('playing');
			} else {
				introVideo.pause();
				introCenterIcon.innerText = '▶';
				introOverlay.classList.remove('playing');
			}
		});

		if (introMuteBtn) {
			introMuteBtn.addEventListener('click', (e) => {
				e.stopPropagation();
				introVideo.muted = !introVideo.muted;
				const icon = document.getElementById('muteIcon');
				const txt = document.getElementById('btnText');
				if (icon) icon.innerText = introVideo.muted ? '🔇' : '🔊';
				if (txt) txt.innerText = introVideo.muted ? '音を出す' : '音を消す';
			});
		}
	}

	// B. usageセクション用 (新設のクラスベース)
	const usageContainer = document.querySelector('.usage-target-container');

	if (usageContainer) {
		const uVideo = usageContainer.querySelector('.usage-video-element');
		const uOverlay = usageContainer.querySelector('.usage-play-overlay');
		const uIconVisual = usageContainer.querySelector('.usage-icon-visual');
		const uMuteBtn = usageContainer.querySelector('.usage-mute-btn');
		const uMuteIcon = usageContainer.querySelector('.usage-mute-icon');
		const uBtnText = usageContainer.querySelector('.usage-btn-text');

		uOverlay.addEventListener('click', () => {
			if (uVideo.paused) {
				uVideo.play();
				uOverlay.classList.add('playing');
				uIconVisual.classList.add('pause-icon');
				uIconVisual.textContent = ''; 
			} else {
				uVideo.pause();
				uOverlay.classList.remove('playing');
				uIconVisual.classList.remove('pause-icon');
				uIconVisual.textContent = '▶';
			}
		});

		uMuteBtn.addEventListener('click', (e) => {
			e.stopPropagation();
			uVideo.muted = !uVideo.muted;
			if (uMuteIcon) uMuteIcon.textContent = uVideo.muted ? '🔇' : '🔊';
			if (uBtnText) uBtnText.textContent = uVideo.muted ? '音を出す' : '音を消す';
		});
	}
});