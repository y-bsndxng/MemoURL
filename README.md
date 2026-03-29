# メモ URL

React + Vite で作成した、 URL にメモをつけて保存・検索できるシンプルなツールです。
保存したデータはブラウザの `localStorage` に保持されるため、バックエンドなしで動作します。

## 主な機能

- 技術メモの追加
- 参考 URL の保存
- タグの付与
- タイトル / URL / メモ / タグによる検索
- メモ一覧表示
- メモ削除
- `localStorage` を使ったローカル保存
- ダークテーマ UI

## 画面イメージ

- 左側: 新規メモ追加フォーム
- 右側: 保存済みメモ一覧 + 検索欄

## 使用技術

- React
- Vite
- JavaScript
- CSS
- localStorage

## 開発環境のセットアップ

Node.js をインストールした状態で、以下を実行してください。

```bash
npm install
npm run dev