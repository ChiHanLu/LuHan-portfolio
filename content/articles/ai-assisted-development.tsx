import { H2, H3, P, Lead, Quote, Callout, Ul, Li, Code, CodeBlock, Divider } from "@/components/article/prose";

export default function Article() {
  return (
    <>
      <H2 id="sec-1">前言：一個抗拒者的轉變</H2>
      <Lead>老實說，一開始我非常排斥 AI，總覺得用 AI 寫程式就像作弊，不算「真正」的程式設計能力。</Lead>
      <P>但當我看到身邊同學都在用 AI，而且學習速度明顯比我快時，我開始重新思考這件事。</P>
      <P>這篇文章，想分享我從完全排斥到學會善用 AI 的完整轉變過程。</P>

      <H2 id="sec-2">第一階段：排斥與觀望</H2>
      <H3>為什麼一開始會排斥 AI？</H3>
      <P>當 ChatGPT 剛開始流行時，我的第一反應是：「這樣還算是在學程式設計嗎？」</P>
      <P><strong>我當時的想法</strong>：</P>
      <Ul>
        <Li>用 AI 寫程式就是作弊。</Li>
        <Li>這樣根本學不到真正的技能。</Li>
        <Li>擔心過度依賴會失去思考能力。</Li>
        <Li>想「純靠自己」證明實力。</Li>
      </Ul>
      <P>但看著身邊同學用 AI 輔助學習，效率明顯比我高，我開始懷疑自己的堅持是否正確。</P>

      <H2 id="sec-3">第二階段：嘗試免費版本</H2>
      <H3>小心翼翼的第一步</H3>
      <P>在同學的建議下，我終於決定試試免費版的 ChatGPT。</P>
      <P><strong>第一次使用的心境</strong>：</P>
      <Ul>
        <Li>問了一個超簡單的問題：「如何在 Python 中讀取檔案？」</Li>
        <Li>AI 的回答比我想像中還要詳細。</Li>
        <Li>但老實說，當下我還是覺得「自己查資料也能找到」。</Li>
      </Ul>
      <P>那時的我還沒意識到，AI 的價值不只是回答問題，更在於能理解上下文，提供個人化的解答。</P>

      <H2 id="sec-4">第三階段：害怕與不熟悉</H2>
      <H3>擔心 AI 給出我看不懂的東西</H3>
      <P>開始使用 AI 後，我遇到一個新問題：AI 有時會給出很複雜的程式碼，我根本看不懂。</P>
      <P><strong>當時的困擾</strong>：</P>
      <Ul>
        <Li>AI 給的程式碼，常有許多我沒學過的語法。</Li>
        <Li>不知道該直接拿來用，還是先學會再用。</Li>
        <Li>害怕用了不懂的程式碼會出問題。</Li>
        <Li>開始懷疑是不是自己的問題描述不夠清楚。</Li>
      </Ul>
      <P><strong>轉捩點</strong>：有一次，AI 給了我一段 Flask 路由的程式碼，裡面用了裝飾器。我完全不懂裝飾器是什麼，但這次我決定花時間去理解它，而不是直接複製貼上。</P>

      <H2 id="sec-5">第四階段：從複製貼上到理解學習</H2>
      <H3>學會了「審閱」AI 的回答</H3>
      <P>這個階段是我最關鍵的轉變。我開始養成一個習慣：</P>
      <P><strong>我的新工作流程</strong>：</P>
      <Ul>
        <Li><strong>收到 AI 回答後先暫停</strong>：不急著複製貼上</Li>
        <Li><strong>逐行閱讀程式碼</strong>：理解每一行在做什麼</Li>
        <Li><strong>查詢不懂的概念</strong>：遇到新語法就去查資料</Li>
        <Li><strong>用自己的想法優化</strong>：根據我的專案需求調整</Li>
      </Ul>
      <P><strong>實際例子</strong>：</P>
      <P>AI 給了我一段用戶註冊的程式碼，但我發現它沒有考量到我專案的特殊需求（例如需要驗證學校信箱），於是我會在理解原理後，再加入自己的邏輯。</P>

      <H2 id="sec-6">第五階段：習慣 AI 的 Style 與探索更多工具</H2>
      <H3>開始理解不同 AI 的特色</H3>
      <P>隨著使用經驗增加，我發現每個 AI 工具都有自己的「風格」：</P>
      <P><strong>我嘗試過的 AI 工具</strong>：</P>
      <Ul>
        <Li><strong>ChatGPT</strong>：回答詳細，很會解釋概念</Li>
        <Li><strong>DeepSeek</strong>：在程式碼生成方面表現不錯</Li>
        <Li><strong>Gemini</strong>：Google 的產品，整合性很好</Li>
        <Li><strong>Perplexity</strong>：很適合查找最新的技術資訊</Li>
        <Li><strong>Grok</strong>：回答風格比較輕鬆有趣</Li>
        <Li><strong>Claude</strong>：邏輯推理能力很強</Li>
        <Li><strong>Copilot</strong>：直接整合在編輯器裡，即時提示超方便</Li>
      </Ul>
      <P><strong>發現</strong>：不同的問題適合問不同的 AI！我開始學會「對症下藥」。</P>

      <H2 id="sec-7">第六階段：看懂程式碼的系統化方法</H2>
      <H3>建立了自己的程式碼理解流程</H3>
      <P>經過前面的摸索，我發展出一套系統化的方法來理解和使用 AI 生成的程式碼：</P>
      <P><strong>我的程式碼理解三步驟</strong>：</P>
      <H3>1. 先了解專案整體架構</H3>
      <P>在看任何程式碼之前，我會先問自己：</P>
      <Ul>
        <Li>這個專案用什麼框架？（Flask、Django、React等）</Li>
        <Li>整體架構是怎樣的？（MVC、RESTful API等）</Li>
        <Li>資料流是怎麼走的？（前端 → 後端 → 資料庫）</Li>
      </Ul>
      <H3>2. 分析程式碼撰寫風格</H3>
      <P>每個專案、每個開發者都有自己的 coding style：</P>
      <Ul>
        <Li>變數命名規則（駝峰式、底線式）</Li>
        <Li>程式碼組織方式（模組化程度）</Li>
        <Li>錯誤處理慣例</Li>
        <Li>註解風格</Li>
      </Ul>
      <H3>3. 照 Style 著手修改</H3>
      <P>理解了專案風格後，我會：</P>
      <Ul>
        <Li>確保新增的程式碼符合既有風格</Li>
        <Li>保持一致的命名規則</Li>
        <Li>遵循相同的錯誤處理模式</Li>
        <Li>維持程式碼的可讀性</Li>
      </Ul>
      <P><strong>實際例子</strong>：在日記之森專案中，我發現所有的 API 都會回傳統一格式的 JSON，所以當 AI 給我新的 API 程式碼時，我會調整成符合專案既有格式。</P>

      <H2 id="sec-8">第七階段：我的 AI 使用建議</H2>
      <H3>邊看邊學，不會就反覆問</H3>
      <P>經過這段學習歷程，我總結出幾個重要的使用原則：</P>
      <H3>1. 邊看邊學的心態</H3>
      <P><strong>不要只是複製貼上</strong>：</P>
      <Ul>
        <Li>每一行程式碼都要理解。</Li>
        <Li>遇到不懂的概念，立刻查資料或問 AI。</Li>
        <Li>試著用自己的話解釋程式碼在做什麼。</Li>
        <Li>不要因為「能跑」就放著原理不管。</Li>
      </Ul>
      <P><strong>實際做法</strong>：</P>
      <P>當 AI 給我一段程式碼時，我會逐行加上註解，確保自己理解每個部分。</P>
      <H3>2. 大膽嘗試，不怕犯錯</H3>
      <P><strong>克服恐懼心理</strong>：</P>
      <Ul>
        <Li><strong>敢問複雜的問題</strong>：不要因為問題太難就不問。</Li>
        <Li><strong>反覆迭代優化</strong>：第一次的回答不滿意，就繼續追問。</Li>
        <Li><strong>實際測試</strong>：把 AI 的建議真的跑在專案上。</Li>
        <Li><strong>記錄學習過程</strong>：把解決問題的過程記錄下來。</Li>
      </Ul>
      <P><strong>我的提問技巧進化</strong>：</P>
      <CodeBlock lang="" code={`一開始：「幫我寫一個登入功能」
現在：「我正在用 Flask 開發日記應用，需要實作用戶登入功能。
      我的用戶表結構是這樣...，請幫我寫一個包含密碼驗證、
      Session 管理和錯誤處理的登入 API，並解釋安全性考量。」`} />
      <H3>3. 建立自己的 AI 使用工作流</H3>
      <P><strong>我現在的標準流程</strong>：</P>
      <Ul>
        <Li><strong>明確描述問題</strong>：包含技術棧、具體需求、限制條件</Li>
        <Li><strong>要求解釋原理</strong>：不只要程式碼，還要理解為什麼這樣寫</Li>
        <Li><strong>測試和驗證</strong>：實際運行並測試邊緣情況</Li>
        <Li><strong>個人化調整</strong>：根據專案需求調整 AI 的建議</Li>
        <Li><strong>記錄和總結</strong>：記下學到的新概念和最佳實踐</Li>
      </Ul>

      <H2 id="sec-9">現在的我：AI 是最好的學習夥伴</H2>
      <H3>從排斥到依賴的心境變化</H3>
      <P>回顧這段歷程，我發現自己的心境有了一百八十度的轉變：</P>
      <P><strong>以前的我</strong>：</P>
      <Ul>
        <Li>把 AI 當成作弊工具。</Li>
        <Li>堅持要靠純實力證明自己。</Li>
        <Li>學習速度慢，經常卡關。</Li>
      </Ul>
      <P><strong>現在的我</strong>：</P>
      <Ul>
        <Li>把 AI 視為最佳的學習夥伴。</Li>
        <Li>效率提升，卻更注重理解。</Li>
        <Li>能快速解決問題，同時學到新知識。</Li>
      </Ul>
      <H3>AI 帶給我的真正價值</H3>
      <P><strong>不只是程式碼生成</strong>，更重要的是：</P>
      <Ul>
        <Li><strong>學習加速器</strong>：快速理解新概念和技術</Li>
        <Li><strong>24小時導師</strong>：隨時可以問問題，不用等待</Li>
        <Li><strong>思維啟發器</strong>：提供不同角度的解決方案</Li>
        <Li><strong>信心建立者</strong>：讓我敢於嘗試更複雜的挑戰</Li>
      </Ul>

      <H2 id="sec-10">給同樣猶豫的同學們</H2>
      <H3>如果你也在排斥 AI...</H3>
      <P>我完全理解那種「不想依賴 AI」的心情，但我想分享幾個觀點：</P>
      <P><strong>AI 不是作弊，而是新時代的工具</strong>：</P>
      <Ul>
        <Li>就像計算機沒有讓數學家失業一樣</Li>
        <Li>重點不是工具本身，而是如何使用工具</Li>
        <Li>善用 AI 的人會比不用的人有更多優勢</Li>
      </Ul>
      <P><strong>學習本質沒有改變</strong>：</P>
      <Ul>
        <Li>理解概念依然重要</Li>
        <Li>解決問題的思維依然關鍵</Li>
        <Li>只是學習的方式更有效率了</Li>
      </Ul>
      <H3>我的建議：大膽嘗試！</H3>
      <P><strong>給新手的實用建議</strong>：</P>
      <Ul>
        <Li><strong>從簡單問題開始</strong>：不要一開始就問太複雜的問題</Li>
        <Li><strong>保持好奇心</strong>：每個回答都是學習的機會</Li>
        <Li><strong>動手實作</strong>：不要只看，要親自寫程式碼</Li>
        <Li><strong>反覆詢問</strong>：不懂就問，AI 不會不耐煩</Li>
        <Li><strong>記錄學習</strong>：把重要的概念和解決方案記下來</Li>
      </Ul>

      <H2 id="sec-11">結語：擁抱 AI 時代的學習方式</H2>
      <P>從排斥到倚重，這段轉變讓我深刻體會到：<strong>適應新工具，比固守舊方法更重要</strong>。</P>
      <P>AI 沒有讓我變懶，反而讓我學得更快、做得更多。在日記之森的開發過程中，AI 幫助我：</P>
      <Ul>
        <Li>快速理解 Flask 框架</Li>
        <Li>解決資料庫設計難題</Li>
        <Li>實作複雜的 AI 聊天功能</Li>
        <Li>最終帶領團隊晉級跨域競技場決賽</Li>
      </Ul>
      <P><strong>最重要的是</strong>：我沒有失去思考能力，反而因為有了 AI 的幫助，能夠挑戰更有意義的問題。</P>
      <P><strong>給還在猶豫的你</strong>：不要害怕改變，AI 是來幫助我們的，不是來取代我們的。關鍵是學會如何與 AI 協作，成為更好的開發者。</P>

      <Divider />

      <P><strong>想要交流 AI 學習心得？歡迎聊聊！</strong></P>
      <P>Email：john_lu@intellitrustme.com</P>
      <P>我的作品：<a href="https://www.soulcraftjournal.studio/" className="text-primary-300 underline underline-offset-4 hover:text-primary-200" target="_blank" rel="noreferrer">日記之森 - SoulCraft Journal</a></P>
      <P>實習經驗：智能悅信資訊股份有限公司</P>

      <Divider />

      <P><em>下一篇文章預告：《Flask 入門實戰：我在日記之森開發中學到的技巧》</em></P>
    </>
  );
}
