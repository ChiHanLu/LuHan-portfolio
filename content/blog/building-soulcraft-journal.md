---
title: "日記之森開發心路歷程：從迷茫到決賽的技術成長"
date: "2025-09-14"
excerpt: "分享開發日記之森的心境轉折，從完全看不懂架構到帶領團隊晉級跨域競技場決賽的完整歷程。"
---

## 專案起源：一個溫暖的想法

在資訊管理系的學習過程中，我發現身邊很多同學都有記錄心情、整理思緒的需求。市面上雖然有許多日記應用，但大多數要不功能複雜難用，要不就是隱私保護不足。

於是，**日記之森 (SoulCraft Journal)** 的想法在我心中萌芽了。

### 設計初衷
- 🌳 **溫暖療癒**：森林主題營造寧靜的書寫氛圍
- 🔒 **隱私安全**：用戶的情感記錄需要完全的保護
- ✍️ **專注書寫**：簡潔的介面讓用戶專心記錄
- 🤝 **AI 陪伴**：智能聊天機器人提供溫暖的互動

## 技術選型的學習歷程

### 當時的我：架構？那是什麼？

回想起專案初期，老實說我連什麼叫「架構」都不太懂。看著學長姐們談論什麼 MVC、前後端分離，我完全是一頭霧水。

但正是這種「無知者無畏」的心態，讓我決定從最基礎的技術開始學起。

### 為什麼選擇 Flask？
- **學習曲線友善**：對初學者相對容易上手
- **文檔豐富**：網路上有大量的中文教學資源
- **靈活度高**：可以根據自己的需求慢慢擴展功能
- **Python 生態**：與我在課堂上學習的 Python 無縫接軌

### 最終的技術組合
```
核心架構
├── Flask (Python) - Web 框架
├── Jinja2 - 模板引擎
├── Flask-SocketIO - 即時通訊
├── PostgreSQL - 資料庫
└── HTML/CSS/JavaScript - 前端技術

功能模組
├── 使用者模組 - 註冊登入、個人設定
├── 日記模組 - 撰寫、查看、管理
├── AI 互動模組 - 智能聊天機器人
└── 管理員後台 - 內容管理、客服系統
```

## 從零開始的學習之路

### 第一階段：搞懂「大架構」是什麼

還記得剛開始時，我連 Web 應用程式的基本概念都很模糊。什麼是前端？什麼是後端？為什麼需要資料庫？

我花了好幾週的時間，從最基礎的概念開始研究：

**前端 (Frontend)**：
- 用戶看得到、摸得著的介面
- HTML 負責結構，CSS 負責樣式，JavaScript 負責互動

**後端 (Backend)**：
- 處理業務邏輯，管理資料
- Flask 框架幫我處理路由和請求

**資料庫 (Database)**：
- 儲存用戶資料和日記內容
- PostgreSQL 提供穩定的關聯式資料庫支援

### 第二階段：模組化設計的領悟

當我慢慢理解了基本概念後，下一個挑戰就是如何組織程式碼。一開始我把所有功能都寫在一個檔案裡，結果越寫越亂。

後來學會了 Flask Blueprints 的概念，開始將功能模組化：

```
services/                   # 按功能分模組
├── user/                   # 使用者相關功能
├── diary/                  # 日記功能
├── ai/                     # AI 聊天功能
└── admin/                  # 管理員後台
```

這樣的設計讓我學會了一個重要概念：**關注點分離**。每個模組專注處理自己的業務邏輯，程式碼變得更容易理解和維護。

### 第三階段：從小功能到完整系統

有了大架構的概念後，我開始一個功能一個功能地實作：

## 實作過程的心境轉折

### 使用者認證：我的第一個「大功能」

還記得第一次要實作用戶註冊登入功能時，我完全不知道從何下手。什麼是 Session？什麼是密碼加密？

我花了整整一週的時間，從網路教學中拼湊出一個基本的認證系統：

**學到的重要概念**：
- **密碼不能明文儲存**：學會使用雜湊函數保護用戶密碼
- **Session 管理**：理解如何追蹤用戶的登入狀態
- **表單驗證**：前端驗證提升體驗，後端驗證確保安全

當第一次看到「註冊成功」的訊息出現時，那種成就感真的無法言喻！

### 日記撰寫功能：從簡單到豐富

一開始的日記功能非常陽春，就是一個文字框加上儲存按鈕。但隨著對用戶需求的理解加深，我開始思考：

