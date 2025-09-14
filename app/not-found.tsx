import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-4">找不到頁面</h2>
        <p className="text-gray-400 mb-8">抱歉，您尋找的頁面不存在。</p>
        <Link href="/" className="text-primary-400 hover:text-primary-300 transition-colors">
          返回首頁
        </Link>
      </div>
    </div>
  )
}