import { useRouter } from 'next/router';
import HostLayout from '../layout';

export default function TitlePage() {
  const router = useRouter();
  const { listingId } = router.query;

  const handleNext = () => {
    router.push(`/admin/become-a-host/${listingId}/photos`);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Bước 1: Tiêu đề</h2>
      <input
        type="text"
        placeholder="Nhập tiêu đề phòng"
        className="border p-2 w-full mb-4"
      />
      <button
        onClick={handleNext}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Tiếp theo
      </button>
    </div>
  );
}

// Gán layout cho page
// TitlePage.getLayout = function getLayout(page) {
//   return <HostLayout>{page}</HostLayout>;
// };

TitlePage.Layout = HostLayout