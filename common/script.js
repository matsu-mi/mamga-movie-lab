document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            console.log('カードが画面に入った！', entry.isIntersecting); // 確認用
            if (entry.isIntersecting) {
                const badge = entry.target.querySelector('.campaign-badge');
                if (badge) {
                    badge.classList.add('is-visible');
                    console.log('is-visibleを追加しました！');
                }
            }
        });
    }, { threshold: 0.1 }); // 少しでも見えたら反応するように変更

    document.querySelectorAll('.card').forEach(card => {
        observer.observe(card);
    });
});