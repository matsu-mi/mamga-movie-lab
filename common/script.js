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
});