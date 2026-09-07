<!-- Hallmark · pre-emit critique: P4 H4 E4 S4 R4 V4 -->
# 鎌倉彫金工房 広告LP01改善案

2026-09-07時点の現行広告LP `https://reserve.kamakura-chokin.com/lp01/` をブラウザで確認し、公開中の本文・画像・構成を元に再構成した静的プレビューです。

- 公開プレビュー: https://creativegoatlabo-blip.github.io/kamakura-lp01-improvement-preview-20260907/
- GitHubリポジトリ: https://github.com/creativegoatlabo-blip/kamakura-lp01-improvement-preview-20260907

## 再現した要素

- 「金属の棒から作る」手作り体験の説明
- 楽しさ、工房、立地、仕上がり、職人のおもてなしという現行の訴求
- 鍛造製法の制作工程、実績、お客さまの声、FAQ
- 鎌倉・横浜元町・大阪中崎町・東京蔵前の店舗選択と予約フォームの形

## 改善の焦点

- ファーストビューを木の台に置いた指輪の大きな写真と「作る時間も、一生の宝物になる。」のコピーで構成
- 基本価格、素材、制作時間、納期、永久保証を上部に要約
- 公式コースページの現行制作事例に、仕様と価格を併記
- 長いページでも予約導線を失わない固定CTA
- 実績値に年次を明記し、現在値と誤認しにくくした

## 2026-09-07 デザイン再改訂

ユーザーの希望する深緑と木の色味を軸に、Pico CSS 2.1.1を実際に組み込んだ和の工房を感じるデザインへ変更しました。

- 使用ライブラリ: [Pico CSS](https://picocss.com/docs)、MITライセンス。
- 選定理由: [CSS変数](https://picocss.com/docs/css-variables)で色・書体・角丸・入力欄の寸法を調整でき、[Conditional版](https://picocss.com/docs/conditional)で既存の静的HTMLへ部分的に適用できるため。フォーム・FAQ・ボタンに採用。
- 比較候補: [daisyUI](https://daisyui.com/docs/themes/)と[UIkit](https://getuikit.com/docs/introduction)の公式情報も確認。今回は既存HTMLへの導入範囲とブランド表現の調整しやすさを優先してPico CSSを選択。
- 視覚設計: しっぽり明朝 + Noto Sans JP、生成りの背景、木の茶色、深緑のCTA。写真を大きく使い、旧案の一律な左右交互配置と特徴番号を整理。
- 読み込み: `vendor/pico-2.1.1.conditional.min.css` → `tokens.css` → `styles-v2.css`。旧 `styles.css` は記録用に保持し、現行HTMLでは読み込んでいません。
- ライブラリはローカル配信。ライセンスを `vendor/PICO-LICENSE.md` に同梱し、ブラウザでのCDN参照を追加していません。
- 固定CTAは主予約ボタンを通過すると表示し、予約フォームが画面内に入ると隠します。

検証: HTMLとJS構文、320 / 375 / 414 / 768 / 1440pxの表示、画像読み込み、アンカー、FAQ、店舗選択、無送信フォームを確認済み。主要文字色のコントラストは5.97:1以上、ボタンの文字は7.08:1、フォーカスリング対背景は6.36:1。

## プレビューの安全性

- 予約フォームに送信先を持たせていません。
- Google Analytics、Google広告、Meta Pixelは含みません。
- `robots.txt` と `noindex` で検索エンジンの収集を抑止しています。
- 公式サイトや広告の最終ページURLは変更していません。
