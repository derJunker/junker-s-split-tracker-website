const translations = {
    en: {
        app_name: "Junker's Split Tracker",
        download_button: "Download",
        try_button: "Try it out now!",
        hero_h1: "Level up your Pogostuck Speedrunning experience.",
        features_title: "Features",
        limitations_title: "Limitations",
        about_title: "About",
        feature_default: "Default Pogostuck Splittracker functionality",
        feature_gold_splits: "Gold Splits",
        feature_gold_paces: "Gold Paces",
        feature_pace_estimations: "Pace Estimations",
        feature_sum_of_best: "Sum of Best (SoB)",
        feature_race_your_best: "Race your best times",
        feature_reset_counters: "Reset Counters",
        feature_custom_modes: "Custom Modes",
        feature_loot_seed: "Loot Seed display",
        feature_more_customization: "More Customization (coloring, hide skipped splits, size)",
        feature_reversed_ud: "Reversed UD Splits",
        limitation_borderless_only: "Only works with borderless not fullscreen",
        limitation_windows_only: "Only tested on Windows",
        limitation_av_warning: "Anti-Virus programs might give a warning when installing :)",
        about_p1: "Hey :). Thanks for checking out my split tracker :D. I put a lot of effort into it and i hope you like it.",
        about_p2: "If you play borderless you can use it just like the default split timer ingame just with more features. It allows you to play custom modes like Boostless with their own split times.",
        about_p3: "If you play with fullscreen there is currently no way for me to overlay the tracker. However you can let it run on a second monitor, or just in the background to track your gold splits.",
        about_p4: "I hope you like it and feedback is greatly appreciated! The program is completely free to use, however if you want to support me you can choose <a href=\"https://buymeacoffee.com/derjunker\" target=\"_blank\" title=\"buy me a coffee\">to do so here</a>.",
    },
    ja: {
        app_name: "Junkerのスプリットトラッカー",
        download_button: "ダウンロード",
        try_button: "今すぐ試す！",
        hero_h1: "Pogostuckのスピードラン体験をレベルアップしましょう。",
        features_title: "機能",
        limitations_title: "制限事項",
        about_title: "概要",
        feature_default: "デフォルトのPogostuckスプリットトラッカーの機能",
        feature_gold_splits: "ベストスプリット",
        feature_gold_paces: "ベストペース",
        feature_pace_estimations: "ペース推定",
        feature_sum_of_best: "Sum of Best（SoB）",
        feature_race_your_best: "自己ベストと対戦",
        feature_reset_counters: "リセットカウンター",
        feature_custom_modes: "カスタムモード",
        feature_loot_seed: "ルートシード表示",
        feature_more_customization: "さらにカスタマイズ（色設定、スキップしたスプリットを非表示、サイズ）",
        feature_reversed_ud: "逆さまモード用の逆順スプリット",
        limitation_borderless_only: "ボーダーレスのみサポート（フルスクリーンでは動作しません）",
        limitation_windows_only: "テストは Windows のみ",
        limitation_av_warning: "インストール時にアンチウイルスが警告を出す場合があります :)",
        about_p1: "こんにちは！私のスプリットトラッカーを見てくれてありがとう :D。多くの労力を注いだので気に入ってもらえたら嬉しいです。",
        about_p2: "ボーダーレスでプレイする場合、ゲーム内のデフォルトタイマーと同じように使えますが、より多くの機能があります。Boostlessなどのカスタムモードも、それぞれの分割時間でプレイできます。",
        about_p3: "フルスクリーンでプレイする場合、現状オーバーレイをゲーム上に重ねる方法はありません。ただし、セカンドモニターで実行するか、バックグラウンドで動かしてベストスプリットを記録できます。",
        about_p4: "気に入っていただけたら嬉しいです。フィードバックは大歓迎です！プログラムは完全に無料でご利用いただけますが、支援していただける場合はこちらからお願いいたします：<a href=\"https://buymeacoffee.com/derjunker\" target=\"_blank\" title=\"buy me a coffee\">こちら</a>。",
    }
};

function translate(lang) {
    const map = translations[lang] || translations.en;
    document.documentElement.lang = lang;
    localStorage.setItem('lang', lang);

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const text = map[key] ?? translations.en[key] ?? '';
        if (el.hasAttribute('data-i18n-html')) {
            el.innerHTML = text;
        } else {
            el.textContent = text;
        }
    });

    // update toggle button label (optional)
    const toggle = document.getElementById('lang-toggle');
    if (toggle) toggle.textContent = (lang === 'ja') ? 'EN' : '日本語';
}

// detect initial language
(function initLocale() {
    const saved = localStorage.getItem('lang');
    let lang = 'en';
    if (saved) lang = saved;
    else if (navigator.language && navigator.language.toLowerCase().startsWith('ja')) lang = 'ja';
    translate(lang);
})();

window.toggleLanguage = function() {
    const current = document.documentElement.lang || 'en';
    translate(current === 'ja' ? 'en' : 'ja');
};

// export for testing or further use
export { translate, translations };