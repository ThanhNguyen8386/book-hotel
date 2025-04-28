import { useRouter } from 'next/router';
import HostLayout from '../layout';

export default function PhotosPage() {
  const router = useRouter();
  const { listingId } = router.query;

  const handleNext = () => {
    router.push(`/admin/become-a-host/${listingId}/description`);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Bước 2: Ảnh phòng</h2>
      <div className="border p-4 mb-4 text-center">Khu vực tải ảnh lên</div>
      <button
        onClick={handleNext}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Tiếp theo
      </button>
    </div>
  );
}

// PhotosPage.getLayout = function getLayout(page) {
//   return <HostLayout>{page}</HostLayout>;
// };
PhotosPage.Layout = HostLayout
