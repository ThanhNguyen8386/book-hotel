import { useRouter } from 'next/router';

const steps = ["title", "photos", "description"];

export default function HostLayout({ children }) {
  const router = useRouter();
  const pathname = router.asPath;

  const currentStep = steps.findIndex((step) => pathname.includes(step));
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="p-4 border-b">
        <h1 className="text-2xl font-bold">Tạo phòng mới</h1>
      </header>

      {/* Nội dung */}
      <main className="flex-1 p-6">
        {children}
      </main>

      {/* Footer Progress */}
      <footer className="p-4 border-t">
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-blue-600 h-3 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-center text-sm text-gray-500 mt-2">
          Đã hoàn thành {Math.round(progress)}%
        </p>
      </footer>
    </div>
  );
}
