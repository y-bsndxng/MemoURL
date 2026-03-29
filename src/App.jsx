import { useEffect, useMemo, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

const STORAGE_KEY = "memo-tool";

function formatDate(dataString) {
  const date = new Date(dataString);
  return date.toLocaleString("ja-JP");
}

function App() {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [memo, setMemo] = useState("");
  const [tags, setTags] = useState("");
  const [searchText, setSearchText] = useState("");
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  // items のセットは React のレンダリング後
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const filteredItems = useMemo(() => {
    const keyword = searchText.trim().toLocaleLowerCase();
    if (!keyword) return items;

    return items.filter((item) => {
      const titleMatch = item.title.toLowerCase().includes(keyword);
      const urlMatch = item.url.toLowerCase().includes(keyword);
      const memoMatch = item.memo.toLowerCase().includes(keyword);
      const tagMatch = item.tags.some((tag) => tag.toLocaleLowerCase().includes(keyword));

      return titleMatch || urlMatch || memoMatch || tagMatch;
    });
  }, [items, searchText]);

  function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim()) {
      alert("Input Title;")
      return;
    }

    const newItem = {
      id: crypto.randomUUID(),
      title: title.trim(),
      url: url.trim(),
      memo: memo.trim(),
      tags: tags.split(",").map((tag) => tag.trim()).filter(Boolean),
      createdAt: new Date().toISOString(),
      updateAt: new Date().toISOString(),
    };

    setItems((prev) => [newItem, ...prev]);

    setTitle("");
    setUrl("");
    setMemo("");
    setTags("");
  }

  function handleDelete(id) {
    const ok = window.confirm("Do you want to delete this memo?")
    if (!ok) return;

    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Memo URL</h1>
        <p>調べたこと、参考URL、メモをまとめて保存するシンプルなツールです。</p>
      </header>

      <main className="layout">
        <section className="panel form-panel">
          <h2>新規メモ追加</h2>
          <form onSubmit={handleSubmit} className="memo-form">
            <label>
              タイトル
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="例: React の useEffect メモ"
              />
            </label>

            <label>
              URL
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
              />
            </label>

            <label>
              メモ
              <textarea
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
                placeholder="要点や気づきを入力"
                rows={8}
              />
            </label>

            <label>
              タグ（カンマ区切り）
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="React, Vite, フロントエンド"
              />
            </label>

            <button type="submit">保存する</button>
          </form>
        </section>

        <section className="panel list-panel">
          <div className="list-header">
            <h2>保存済みメモ</h2>
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="タイトル・URL・タグ・メモで検索"
            />
          </div>

          <div className="memo-count">
            {filteredItems.length} 件 / 全 {items.length} 件
          </div>

          <div className="memo-list">
            {filteredItems.length === 0 ? (
              <div className="empty">
                まだメモがありません。左のフォームから追加してください。
              </div>
            ) : (
              filteredItems.map((item) => (
                <article key={item.id} className="memo-card">
                  <div className="memo-card-header">
                    <h3>{item.title}</h3>
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(item.id)}
                    >
                      削除
                    </button>
                  </div>

                  {item.url && (
                    <p className="memo-url">
                      <a href={item.url} target="_blank" rel="noreferrer">
                        {item.url}
                      </a>
                    </p>
                  )}

                  {item.memo && <p className="memo-text">{item.memo}</p>}

                  {item.tags.length > 0 && (
                    <div className="tag-list">
                      {item.tags.map((tag) => (
                        <span key={tag} className="tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <p className="memo-date">作成: {formatDate(item.createdAt)}</p>
                </article>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App
