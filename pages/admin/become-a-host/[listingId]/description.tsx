import HostLayout from '../layout';

export default function DescriptionPage() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Bước 3: Mô tả phòng</h2>
      <textarea
        placeholder="Mô tả chi tiết phòng của bạn"
        className="border p-2 w-full h-32"
      />
    </div>
  );
}

// DescriptionPage.getLayout = function getLayout(page) {
//   return <HostLayout>{page}</HostLayout>;
// };
DescriptionPage.Layout = HostLayout
