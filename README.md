# 3D Voxel Clock

ネオングリーンのデジタル時計を3Dレイヤーで表示するブラウザアプリです。毎秒新しい時刻レイヤーが手前に積み重なり、奥に向かってフェードアウトする奥行き表現が特徴です。

## GitHub Pages

[https://metrojuice.github.io/Voxel-Clock/](https://metrojuice.github.io/Voxel-Clock/)


---

## 機能

- **3Dレイヤー表示** — 最大12枚のレイヤーが奥に向かって並び、手前が白、奥ほどネオングリーンに変化
- **毎秒更新** — 新しい時刻が前面に追加され、古いレイヤーは自動削除
- **カスタマイズ可能** — 角度・フォントサイズ・フォントを設定パネルで変更
- **フルスクリーン対応** — ダブルクリックでフルスクリーン切り替え

---

## 操作方法

| 操作 | 動作 |
|------|------|
| ダブルクリック | フルスクリーン切り替え |
| トリプルクリック | 設定パネルの開閉 |

---

## 設定パネル

設定パネルはトリプルクリックで開閉します。

| 設定項目 | 内容 |
|----------|------|
| Clock Orientation (X / Y) | 3D表示の傾き角度（X軸・Y軸） |
| Font Size | 文字サイズ（20px〜150px） |
| Font Family | フォントの種類（10種類から選択） |

### 選択可能なフォント

- Codystar（デフォルト・ドット風）
- Silkscreen（ピクセルフォント）
- Orbitron
- Share Tech Mono
- Roboto Mono
- VT323
- Audiowide
- Chakra Petch
- Wallpoet
- Nova Mono

---

## 技術仕様

- **フレームワーク不使用** — Vanilla JS / CSS / HTML のみ
- **CSS 3D Transform** — `preserve-3d` + `translateZ` でレイヤーを奥行き方向に配置
- **Google Fonts** — 10種類のフォントをCDNから読み込み
- **レイヤー管理** — 最大12レイヤー。超過分は自動削除
- **ジッター防止** — 各文字を `<span>` で分離し、幅を `ch` 単位で固定