**用戶真正需要什麼？**
- **情緒記錄**：不只是文字，還要能記錄當時的心情
- **隱私保護**：確保只有用戶自己能看到自己的日記
- **搜尋功能**：日記多了之後，要能快速找到想要的內容

每增加一個功能，我都要學習新的技術。情緒標記讓我學會了資料庫的枚舉類型，搜尋功能讓我理解了 SQL 的模糊查詢。

### AI 聊天機器人：最具挑戰性的功能

當專案進行到中期時，我想加入一個 AI 聊天機器人，讓用戶在寫日記之餘還能有個「數位夥伴」陪伴。

**技術挑戰**：
- **API 整合**：學習如何串接外部 AI 服務
- **即時通訊**：使用 Flask-SocketIO 實現即時對話
- **對話管理**：如何儲存和管理對話歷史

**心境轉折**：
這個功能讓我第一次體會到「系統整合」的複雜性。不再是單純的 CRUD 操作，而是要讓不同的服務協同工作。

雖然最終的實現比較簡單，但這個過程讓我對「全端開發」有了更深的理解。

## 踩坑經驗分享

### 1. 狀態管理的坑

**問題**：一開始用 useState 管理所有狀態，導致組件重渲染過多

```javascript
// ❌ 錯誤做法
const [entries, setEntries] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
const [currentEntry, setCurrentEntry] = useState(null);
// ... 更多狀態

// ✅ 正確做法：使用 useReducer
const [state, dispatch] = useReducer(journalReducer, initialState);

const journalReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ENTRIES':
      return { ...state, entries: action.payload, loading: false };
    case 'ADD_ENTRY':
      return { 
        ...state, 
        entries: [action.payload, ...state.entries] 
      };
    default:
      return state;
  }
};
```

### 2. API 錯誤處理

**問題**：沒有統一的錯誤處理機制

```javascript
// ✅ 統一的 API 錯誤處理
const apiCall = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
        ...options.headers
      },
      ...options
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || '請求失敗');
    }
    
    return await response.json();
  } catch (error) {
    console.error('API 呼叫錯誤:', error);
    throw error;
  }
};
```

### 3. 效能優化

```javascript
// ✅ 使用 React.memo 避免不必要的重渲染
const EntryCard = React.memo(({ entry, onEdit, onDelete }) => {
  return (
    <div className="entry-card">
      <h3>{entry.title}</h3>
      <p>{entry.excerpt}</p>
      <div className="actions">
        <button onClick={() => onEdit(entry.id)}>編輯</button>
        <button onClick={() => onDelete(entry.id)}>刪除</button>
      </div>
    </div>
  );
});

// ✅ 虛擬化長列表
import { FixedSizeList as List } from 'react-window';

const EntryList = ({ entries }) => (
  <List
    height={600}
    itemCount={entries.length}
    itemSize={120}
    itemData={entries}
  >
    {EntryCard}
  </List>
);
```

## 用戶回饋與迭代

### 用戶痛點與改進
1. **載入速度**：實作骨架屏和圖片懶加載
2. **離線功能**：添加 Service Worker 支援
3. **備份功能**：提供資料匯出選項

## 下一步規劃

### 技術升級
- [ ] 遷移到 Next.js 15
- [ ] 導入 React Server Components
- [ ] 實作 PWA 功能
- [ ] 添加 AI 寫作建議

### 功能擴展
- [ ] 多媒體日記支援
- [ ] 社群分享功能（匿名）
- [ ] 情緒趨勢分析
- [ ] 提醒與習慣養成

## 給同路人的建議

1. **先做 MVP**：不要想著一次做完所有功能
2. **用戶回饋很重要**：early adopters 的意見是金
3. **記錄開發過程**：寫下踩坑經驗，幫助未來的自己
4. **保持學習心態**：技術選型沒有標準答案，適合的就是最好的

## 結語

從一個想法到實際的產品，這個過程充滿挑戰但也很有成就感。**日記之森**不只是我的第一個全端專案，更是我成長路上的重要里程碑。

每一行程式碼都承載著我想要幫助他人的初心，每一個功能都是對更好用戶體驗的追求。

---

🌳 **體驗專案**：[SoulCraft Journal](https://www.soulcraftjournal.studio/)  
💻 **技術交流**：11336028@ntub.edu.tw  
📖 **更多文章**：持續分享開發心得與技術筆記