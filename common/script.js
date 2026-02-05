// --- merit-wrapperのアンダーラインアニメーション発火 ---
document.addEventListener('DOMContentLoaded', () => {
    const meritObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // merit-wrapper内のspanすべてにクラス付与
                entry.target.querySelectorAll('span').forEach(span => {
                    span.classList.add('is-visible');
                });
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3, // 30%見えたら発火（より確実に見えてから）
        rootMargin: '0px 0px -20% 0px' // 下方向に余裕を持たせて発火を遅らせる
    });

    document.querySelectorAll('.merit-wrapper').forEach(wrapper => {
        meritObserver.observe(wrapper);
    });
});
document.addEventListener('DOMContentLoaded', () => {
    // 1. 監視の設定（IntersectionObserver）
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // デバッグ用ログ：不要になったら消してOKです
            console.log('要素が画面に入った！', entry.isIntersecting); 

            if (entry.isIntersecting) {
                // 監視対象（card-unit）の中からキャンペーンバッジを探す
                const badge = entry.target.querySelector('.campaign-badge');
                
                if (badge) {
                    badge.classList.add('is-visible');
                    console.log('is-visibleを追加しました！');
                    
                    // 一度表示されたら監視を解除（何度もアニメーションさせない場合）
                    observer.unobserve(entry.target);
                }
            }
        });
    }, { 
        // 0.1 = 要素が10%見えたら実行
        threshold: 0.1 
    });

    // 2. 監視の開始
    // .card-unit（吹き出しとカードのセット）をすべて監視する
    const cardUnits = document.querySelectorAll('.card-unit');
    
    if (cardUnits.length > 0) {
        cardUnits.forEach(unit => {
            observer.observe(unit);
        });
    } else {
        // 万が一 .card-unit がない場合、従来の .card を監視する予備処理
        document.querySelectorAll('.card').forEach(card => {
            observer.observe(card);
        });
    }
    // ゆっくりスクロール関数
        // ロゴクリックでページトップに戻る
        const logoLink = document.querySelector('header h1 a');
        if (logoLink) {
            logoLink.addEventListener('click', function(e) {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
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

        // イージング関数
        function easeInOutQuad(t) {
            return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        }

        requestAnimationFrame(animation);
    }

    // ページ内リンクのスムーススクロール（カスタム速度）
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').slice(1);
            const target = document.getElementById(targetId);
            if (target) {
                e.preventDefault();
                slowScrollTo(target, 800); // 800msで少し速くスクロール
            }
        });
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('lpVideo');
    const playOverlay = document.getElementById('playOverlay');
    const centerIcon = document.getElementById('centerIcon');

    // 中央ボタン（再生・一時停止）の制御
    playOverlay.addEventListener('click', () => {
        if (video.paused) {
            video.play();
            centerIcon.innerHTML = '<span class="pause-icon"></span>';
            playOverlay.classList.add('playing');
        } else {
            video.pause();
            centerIcon.innerText = '▶';
            playOverlay.classList.remove('playing');
        }
    });

    // 右下ミュートボタンの制御（共通化）
    const muteBtn = document.getElementById('muteBtn');
    muteBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // 重なりのクリック連鎖を防ぐ
        video.muted = !video.muted;
        updateMuteBtn(video.muted);
    });

    function updateMuteBtn(isMuted) {
        const icon = document.getElementById('muteIcon');
        const txt = document.getElementById('btnText');
        icon.innerText = isMuted ? '🔇' : '🔊';
        txt.innerText = isMuted ? '音を出す' : '音を消す';
    }
});