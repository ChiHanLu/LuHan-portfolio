import { H2, H3, P, Lead, Quote, Callout, Ul, Li, Code, CodeBlock, Divider } from "@/components/article/prose";

export default function Article() {
  return (
    <>
      <H2 id="sec-1">專案起源：一個溫暖的想法</H2>

      <Lead>
        在資訊管理系的學習過程中，我發現身邊許多同學都有記錄心情、整理思緒的需求。市面上的日記應用雖多，卻常常不是功能繁雜難用，就是隱私保護不足。
      </Lead>

      <P>
        於是，<strong>日記之森 (SoulCraft Journal)</strong> 的想法在我心中萌芽了。
      </P>

      <H3>設計初衷</H3>
      <Ul>
        <Li><strong>溫暖療癒</strong>：以森林主題營造寧靜的書寫氛圍</Li>
        <Li><strong>隱私安全</strong>：用戶的情感記錄理應受到完整保護</Li>
        <Li><strong>專注書寫</strong>：簡潔的介面讓用戶安心記錄</Li>
        <Li><strong>AI 陪伴</strong>：以智能聊天機器人提供溫暖的互動</Li>
      </Ul>

      <H2 id="sec-2">技術選型的學習歷程</H2>

      <H3>當時的我：架構？那是什麼？</H3>

      <P>
        回想專案初期，老實說我連「架構」是什麼都不太懂。聽著學長姐談論 MVC、前後端分離，我完全一頭霧水。
      </P>

      <P>
        但也正是這份「無知者無畏」的心態，讓我下定決心從最基礎的技術學起。
      </P>

      <H3>為什麼選擇 Flask？</H3>
      <Ul>
        <Li><strong>學習曲線友善</strong>：對初學者相對容易上手。</Li>
        <Li><strong>文件豐富</strong>：網路上有大量中文教學資源。</Li>
        <Li><strong>靈活度高</strong>：能依自己的需求逐步擴展功能。</Li>
        <Li><strong>Python 生態</strong>：與我在課堂上學的 Python 無縫接軌。</Li>
      </Ul>

      <H3>最終的技術組合</H3>
      <CodeBlock
        lang=""
        code={`核心架構
├── Flask (Python) - Web 框架
├── Jinja2 - 模板引擎
├── Flask-SocketIO - 即時通訊
├── PostgreSQL - 資料庫
└── HTML/CSS/JavaScript - 前端技術

功能模組
├── 使用者模組 - 註冊登入、個人設定
├── 日記模組 - 撰寫、查看、管理
├── AI 互動模組 - 智能聊天機器人
└── 管理員後台 - 內容管理、客服系統`}
      />

      <H2 id="sec-3">從零開始的學習之路</H2>

      <H3>第一階段：搞懂「大架構」是什麼</H3>

      <P>
        還記得剛開始時，我對 Web 應用程式的基本概念十分模糊：什麼是前端？什麼是後端？為什麼需要資料庫？
      </P>

      <P>
        於是我花了好幾週，從最基礎的概念開始一點一滴研究：
      </P>

      <P>
        <strong>前端 (Frontend)</strong>：
      </P>
      <Ul>
        <Li>用戶看得到、摸得著的介面</Li>
        <Li>HTML 負責結構，CSS 負責樣式，JavaScript 負責互動</Li>
      </Ul>

      <P>
        <strong>後端 (Backend)</strong>：
      </P>
      <Ul>
        <Li>處理業務邏輯，管理資料</Li>
        <Li>Flask 框架幫我處理路由和請求</Li>
      </Ul>

      <P>
        <strong>資料庫 (Database)</strong>：
      </P>
      <Ul>
        <Li>儲存用戶資料和日記內容</Li>
        <Li>PostgreSQL 提供穩定的關聯式資料庫支援</Li>
      </Ul>

      <H3>第二階段：模組化設計的領悟</H3>

      <P>
        慢慢理解基本概念後，下一個挑戰是如何組織程式碼。起初我把所有功能都塞進同一個檔案，結果越寫越亂。
      </P>

      <P>
        後來學會了 Flask Blueprints 的概念，開始將功能模組化：
      </P>

      <CodeBlock
        lang=""
        code={`services/                   # 按功能分模組
├── user/                   # 使用者相關功能
├── diary/                  # 日記功能
├── ai/                     # AI 聊天功能
└── admin/                  # 管理員後台`}
      />

      <P>
        這樣的設計讓我領會到一個重要概念：<strong>關注點分離</strong>。每個模組只專注處理自己的業務邏輯，程式碼也因此更容易理解與維護。
      </P>

      <H3>第三階段：從小功能到完整系統</H3>

      <P>
        有了大架構的概念後，我開始一個功能一個功能地實作：
      </P>

      <H2 id="sec-4">實作過程的心境轉折</H2>

      <H3>使用者認證：我的第一個「大功能」</H3>

      <P>
        還記得第一次要實作用戶註冊登入功能時，我完全不知道從何下手。什麼是 Session？什麼又是密碼加密？
      </P>

      <P>
        我花了整整一週，從網路教學中一點一滴拼湊出一套基本的認證系統：
      </P>

      <P>
        <strong>學到的重要概念</strong>：
      </P>
      <Ul>
        <Li><strong>密碼不能明文儲存</strong>：學會使用雜湊函數保護用戶密碼</Li>
        <Li><strong>Session 管理</strong>：理解如何追蹤用戶的登入狀態</Li>
        <Li><strong>表單驗證</strong>：前端驗證提升體驗，後端驗證確保安全</Li>
      </Ul>

      <P>
        當「註冊成功」的訊息第一次出現在畫面上時，那份成就感真的難以言喻。
      </P>

      <H3>日記撰寫功能：從簡單到豐富</H3>

      <P>
        最初的日記功能非常陽春，只是一個文字框加上儲存按鈕。但隨著對用戶需求理解加深，我開始思考：
      </P>

      <P>
        <strong>用戶真正需要什麼？</strong>
      </P>
      <Ul>
        <Li><strong>情緒記錄</strong>：不只是文字，還要能記錄當時的心情</Li>
        <Li><strong>隱私保護</strong>：確保只有用戶自己能看到自己的日記</Li>
        <Li><strong>搜尋功能</strong>：日記多了之後，要能快速找到想要的內容</Li>
      </Ul>

      <P>
        每新增一個功能，我都得學習一項新技術。情緒標記讓我學會資料庫的枚舉型別，搜尋功能則讓我理解了 SQL 的模糊查詢。
      </P>

      <H3>AI 聊天機器人：最具挑戰性的功能</H3>

      <P>
        專案進行到中期，我想加入一個 AI 聊天機器人，讓用戶在寫日記之餘，還能有個「數位夥伴」相伴。
      </P>

      <P>
        <strong>技術挑戰</strong>：
      </P>
      <Ul>
        <Li><strong>API 整合</strong>：學習如何串接外部 AI 服務</Li>
        <Li><strong>即時通訊</strong>：使用 Flask-SocketIO 實現即時對話</Li>
        <Li><strong>對話管理</strong>：如何儲存和管理對話歷史</Li>
      </Ul>

      <P>
        <strong>心境轉折</strong>：
      </P>
      <P>
        這個功能讓我第一次體會到「系統整合」的複雜：它不再是單純的 CRUD 操作，而是要讓不同的服務協同運作。
      </P>

      <P>
        雖然最終的實作相對簡單，但這段過程讓我對「全端開發」有了更深的理解。
      </P>

      <H2 id="sec-5">踩坑經驗分享</H2>

      <H3>1. 狀態管理的坑</H3>

      <P>
        <strong>問題</strong>：一開始用 useState 管理所有狀態，導致組件重渲染過多
      </P>

      <CodeBlock
        lang="javascript"
        code={`// 錯誤做法
const [entries, setEntries] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
const [currentEntry, setCurrentEntry] = useState(null);
// ... 更多狀態

// 正確做法：使用 useReducer
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
};`}
      />

      <H3>2. API 錯誤處理</H3>

      <P>
        <strong>問題</strong>：沒有統一的錯誤處理機制
      </P>

      <CodeBlock
        lang="javascript"
        code={`// 統一的 API 錯誤處理
const apiCall = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': \`Bearer \${getToken()}\`,
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
};`}
      />

      <H3>3. 效能優化</H3>

      <CodeBlock
        lang="javascript"
        code={`// 使用 React.memo 避免不必要的重渲染
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

// 虛擬化長列表
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
);`}
      />

      <H2 id="sec-6">用戶回饋與迭代</H2>

      <H3>用戶痛點與改進</H3>
      <Ul>
        <Li><strong>載入速度</strong>：實作骨架屏和圖片懶加載</Li>
        <Li><strong>離線功能</strong>：添加 Service Worker 支援</Li>
        <Li><strong>備份功能</strong>：提供資料匯出選項</Li>
      </Ul>

      <H2 id="sec-7">下一步規劃</H2>

      <H3>技術升級</H3>
      <Ul>
        <Li>遷移到 Next.js 15</Li>
        <Li>導入 React Server Components</Li>
        <Li>實作 PWA 功能</Li>
        <Li>添加 AI 寫作建議</Li>
      </Ul>

      <H3>功能擴展</H3>
      <Ul>
        <Li>多媒體日記支援</Li>
        <Li>社群分享功能（匿名）</Li>
        <Li>情緒趨勢分析</Li>
        <Li>提醒與習慣養成</Li>
      </Ul>

      <H2 id="sec-8">給同路人的建議</H2>

      <Ul>
        <Li><strong>先做 MVP</strong>：不要想著一次做完所有功能</Li>
        <Li><strong>用戶回饋很重要</strong>：early adopters 的意見是金</Li>
        <Li><strong>記錄開發過程</strong>：寫下踩坑經驗，幫助未來的自己</Li>
        <Li><strong>保持學習心態</strong>：技術選型沒有標準答案，適合的就是最好的</Li>
      </Ul>

      <H2 id="sec-9">結語</H2>

      <P>
        從一個想法走到實際的產品，這段過程充滿挑戰，卻也格外有成就感。<strong>日記之森</strong>不只是我的第一個全端專案，更是我成長路上的重要里程碑。
      </P>

      <P>
        每一行程式碼都承載著我想幫助他人的初心，每一項功能都是對更好用戶體驗的追求。
      </P>

      <Divider />

      <P>
        <strong>體驗專案</strong>：<a href="https://www.soulcraftjournal.studio/" className="text-primary-300 underline underline-offset-4 hover:text-primary-200" target="_blank" rel="noreferrer">SoulCraft Journal</a>
        <br />
        <strong>技術交流</strong>：john_lu@intellitrustme.com
        <br />
        <strong>更多文章</strong>：持續分享開發心得與技術筆記
      </P>
    </>
  );
}
