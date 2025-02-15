import React from "react";

const Tabs = () => {
  const [openTab, setOpenTab] = React.useState(1);
  return (
    <>
      <div className="flex flex-wrap mt-[80px] mb-[50px] w-[75%] ml-[200px] h-auto">
        <div className="w-[100%] flex ">
          <ul
            className="w-[20%] mb-0 list-none border-r  pl-[29px] flex-wrap pt-3 pb-4 flex-row"
            role="tablist"
          >
            <li className="-mb-px mr-2 last:mr-0 flex-auto ">
              <a
                className={
                  "text-xs font-bold  uppercase px-5 py-3 block leading-normal " +
                  (openTab === 1
                    ? "text-orange-600"
                    : "text-blueGray-600")
                }
                onClick={e => {
                  e.preventDefault();
                  setOpenTab(1);
                }}
                data-toggle="tab"
                href="#link1"
                role="tablist"
              >
                Về chúng tôi
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto ">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 block leading-normal " +
                  (openTab === 2
                    ? "text-orange-600 "
                    : "text-blueGray-600")
                }
                onClick={e => {
                  e.preventDefault();
                  setOpenTab(2);
                }}
                data-toggle="tab"
                href="#link2"
                role="tablist"
              >
                Thỏa thuận dịch vụ
              </a>
            </li>
            <li className=" last:mr-0 flex-auto ">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3  rounded block leading-normal " +
                  (openTab === 3
                    ? "text-orange-600"
                    : "text-blueGray-600")
                }
                onClick={e => {
                  e.preventDefault();
                  setOpenTab(3);
                }}
                data-toggle="tab"
                href="#link3"
                role="tablist"
              >
                Chính sách bảo mật
              </a>
            </li>
            <li className=" last:mr-0 flex-auto ">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3  rounded block leading-normal " +
                  (openTab === 4
                    ? "text-orange-600"
                    : "text-blueGray-600")
                }
                onClick={e => {
                  e.preventDefault();
                  setOpenTab(4);
                }}
                data-toggle="tab"
                href="#link4"
                role="tablist"
              >
                Chính sách thanh toán
              </a>
            </li>
          </ul>
          <div className="relative flex flex-col min-w-0 break-words bg-white w-[80%] mb-6 ">
            <div className="px-4 py-5 flex-auto">
              <div className="tab-content tab-space">
                <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                  <h2 className="mb-7 text-2xl font-bold">Về chúng tôi</h2>
                  <p className="text-primary font-bold mb-5 text-orange-600">Công ty Cổ phần Happy Weekend Việt Nam</p>
                  <div className="gj-about-us__group mb-5" data-v-3b466193>
                    <div className="flex mb-2" data-v-3b466193>
                      <span data-v-3b466193 style={{ width: 200 }}>Hỗ trợ khách hàng:</span>
                      <span className="font-bold flex-1" data-v-3b466193>cskh@happyweekend.vn</span>
                    </div>
                    <div className="flex mb-2" data-v-3b466193>
                      <span data-v-3b466193 style={{ width: 200 }}>Liên hệ hợp tác:</span>
                      <span className="font-bold flex-1" data-v-3b466193>support@happyweekend.vn</span>
                    </div>
                  </div>
                  <div className="gj-about-us__group mb-5" data-v-3b466193>
                    <div className="gj-about-us__group-title font-bold mb-5" data-v-3b466193>TP Hồ Chí Minh</div>
                    <div className="flex mb-2" data-v-3b466193>
                      <span data-v-3b466193 style={{ width: 200 }}>Trụ sở chính:</span>
                      <span className="font-bold flex-1" data-v-3b466193>5A / 2 Tran Phu, District 5, Ho Chi Minh</span>
                    </div>
                    <div className="flex mb-2" data-v-3b466193>
                      <span data-v-3b466193 style={{ width: 200 }}>Đường dây nóng:</span>
                      <span className="font-bold flex-1" data-v-3b466193>0931 836 836</span>
                    </div>
                  </div>
                  <div className="gj-about-us__group mb-5" data-v-3b466193>
                    <div className="gj-about-us__group-title font-bold mb-5" data-v-3b466193>Hà Nội</div>
                    <div className="flex mb-2" data-v-3b466193>
                      <span data-v-3b466193 style={{ width: 200 }}>Trụ sở chính</span>
                      <span className="font-bold flex-1" data-v-3b466193>12th floor, Mipec building, Tay Son, Dong Da, Hanoi</span>
                    </div>
                    <div className="flex mb-2" data-v-3b466193>
                      <span data-v-3b466193 style={{ width: 200 }}>Đường dây nóng</span>
                      <span className="font-bold flex-1" data-v-3b466193>077 789 2399</span>
                    </div>
                  </div>
                </div>
                <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                  <div className="mb-16 text-gray-80" ><p className="text-center"><strong>ĐIỀU KHOẢN SỬ DỤNG VÀ QUY CHẾ HOẠT ĐỘNG</strong></p>
                    <p>BẠN PHẢI ĐỌC NHỮNG ĐIỀU KHOẢN SỬ DỤNG DƯỚI ĐÂY TRƯỚC KHI SỬ DỤNG ỨNG DỤNG NÀY. VIỆC SỬ DỤNG ỨNG DỤNG NÀY XÁC NHẬN VIỆC CHẤP THUẬN VÀ TUÂN THỦ CÁC ĐIỀU KHOẢN VÀ ĐIỀU KIỆN DƯỚI ĐÂY.</p>
                    <p>Ứng dụng Happy Weekend được xây dựng và phát triển nhằm phục vụ nhu cầu tìm kiếm và đặt phòng khách sạn một cách nhanh chóng, hỗ trợ tối đa cho khách hàng trong việc tìm kiếm khách sạn phù hợp với địa điểm hiện tại, mức giá hợp lý, thanh toán dễ dàng.</p>
                    <p>Sứ mệnh của Ứng dụng Happy Weekend là trở thành Ứng dụng thương mại tin cậy, hữu ích trong lĩnh vực ứng dụng công nghệ thông tin vào đời sống công nghệ hiện nay.</p>
                    <p>Thương nhân, tổ chức, cá nhân tham gia giao dịch tại Ứng dụng Happy Weekend tự do thỏa thuận trên cơ sở tôn trọng quyền và lợi ích hợp pháp của các bên tham gia hoạt động sử dụng dịch vụ thông qua hợp đồng và không trái với quy định của pháp luật hiện hành của Việt Nam.</p>
                    <p>Thông tin về thương nhân, tổ chức, cá nhân tham gia là thành viên trên Happy Weekend phải minh bạch và chính xác.</p>
                    <p>Sản phẩm, dịch vụ tham gia giao dịch trên Ứng dụng phải đáp ứng đầy đủ các quy định của pháp luật có liên quan, không thuộc các trường hợp cấm kinh doanh, cấm quảng cáo theo quy định của pháp luật.</p>
                    <p>Ứng dụng Happy Weekend có quyền truy cập vào:</p>
                    <ul>
                      <li>
                        <p>Nhận dạng: Sử dụng một hoặc nhiều tài khoản trên thiết bị, dữ liệu tiểu sử.</p>
                      </li>
                      <li>
                        <p>Vị trí: Sử dụng vị trí của thiết bị mà bạn đang dùng để định vị và xác định vị trí hiện tại.</p>
                      </li>
                      <li>
                        <p>Thông tin về kết nối wifi: Cho phép ứng dụng xem thông tin về mạng wifi, chẳng hạn như wifi có được bật hay không và tên của các thiết bị wifi được kết nối.</p>
                      </li>
                      <li>
                        <p>ID thiết bị và thông tin cuộc gọi: Cho phép ứng dụng xác định số điện thoại và ID thiết bị.</p>
                      </li>
                    </ul>
                    <p>Có thể xảy ra những thay đổi về điều kiện hoặc hoàn cảnh thị trường mà có thể dẫn đến những thay đổi trong một thời gian ngắn khiến thông tin được cung cấp không chính xác hoặc không hiện hành. Trong trường hợp có bất kỳ vấn đề gì, bạn có thể liên hệ với bộ phận dịch vụ khách hàng để hỗ trợ và giải đáp thắc mắc cho bạn.</p>
                    <p>Các nhà cung cấp dịch vụ có thể được giới thiệu ở hình thức phân loại thứ hạng khác nhau dựa trên các yếu tố bao gồm nhưng không giới hạn các đánh giá, xếp hạng từ người dùng hoặc các yếu tố khác của nhà cung cấp dịch vụ. Sự xếp hạng đưa ra có tính chính xác tương đối cao dựa trên các thuật toán tự động có thể được cập nhật và thay đổi tùy từng thời điểm, theo quyết định của riêng của chúng tôi.</p>
                    <p>Thành viên tham gia giao dịch trên Ứng dụng Happy Weekend là thương nhân, cá nhân có nhu cầu cung ứng và sử dụng dịch vụ mà Ứng dụng Happy Weekend mang lại, bao gồm người cung ứng dịch vụ và người sử dụng dịch vụ.</p>
                    <p>Khi đăng ký là thành viên của Ứng dụng Happy Weekend, thành viên hiểu rằng:</p>
                    <ul>
                      <li>
                        <p>Thành viên có thể tạo một tài khoản cá nhân của mình để sử dụng dịch vụ.</p>
                      </li>
                      <li>
                        <p>Thành viên có thể cung ứng hoặc sử dụng dịch vụ theo đúng giá và quy chuẩn cam kết hợp pháp đã công bố trên Ứng dụng.</p>
                      </li>
                      <li>
                        <p>Thành viên phải bảo vệ mật khẩu của mình và giám sát việc sử dụng các tài khoản của mình, hiểu và đồng ý rằng thành viên chịu trách nhiệm mọi thông tin cá nhân có liên quan kể cả việc sử dụng tài khoản của mình, chịu hoàn toàn trách nhiệm đối với bất cứ ai được thành viên cho phép truy cập vào nó.</p>
                      </li>
                    </ul>
                    <p>Nội dung bản Quy chế này tuân thủ theo các quy định hiện hành của Việt Nam. Thành viên khi tham gia vào Ứng dụng Happy Weekend phải cam kết thực hiện đúng những nội dung trong Quy chế của Ứng dụng .</p>
                    <p><strong>1. Nguyên tắc chung</strong></p>
                    <p>1.1. Đảm bảo an toàn giao dịch</p>
                    <p>Để đảm bảo các giao dịch được tiến hành thành công, hạn chế tối đa rủi ro có thể phát sinh, yêu cầu các thành viên tham gia lưu ý và tuân thủ các nội dung cam kết như sau:</p>
                    <ul>
                      <li>
                        <p>Thành viên không nên đưa thông tin chi tiết về việc thanh toán với bất kỳ ai bằng thư điện tử, chúng tôi không chịu trách nhiệm về những mất mát thành viên có thể gánh chịu trong việc trao đổi thông tin của thành viên qua internet hoặc thư điện tử.</p>
                      </li>
                      <li>
                        <p>Thành viên tuyệt đối không sử dụng bất kỳ chương trình, công cụ hay hình thức nào khác để can thiệp vào hệ thống hay làm thay đổi cấu trúc dữ liệu. Mọi vi phạm sẽ bị xử lý theo Quy chế và quy định của pháp luật.</p>
                      </li>
                      <li>
                        <p>Mọi thông tin giao dịch được bảo mật, trừ trường hợp buộc phải cung cấp khi cơ quan pháp luật yêu cầu.</p>
                      </li>
                    </ul>
                    <p>1.2. Bảo vệ quyền lợi người tiêu dùng</p>
                    <ul>
                      <li>
                        <p>Ban quản lý Ứng dụng Happy Weekend yêu cầu các cá nhân khi đăng ký là thành viên phải cung cấp thông tin cá nhân có liên quan bao gồm nhưng không giới hạn: họ tên, địa chỉ liên lạc, địa chỉ thư điện tử, số chứng minh nhân dân, điện thoại, số tài khoản, số thẻ thanh toán... và chịu trách nhiệm về tính pháp lý và chính xác của những thông tin trên. Ban quản lý Happy Weekend không chịu trách nhiệm cũng như không giải quyết mọi khiếu nại có liên quan đến quyền lợi của thành viên đó nếu xét thấy tất cả thông tin cá nhân của thành viên đó cung cấp khi đăng ký ban đầu là không chính xác.</p>
                      </li>
                      <li>
                        <p>Thành viên nên xem xét kỹ các thông tin liên quan đến các sản phẩm dịch vụ đang khuyến mãi về điều kiện sử dụng, địa chỉ, phương thức thanh toán và các thông tin có liên quan trước khi sử dụng dịch vụ…</p>
                      </li>
                      <li>
                        <p>Thành viên có thể gửi thông tin khiếu nại thông qua kênh chăm sóc khách hàng của Happy Weekend. Bộ phận chăm sóc khách hàng của Happy Weekend sẽ hỗ trợ thành viên gửi thông tin khiếu nại có liên quan đến thương nhân thực hiện khuyến mại bằng các phương thức nhanh nhất.</p>
                      </li>
                      <li>
                        <p>Bên dưới mỗi khách sạn mà thành viên tham gia có phần “Bình luận”, thành viên (người sử dụng dịch vụ) có thể phản ánh ý kiến hoặc nhận xét của mình liên quan đến dịch vụ, chất lượng phòng… Happy Weekend có quyền không đăng tải các nhận xét được xem là không phù hợp dựa trên sự cân nhắc đối với các nguyên tắc cộng đồng nói chung và nguyên tắc của chúng tôi.</p>
                      </li>
                      <li>
                        <p>Quy định hủy phòng: Trừ trường hợp đặc biệt được nêu cụ thể trong xác nhận đặt phòng, đối với giao dịch đặt phòng thông thường, yêu cầu hủy phòng được chấp nhận trễ nhất là một (1) giờ trước thời gian bắt đầu ở khách sạn đã được đặt.</p>
                      </li>
                    </ul>
                    <p>1.3. Quản lý thông tin xấu</p>
                    <ul>
                      <li>
                        <p>Thành viên sẽ tự chịu trách nhiệm về bảo mật và lưu giữ mọi hoạt động sử dụng dịch vụ dưới tên đăng ký, mật khẩu của mình. Thành viên có trách nhiệm thông báo kịp thời cho Ban quản lý Ứng dụng Happy Weekend về những hành vi sử dụng trái phép, lạm dụng, vi phạm bảo mật, lưu giữ tên đăng ký và mật khẩu của bên thứ ba để có biện pháp giải quyết phù hợp.</p>
                      </li>
                      <li>
                        <p>Thành viên không được hành động gây mất uy tín cho các sản phẩm dịch vụ khác dưới mọi hình thức như gây mất đoàn kết giữa các thành viên bằng cách sử dụng tên đăng ký thứ hai, thông qua một bên thứ ba hoặc tuyên truyền, phổ biến những thông tin không có lợi cho uy tín của Ứng dụng Happy Weekend.</p>
                      </li>
                    </ul>
                    <p>1.4. Giới hạn trách nhiệm trong trường hợp phát sinh lỗi kỹ thuật:</p>
                    <p>Khi thực hiện các giao dịch trên Ứng dụng Happy Weekend, bắt buộc các thành viên phải thực hiện đúng theo các quy trình hướng dẫn. Ban quản lý cam kết cung cấp chất lượng dịch vụ tốt nhất cho các thành viên tham gia giao dịch.</p>
                    <p>Trường hợp phát sinh lỗi kỹ thuật, lỗi phần mềm hoặc các lỗi khách quan khác dẫn đến thành viên không thể tham gia giao dịch được thì các thành viên thông báo cho Ban quản lý Ứng dụng Happy Weekend biết qua địa chỉ thư điện tử&nbsp;<a href="mailto:support@Happy Weekend.vn">support@Happy Weekend.vn</a>. Chúng tôi sẽ khắc phục lỗi trong thời gian sớm nhất, tạo điều kiện cho các thành viên tham gia. Tuy nhiên, Ban quản lý sẽ không chịu trách nhiệm giải quyết trong trường hợp thông báo của các thành viên không đến được Ban quản lý, phát sinh từ lỗi kỹ thuật, lỗi đường truyền, phần mềm hoặc các lỗi khác không do Ban quản lý gây ra.</p>
                    <p><strong>2. Quy trình</strong></p>
                    <p>2.1. Quy trình giao dịch</p>
                    <p>a. Đối với đối tác của Happy Weekend</p>
                    <p>Đối tác của Happy Weekend là các khách sạn, nhà nghỉ cung cấp dịch vụ cho thuê phòng thông qua Ứng dụng đặt phòng online Happy Weekend.</p>
                    <p>Quy trình tham gia cung ứng dịch vụ như sau:[T1]</p>
                    <ul>
                      <li>
                        <p>Gửi thông tin liên hệ (tên người liên hệ, điện thoại liên hệ, tên khách sạn, địa chỉ khách sạn) đến support@Happy Weekend.vn hoặc gọi điện thoại đến số 0931836836 để được hướng dẫn thủ tục hợp tác.</p>
                      </li>
                      <li>
                        <p>Thỏa thuận các điều khoản và ký kết hợp đồng.</p>
                      </li>
                      <li>
                        <p>Ban Quản trị Ứng dụng Happy Weekend tạo tài khoản để khách sạn cập nhật thông tin đăng tải trên Ứng dụng.</p>
                      </li>
                      <li>
                        <p>Ứng dụng Happy Weekend cập nhật các giao dịch đặt phòng và chuyển cho khách sạn.</p>
                      </li>
                      <li>
                        <p>Khách sạn cung ứng dịch vụ cho người dùng theo đúng cam kết và tiến hành đối soát, thanh toán các giao dịch thành công với Ứng dụng Happy Weekend.</p>
                      </li>
                    </ul>
                    <p>b. Đối với người dùng Ứng dụng Happy Weekend</p>
                    <p>Người dùng Ứng dụng Happy Weekend là người sử dụng dịch vụ đặt phòng khách sạn trên Ứng dụng Happy Weekend.</p>
                    <ul>
                      <li>
                        <p>Đăng ký tài khoản thành viên.</p>
                      </li>
                      <li>
                        <p>Tham khảo, tìm kiếm địa điểm theo nhu cầu.</p>
                      </li>
                      <li>
                        <p>Lựa chọn địa điểm, loại phòng phù hợp.</p>
                      </li>
                      <li>
                        <p>Thực hiện đặt phòng.</p>
                      </li>
                      <li>
                        <p>Lựa chọn hình thức thanh toán: trả ngay (thanh toán trực tuyến) hoặc trả sau tại khách sạn.</p>
                      </li>
                      <li>
                        <p>Xác nhận giao dịch đặt phòng (đối với hình thức trả sau) và giữ phòng (đối với hình thức trả ngay).</p>
                      </li>
                    </ul>
                    <p>2.2. Quy trình hỗ trợ giải quyết khiếu nại và phản ánh</p>
                    <p>Quy định khiếu nại, cảnh báo, tranh chấp:</p>
                    <ul>
                      <li>
                        <p>Tất cả thông tin mà thành viên cung cấp phải chính xác và đúng sự thật.</p>
                      </li>
                      <li>
                        <p>Có bằng chứng cụ thể, rõ ràng.</p>
                      </li>
                    </ul>
                    <p>Công ty tích cực kết nối các bên để đàm phán, thỏa thuận các mâu thuẫn phát sinh trong quá trình giao dịch.</p>
                    <p>Các bên liên quan bao gồm người cung cấp dịch vụ và người sử dụng dịch vụ sẽ phải có vai trò trách nhiệm trong việc tích cực giải quyết vấn đề. Đối với người cung cấp dịch vụ cần có trách nhiệm cung cấp văn bản giấy tờ chứng thực thông tin liên quan đến sự việc đang gây mâu thuẫn cho người sử dụng dịch vụ . Đối với Công ty sẽ có trách cung cấp những thông tin liên quan đến người cung cấp dịch vụ và người sử dụng dịch vụ nếu được bên liên quan đến tranh chấp đó yêu cầu.</p>
                    <p>Ứng dụng Happy Weekend và người cung cấp dịch vụ có trách nhiệm tiếp nhận khiếu nại và hỗ trợ người dùng liên quan đến giao dịch tại Ứng dụng Happy Weekend.</p>
                    <p>Khi phát sinh tranh chấp, Công ty đề cao giải pháp thương lượng, hòa giải giữa các bên nhằm duy trì sự tin cậy của thành viên vào chất lượng dịch vụ của Ứng dụng Happy Weekend và thực hiện theo các bước của Quy trình thực hiện khiếu nại.</p>
                    <p>2.3. Quy trình thực hiện khiếu nại</p>
                    <ul>
                      <li>
                        <p>Bước 1: Thành viên người sử dụng dịch vụ khiếu nại về dịch vụ của người cung cấp qua địa chỉ thư điện tử&nbsp;<a href="mailto:admin@appromobile.com">support@Happy Weekend.vn</a>.</p>
                      </li>
                      <li>
                        <p>Bước 2: Ban quản lý Ứng dụng Happy Weekend sẽ tiếp nhận các khiếu nại của thành viên, người sử dụng dịch vụ và tùy theo tính chất và mức độ của khiếu nại thì Ban quản lý Ứng dụng Happy Weekend sẽ có những biện pháp cụ thể hỗ trợ người dùng để giải quyết tranh chấp đó.</p>
                      </li>
                      <li>
                        <p>Bước 3: Trong trường nằm ngoài khả năng và thẩm quyền của Ứng dụng thì Ban quản lý sẽ yêu cầu người sử dụng dịch vụ đưa vụ việc này ra cơ quan nhà nước có thẩm quyền giải quyết theo quy định pháp luật.</p>
                      </li>
                    </ul>
                    <p><strong>3. Quyền và trách nhiệm của Ban quản lý Ứng dụng Happy Weekend</strong></p>
                    <ul>
                      <li>
                        <p>Tổ chức thực hiện quảng cáo các chương trình khuyến mại, giới thiệu, cung cấp các sản phẩm, dịch vụ của đối tác với mức giá ưu đãi đến các thành viên đăng ký tham gia sau khi đã hoàn thành các thủ tục đăng ký kê khai trực tuyến các thông tin cá nhân có liên quan và các điều kiện bắt buộc.</p>
                      </li>
                      <li>
                        <p>Trong trường hợp có cơ sở để chứng minh thành viên cung cấp thông tin cho Ban quản lý Ứng dụng Happy Weekend không chính xác, sai lệch, không đầy đủ hoặc vi phạm pháp luật hay thuần phong mỹ tục Việt Nam thì Ban quản lý có quyền từ chối, tạm ngừng hoặc chấm dứt quyền sử dụng dịch vụ của thành viên.</p>
                      </li>
                      <li>
                        <p>Ban quản lý có thể chấm dứt quyền thành viên và quyền sử dụng một hoặc tất cả các dịch vụ của thành viên và sẽ thông báo cho thành viên trong thời hạn ít nhất là một (01) tháng trong trường hợp thành viên vi phạm các Quy chế của Ứng dụng Happy Weekend hoặc có những hành vi ảnh hưởng đến hoạt động kinh doanh của những thành viên khác.</p>
                      </li>
                      <li>
                        <p>Ban quản lý Ứng dụng Happy Weekend có thể chấm dứt ngay quyền sử dụng dịch vụ và quyền thành viên của thành viên đó nếu phát hiện thành viên đã phá sản, bị kết án hoặc đang trong thời gian thụ án, trong trường hợp thành viên tiếp tục hoạt động có thể gây trách nhiệm pháp lý, có những hoạt động lừa đảo, giả mạo, gây rối loạn thị trường, gây mất đoàn kết đối với các thành viên khác của Ứng dụng Happy Weekend, hoạt động vi phạm pháp luật hiện hành của Việt Nam. Trong trường hợp chấm dứt quyền thành viên và quyền sử dụng dịch vụ thì tất cả các chứng nhận, các quyền của thành viên được cấp sẽ mặc nhiên hết giá trị và bị chấm dứt.</p>
                      </li>
                      <li>
                        <p>Ban quản lý Ứng dụng Happy Weekend có quyền thu hộ phí dịch vụ cho đối tác của mình theo như thỏa thuận trong hợp đồng.</p>
                      </li>
                      <li>
                        <p>Ban quản lý Ứng dụng Happy Weekend có trách nhiệm tiếp nhận và giải quyết những phản ánh từ phía khách hàng.</p>
                      </li>
                    </ul>
                    <p><strong>4. Quyền và trách nhiệm của thành viên</strong></p>
                    <p>4.1. Quyền của thành viên</p>
                    <ul>
                      <li>
                        <p>Thành viên là người sử dụng sẽ được cấp một tên đăng ký và mật khẩu riêng để sử dụng các dịch vụ, quản lý thông tin tài khoản và các giao dịch của mình trên Ứng dụng Happy Weekend.</p>
                      </li>
                      <li>
                        <p>Thành viên là đối tác sẽ được nhân viên của Happy Weekend hỗ trợ để sử dụng được các công cụ, các tính năng phục vụ cho việc trở thành đối tác.</p>
                      </li>
                      <li>
                        <p>Thành viên sẽ được hưởng các chính sách ưu đãi do Happy Weekend mang lại hay các đối tác thứ ba cung cấp trên ứng dụng. Các chính sách ưu đãi này sẽ được đăng tải trực tiếp trên Ứng dụng Happy Weekend hoặc được gửi trực tiếp đến các thành viên.</p>
                      </li>
                      <li>
                        <p>Thành viên có quyền đóng góp ý kiến cho Ứng dụng Happy Weekend trong quá trình hoạt động. Các kiến nghị được gửi trực tiếp bằng thư, fax hoặc email đến cho Ban Quản lý Ứng dụng Happy Weekend theo địa chỉ liên lạc được công bố.</p>
                      </li>
                    </ul>
                    <p>4.2. Trách nhiệm của thành viên</p>
                    <ul>
                      <li>
                        <p>Thành viên sẽ tự chịu trách nhiệm về bảo mật và lưu giữ mọi hoạt động sử dụng dịch vụ dưới tên đăng ký, mật khẩu của mình.</p>
                      </li>
                      <li>
                        <p>Thành viên cam kết những thông tin cung cấp cho Ứng dụng và những thông tin đang tải trên ứng dụng là chính xác và hoàn chỉnh (đặc biệt thông tin có liên quan đến cá nhân của thành viên).</p>
                      </li>
                      <li>
                        <p>Thành viên cam kết, đồng ý không sử dụng dịch vụ của Ứng dụng Happy Weekend vào những mục đích không hợp pháp, không hợp lý, lừa đảo, đe dọa, thăm dò thông tin bất hợp pháp, phá hoại, tạo ra và phát tán virus gây hư hại tới hệ thống, cấu hình, truyền tải thông tin.</p>
                      </li>
                      <li>
                        <p>Thành viên cam kết không được thay đổi, chỉnh sửa, gán ghép, sao chép, truyền bá, phân phối, cung cấp và tạo những công cụ tương tự của dịch vụ do Happy Weekend cung cấp cho một bên thứ ba nếu không được sự đồng ý của Ban quản lý Ứng dụng Happy Weekend.</p>
                      </li>
                      <li>
                        <p>Thành viên không được hành động gây mất uy tín của Ứng dụng Happy Weekend cũng như của các thành viên khác dưới mọi hình thức.</p>
                      </li>
                    </ul>
                    <p><strong>5. Điều khoản áp dụng</strong></p>
                    <p>Ban quản lý Ứng dụng Happy Weekend có quyền và có thể thay đổi Quy chế này bằng cách thông báo tại Ứng dụng Happy Weekend để các thành viên biết. Quy chế sửa đổi có hiệu lực kể từ ngày Quyết định về việc sửa đổi Quy chế có hiệu lực. Việc thành viên tiếp tục sử dụng dịch vụ sau khi Quy chế sửa đổi được công bố và thực thi đồng nghĩa với việc họ đã chấp nhận Quy chế sửa đổi này.</p>
                    <p>Nếu bất kỳ nội dung nào của các Điều khoản và Quy chế này bị bất kỳ cơ quan có thẩm quyền xem là vô hiệu hoặc không thể thực hiện toàn bộ hoặc một phần, thì tính hiệu lực của các nội dung khác trong Điều khoản và Quy chế này sẽ không bị ảnh hưởng.</p>
                    <p>Điều khoản và Quy chế này và mọi vấn đề phát sinh trong quan hệ hợp đồng giữa Happy Weekend và khách hàng sẽ được hiểu và điều chỉnh theo quy định của luật pháp Việt Nam. Mọi tranh chấp, khác biệt, khiếu nại phát sinh từ hoặc liên quan đến nội dung của Điều khoản và Quy chế này sẽ được giải quyết thông qua thương lượng trên tinh thần thiện chí. Nếu không thể giải quyết, tranh chấp, khiếu nại trên có thể được giải quyết tại cơ quan tòa án có thẩm quyền.</p>
                    <p dir="ltr" className="text-align: center;"><strong>ĐIỂU KHOẢN SỬ DỤNG CHƯƠNG TRÌNH “ĐIỂM TÍCH LUỸ"</strong></p>
                    <p dir="ltr">Bạn phải đọc những điều khoản sử dụng dưới đây trước khi tham gia chương trình điểm tích luỹ này. việc tham gia chương trình &nbsp;này xác nhận việc chấp thuận và tuân thủ các điều khoản và điều kiện dưới đây.</p>
                    <p dir="ltr"><strong>I. Điều khoản chung:</strong></p>
                    <p dir="ltr">1.1. Chương trình “Điểm Tich Luỹ" áp dụng với toàn bộ các khách sạn liên kết trong hệ thống Happy Weekend.</p>
                    <p dir="ltr">1.2. Mức tích điểm Điểm dành cho thành viên tuỳ theo chính sách cho từng thời điểm của Happy Weekend. Số điểm tích căn cứ vào giá trị đơn phòng, không bao gồm phụ phí, chi phí khác. Chính sách Điểm tích lũy được thông báo trong mục My Point/ Điểm của tôi trên app Happy Weekend.</p>
                    <p dir="ltr">1.3. Điểm Tích Lũy &nbsp;không thể quy đổi thành tiền mặt hoặc chuyển khoản.</p>
                    <p dir="ltr">1.4. Điểm Tích Luỹ chỉ được áp dụng cho mọi hình thức đặt phòng qua ứng dụng Happy Weekend.</p>
                    <p dir="ltr">1.5. Ưu đãi không được áp dụng đồng thời với các chương trình khác, trừ khi có quy định riêng</p>
                    <p dir="ltr">1.6. Chỉ được sử dụng 01 tài khoản Thành viên để tích luỹ điểm thưởng cho mỗi đơn đặt phòng.</p>
                    <p dir="ltr">1.7. Bằng việc tham gia vào Chương trình, thành viên đồng ý bị ràng buộc bởi tất cả các quy tắc, điều khoản và điều kiện của chương trình.</p>
                    <p dir="ltr">1.8. Happy Weekend được quyền kiểm tra một phần hoặc toàn bộ tài khoản thành viên bất kỳ của Chương trình tại bất kỳ thời điểm nào mà không cần thông báo trước.</p>
                    <p dir="ltr">1.9. Happy Weekend có quyền dừng tích điểm thành viên trong các trường hợp như thành viên vi phạm nghiêm trọng điều lệ của chương trình Điểm Tích Luỹ, phát hiện ưu đãi bị áp dụng sai mục đích, thành viên tự nguyện xin rút không tham gia, thành viên vi phạm các chính sách đặt phòng của Happy Weekend,...Trong mọi trường hợp, toàn bộ số điểm còn lại trong tài khoản sẽ bị huỷ bỏ hoặc tạm ngưng tuỳ theo mức độ.</p>
                    <p dir="ltr">1.10. Happy Weekend sẽ áp dụng chính sách Điểm trừ trong các trường hợp như thành viên đặt phòng không trả trước và không nhận phòng, v.v...</p>
                    <p dir="ltr">1.11. Điểm Tích Luỹ bị áp dụng sai mục đích bao gồm: trao đổi, cho tặng hoặc mua bán chương trình ưu đãi, cố ý sử dụng ưu đãi nhằm gian lận hoặc trục lợi, lợi dụng lỗi hệ thống hoặc các hành vi khác Happy Weekend xem là sai mục đích.</p>
                    <p dir="ltr">1.12. Happy Weekend có quyền sửa đổi cấu trúc chương trình; thay đổi chính sách, tạm ngừng hoặc chấm dứt toàn bộ hoặc một phần hoạt động của chương trình “Điểm Tích Luỹ" &nbsp;tại bất kỳ thời điểm nào, có báo trước và có hướng xử lý đảm bảo quyền lợi của thành viên.</p>
                    <p dir="ltr">1.13. Happy Weekend không chịu trách nhiệm pháp lý đối với việc không thể cung cấp một phần hoặc toàn bộ các ưu đãi của chương trình dành cho Thành viên, cấp thưởng hoặc phần thưởng bị huỷ bỏ do ngừng quan hệ hợp tác với các đối tác, đối tác thay đổi chính sách trả thưởng hoặc phát hiện vi phạm điều lệ chương trình, ưu đãi bị áp dụng sai mục đích hay các lý do bất khả kháng khác.</p>
                    <p dir="ltr">1.14. Happy Weekend có quyền thông báo cho các cơ quan chức năng về các trường hợp có các hành vi gian lận trong tài khoản của khách hàng.</p>
                    <p dir="ltr">1.15. Happy Weekend có quyền được phối hợp với các đối tác hoặc các đơn vị chức năng trong quá trình kiểm tra, kiểm soát các tài khoản của khách hàng.</p>
                    <p dir="ltr">1.16. Trong trường hợp có tranh chấp hoặc khiếu nại, quyết định của Happy Weekend là quyết định cuối cùng.</p>
                    <p dir="ltr"><strong>II. Điều lệ thành viên</strong></p>
                    <p dir="ltr">2.1. Tất cả các cá nhân từ 18 tuổi trở lên, có quyền công dân, không giới hạn về quốc tịch, có số điện thoại di động liên lạc thường xuyên tại các khu vực địa lý được áp dụng và không trái với luật pháp của nước sở tại đều có thể trở thành thành viên “Điểm Tích Luỹ". Các cơ quan, đơn vị, tổ chức không được phép tham gia Chương trình “Điểm Tích Luỹ" Happy Weekend như là một cá nhân..</p>
                    <p dir="ltr">2.2. Để trở thành thành viên, cá nhân cần download ứng dụng Happy Weekend (CH Play đối với các thiết bị Android) hoặc (IOS đối với các thiết bị iPhone), điền đầy đủ các thông tin trên ứng dụng Happy Weekend (bao gồm email, password, nickname,...)</p>
                    <p dir="ltr">2.3. Sau khi đăng ký thành công trên ứng dụng &nbsp;của Happy Weekend.vn, thành viên có thể bắt đầu đặt phòng và tích luỹ điểm thông qua tài khoản này.</p>
                    <p dir="ltr">2.4. Điểm là điểm dựa trên mức chi tiêu của thành viên trên Happy Weekend. Mức tích luỹ điểm cho thành viên tùy theo chính sách từng thời điểm của Happy Weekend.</p>
                    <p dir="ltr">2.5. Điểm của thành viên tích luỹ được khi đặt phòng khách sạn trên ứng dụng Happy Weekend hoặc từ các chương trình ưu đãi với đối tác, chương trình khuyến mại của Happy Weekend tuỳ theo chính sách từng thời điểm của Happy Weekend. Điểm của thành viên sẽ được khấu trừ sau mỗi lần thành viên đổi thưởng.</p>
                    <p dir="ltr">2.6. Mỗi thành viên tham gia chương trình “Điểm Tích Luỹ” chỉ được phép có duy nhất một tài khoản để cộng điểm cho bản thân.</p>
                    <p dir="ltr">2.7. Thành viên được cộng điểm sau khi check-in thành công, số điểm được cộng vào tài khoản trong vòng 24 tiếng kể từ thời điểm check-in thành công.</p>
                    <p dir="ltr">2.8. Thành viên có thể được cộng thêm điểm vào tài khoản từ các chương trình ưu đãi tặng điểm Happy Weekend và đối tác của chương trình Điểm Tích Luỹ &nbsp;phối hợp triển khai và được Happy Weekend thông báo trước.</p>
                    <p dir="ltr">2.9. Thành viên cần có ít nhất 1 booking (đơn đặt phòng) thành công để có thể sử dụng số điểm đang có quy đổi ra phần thưởng. Booking thành công được định nghĩa là booking khách hàng đã check-in thành công.</p>
                    <p>Địa chỉ liên lạc chính thức:</p>
                    <p>CÔNG TY CỔ PHẦN Happy Weekend VIỆT NAM</p>
                    <p>Địa chỉ: Lầu 1, Số 5A/2,Trần Phú, Phường 4, Quận 5, TP.HCM.</p>
                    <p>Email: support@Happy Weekend.vn.</p></div>
                </div>
                <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                  <div>
                    <p className=" text-gray-80" data-v-c95f745c /><p className="p2" style={{ textAlign: 'center' }}><span className="s1"><strong>CHÍNH SÁCH BẢO MẬT THÔNG TIN</strong>&nbsp;</span></p>
                    <p className="p3"><span className="s1">Happy Weekend hiểu rằng Quý khách hàng rất quan tâm đến việc những thông tin cá nhân mà bạn đã tin cậy cung cấp cho chúng tôi được bảo mật và sử dụng ra sao. Happy Weekend rất trân trọng sự tin tưởng đó và cam kết rằng những thông tin này sẽ được chúng tôi nỗ lực tối đa để bảo mật. Happy Weekend đảm bảo sẽ sử dụng thông tin khách hàng một cách hợp lý, có cân nhắc để không ngừng cải thiện chất lượng dịch vụ và đem lại cho người sử dụng những trải nghiệm thú vị khi sử dụng dịch vụ của chúng tôi.</span></p>
                    <p className="p3"><span className="s1"><strong>1. Thu thập thông tin cá nhân</strong>&nbsp;</span></p>
                    <p className="p3"><span className="s1"><strong>1.1. Cách thức</strong>&nbsp;</span></p>
                    <p className="p3"><span className="s1">Để sử dụng được các dịch vụ của ứng dụng Happy Weekend, Quý khách hàng vui lòng đăng ký tài khoản và cung cấp một số thông tin như: họ tên, địa chỉ thư điện tử, số điện thoại, ngày sinh, địa chỉ và một số thông tin khác.&nbsp;&nbsp;</span></p>
                    <p className="p3"><span className="s1">Phần thủ tục đăng k‎ý này nhằm giúp chúng tôi tạo tài khoản thành viên và xác định phần thanh toán của khách hàng. Các thành viên sẽ tự chịu trách nhiệm về bảo mật và lưu giữ mọi hoạt động sử dụng dịch vụ dưới tên đăng ký, mật khẩu và hộp thư điện tử của mình, chịu trách nhiệm về tính pháp lý của những thông do mình cung cấp.&nbsp;</span></p>
                    <p className="p3"><span className="s1">Khách hàng có thể chọn không cung cấp cho chúng tôi một số thông tin nhất định nhưng khi đó khách hàng sẽ có thể không hưởng được một số tiện ích mà những tính năng của Happy Weekend cung cấp.</span></p>
                    <p className="p3"><span className="s1">Các thông tin giao dịch được thu thập ngay cả khi khách hàng không đặt phòng bao gồm nhưng không giới hạn: lịch sử tìm kiếm và chi tiết đặt phòng; vị trí thiết bị, cài đặt thiết bị; giá trị và thời gian thanh toán; thông tin thẻ tín dụng hoặc thẻ ATM dùng để thanh toán... sẽ được lưu trữ nhằm giải quyết những vấn đề có thể phát sinh về sau.</span></p>
                    <p className="p3"><span className="s1"><strong>1.2. Đơn vị thu thập và quản lý thông tin cá nhân</strong>&nbsp;</span></p>
                    <p className="p3"><span className="s1">CÔNG TY CỔ PHẦN Happy Weekend VIỆT NAM</span></p>
                    <p className="p3"><span className="s1">Địa chỉ: 5a/2 Trần Phú, Phường 4, Quận 5, Thành phố Hồ Chí Minh.</span></p>
                    <p className="p4"><span className="s2">Email:&nbsp;</span><span className="s1">support@Happy Weekend.vn</span><span className="s2">.</span></p>
                    <p className="p3"><span className="s1"><strong>1.3. Thời gian lưu trữ thông tin</strong>&nbsp;</span></p>
                    <p className="p3"><span className="s1">Dữ liệu cá nhân của thành viên sẽ được lưu trữ cho đến khi có yêu cầu hủy bỏ hoặc tự thành viên đăng nhập và thực hiện hủy bỏ. Còn lại trong mọi trường hợp thông tin cá nhân thành viên sẽ được bảo mật trên máy chủ của Công ty.</span></p>
                    <p className="p3"><span className="s1"><strong>2. Sử dụng thông tin</strong>&nbsp;</span></p>
                    <p className="p3"><span className="s1"><strong>2.1. Mục đích</strong>&nbsp;</span></p>
                    <p className="p3"><span className="s1">Việc thu thập và lưu trữ thông tin nhằm mục đích:</span></p>
                    <ul className="ul1">
                      <li className="li5"><span className="s1">Phản hồi yêu cầu của khách hàng, liên hệ xác nhận khi khách hàng đăng ký sử dụng dịch vụ trên ứng dụng nhằm đảm bảo quyền lợi cho cho khách hàng.<br /></span></li>
                      <li className="li5"><span className="s1">Xác nhận thanh toán.<br /></span></li>
                      <li className="li5"><span className="s1">Liên lạc và giải quyết các vấn đề, tranh chấp phát sinh liên quan với thành viên trong những trường hợp đặc biệt.<br /></span></li>
                      <li className="li5"><span className="s1">Gửi bản tin thông báo chương trình khuyến mãi hoặc những ưu đãi khác.<br /></span></li>
                      <li className="li5"><span className="s1">Cung cấp một số tiện ích, dịch vụ hỗ trợ khách hàng.<br /></span></li>
                      <li className="li5"><span className="s1">Nâng cao chất lượng dịch vụ khách hàng của Happy Weekend.<br /></span></li>
                      <li className="li5"><span className="s1">Ngăn chặn những hoạt động vi phạm pháp luật Việt Nam.<br /></span></li>
                      <li className="li6"><span className="s1">Ngăn ngừa các hoạt động phá hủy tài khoản người dùng hoặc các hoạt động giả mạo thành viên.<br /></span></li>
                    </ul>
                    <p className="p3"><span className="s1"><strong>2.2. Chia sẻ thông tin</strong>&nbsp;</span></p>
                    <p className="p3"><span className="s1">Happy Weekend biết rằng thông tin về khách hàng là một phần rất quan trọng trong việc kinh doanh&nbsp; vì vậy chúng tôi sẽ không bán hoặc trao đổi cho bất kỳ một bên thứ ba nào khác; trừ những trường hợp cụ thể sau đây:</span></p>
                    <ul className="ul1">
                      <li className="li5"><span className="s1">Để bảo vệ Happy Weekend và các bên thứ ba khác: Chúng tôi chỉ đưa ra thông tin tài khoản và những thông tin cá nhân khác khi tin chắc rằng việc đưa những thông tin đó là phù hợp với luật pháp, bảo vệ quyền lợi, tài sản của người sử dụng dịch vụ, của Happy Weekend và các bên thứ ba khác.<br /></span></li>
                      <li className="li5"><span className="s1">Theo yêu cầu pháp l‎ý từ một cơ quan chính phủ hoặc khi chúng tôi tin rằng việc làm đó là cần thiết và phù hợp nhằm tuân theo các yêu cầu pháp l‎ý.<br /></span></li>
                      <li className="li6"><span className="s1">Trong một số trường hợp cụ thể khác, chúng tôi sẽ thông báo trực tiếp&nbsp; đến khách hàng khi có yêu cầu&nbsp; cung cấp thông tin cho một bên thứ ba và thông tin này chỉ được cung cấp khi được sự xác nhận đồng ‎ý‎ của khách hàng; ví dụ: các chương trình khuyến mãi có sự hợp tác, tài trợ với các đối tác của Happy Weekend.<br /></span></li>
                    </ul>
                    <p className="p3"><span className="s1">Chúng tôi cam kết rằng việc chia sẻ thông tin chắc chắn không bao gồm việc bán, chia sẻ dẫn đến việc làm lộ thông tin cá nhân của khách hàng vì mục đích thương mại, vi phạm những cam kết được đặt ra trong quy định Chính sách bảo mật thông tin khách hàng của Happy Weekend.</span></p>
                    <p className="p3"><span className="s1"><strong>3. Kiểm soát dữ liệu cá nhân.</strong></span></p>
                    <p className="p3"><span className="s1">Khách hàng có quyền tự kiểm tra, cập nhật, điều chỉnh hoặc hủy bỏ thông tin cá nhân của mình bằng cách đăng nhập vào tài khoản và chỉnh sửa thông tin cá nhân hoặc yêu cầu Happy Weekend thực hiện việc này.</span></p>
                    <p className="p3"><span className="s1">Chúng tôi muốn khách hàng có thể kiểm soát cách chúng tôi sử dụng dữ liệu cá nhân của khách hàng. Khách hàng có thể thực hiện việc này theo các cách sau:</span></p>
                    <ol className="ol1">
                      <li className="li5"><span className="s1">Khách hàng có thể yêu cầu một bản sao dữ liệu cá nhân mà chúng tôi đang giữ về bạn,<br /></span></li>
                      <li className="li5"><span className="s1">Khách hàng có thể thông báo cho chúng tôi về bất kỳ thay đổi nào trong dữ liệu cá nhân hoặc bạn có thể yêu cầu chúng tôi sửa sai bất kỳ dữ liệu cá nhân nào mà chúng tôi đang lưu trữ về bạn. Như đã nêu trên, bạn có thể tự tạo các thay đổi này khi có tài khoản người dùng,<br /></span></li>
                      <li className="li5"><span className="s1">Trong những trường hợp nhất định, khách hàng có thể yêu cầu chúng tôi xoá hoặc chặn, hoặc hạn chế xử lý dữ liệu cá nhân mà chúng tôi lưu trữ về khách hàng, hoặc phản đối các phương thức sử dụng dữ liệu cá nhân của khách hàng mà chúng tôi đang thực hiện,<br /></span></li>
                      <li className="li5"><span className="s1">Khi chúng tôi đang sử dụng dữ liệu cá nhân của khách hàng trên cơ sở có sự đồng ý của khách hàng, khách hàng có quyền rút lại sự chấp thuận đó bất kỳ lúc nào theo luật pháp hiện hành, và<br /></span></li>
                      <li className="li7"><span className="s1">Khi chúng tôi xử lý dữ liệu cá nhân của khách hàng dựa trên lợi ích hợp pháp hoặc lợi ích cộng đồng, khách hàng có quyền phản đối bất kỳ lúc nào đối với việc sử dụng dữ liệu cá nhân đó theo luật pháp hiện hành.<br /></span></li>
                    </ol>
                    <p className="p3"><span className="s1">Chúng tôi tin tưởng vào khách hàng để đảm bảo rằng dữ liệu cá nhân của khách hàng là hoàn chỉnh, chính xác và cập nhật. Vui lòng thông báo cho chúng tôi ngay lập tức về bất kỳ thay đổi hoặc sự không chính xác nào đối với dữ liệu cá nhân của khách hàng bằng cách liên hệ với chúng tôi.</span></p>
                    <p className="p3"><span className="s1">Nếu khách hàng có tài khoản người dùng Happy Weekend, khách hàng có thể truy cập rất nhiều dữ liệu cá nhân của mình thông qua trang web/ứng dụng của chúng tôi. Trang web/ứng dụng của chúng tôi thường hiển thị cho khách hàng lựa chọn để thêm, cập nhật hoặc xóa thông tin chúng tôi có về khách hàng trong cài đặt tài khoản.</span></p>
                    <p className="p3"><span className="s1">Nếu không thể truy cập bất kỳ dữ liệu cá nhân nào chúng tôi có về khách hàng thông qua trang web/ứng dụng của chúng tôi, khách hàng có thể gửi cho chúng tôi yêu cầu của bạn (bạn không phải tốn phí gì cả).</span></p>
                    <p className="p3"><span className="s1">Nếu bạn khách hàng muốn thực hiện quyền truy cập hay xóa bỏ thông tin của mình, khách hàng chỉ cần gửi yêu cầu cho chúng tôi qua địa chỉ thư điện tử support@Happy Weekend.vn và chúng tôi sẽ xử lý.</span></p>
                    <p className="p3"><span className="s1"><strong>4. Bảo mật thông tin khách hàng</strong>&nbsp;</span></p>
                    <p className="p3"><span className="s1">Điều quan trọng đối với khách hàng là việc tự bảo vệ mình trước sự tiếp cận thông tin về mật khẩu khi bạn dùng chung máy tính với nhiều người. Khi đó, bạn phải chắc chắn đã thoát khỏi tài khoản sau khi sử dụng dịch vụ của chúng tôi.</span></p>
                    <p className="p3"><span className="s1">Happy Weekend cam kết bảo mật tuyệt đối theo Chính sách bảo mật thông tin cá nhân của Appro Mobile, không sử dụng thông tin cá nhân của thành viên ngoài mục đích xác nhận và liên hệ có liên quan đến giao dịch tại ứng dụng Happy Weekend.</span></p>
                    <p className="p3"><span className="s1">Việc thu thập và sử dụng thông tin của mỗi thành viên chỉ được thực hiện khi có sự đồng ý của khách hàng đó trừ những trường hợp pháp luật có quy định khác.</span></p>
                    <p className="p3"><span className="s1">Chúng tôi cam kết không cố ‎‎ý tiết lộ thông tin khách hàng, không bán hoặc chia sẻ thông tin khách hàng vì mục đích thương mại vi phạm những cam kết giữa chúng tôi với khách hàng theo Chính sách bảo mật thông tin khách hàng.</span></p>
                    <p className="p3"><span className="s1">Trong trường hợp máy chủ lưu trữ thông tin bị hacker tấn công dẫn đến mất mát dữ liệu cá nhân thành viên, Công ty sẽ có trách nhiệm thông báo vụ việc cho cơ quan chức năng điều tra xử lý kịp thời và thông báo cho thành viên được biết.</span></p>
                    <p className="p3"><span className="s1">Happy Weekend nhấn mạnh rằng chúng tôi rất quan tâm đến quyền lợi của ‎khách hàng trong việc bảo vệ thông tin cá nhân nên trong trường hợp bạn có góp ‎ý, thắc mắc liên quan đến chính sách bảo mật của chúng tôi, vui lòng liên hệ qua địa chỉ thư điện tử support@Happy Weekend.vn.</span></p>
                    <p className="p3"><span className="s1"><strong>Lưu ‎ ý:</strong>&nbsp;</span></p>
                    <p className="p3"><span className="s1">Chính sách bảo mật thông tin khách hàng của Happy Weekend chỉ được áp dụng tại ứng dụng Happy Weekend.&nbsp; không bao gồm hoặc liên quan đến các bên thứ ba khác. Ban quản lý ứng dụng Happy Weekend không chịu trách nhiệm cũng như không giải quyết mọi khiếu nại có liên quan đến quyền lợi của thành viên đó nếu xét thấy tất cả thông tin cá nhân của thành viên đó cung cấp khi đăng ký ban đầu là không chính xác.</span></p>
                    <p className="p3"><span className="s1"><strong>5. Các quyền truy cập khác</strong>&nbsp;</span></p>
                    <p className="p3"><span className="s1">Chúng tôi cam kết chỉ sử dụng những quyền truy cập sau để cung cấp cho khách hàng những trải nghiệm tốt hơn, tiện nghi hơn khi sử dụng sản phẩm.</span></p>
                    <p className="p3"><span className="s1"><strong>5.1. Máy ảnh</strong>&nbsp;</span></p>
                    <p className="p3"><span className="s1">Happy Weekend cần quyền truy cập vào máy ảnh của điện thoại để phục vụ chức năng "Giới thiệu khách sạn mới".</span></p>
                    <p className="p3"><span className="s1">Sử dụng chức năng này, khách hàng có thể chụp hình những khách sạn mà họ ưng ý và gửi đến cho Happy Weekend xem xét. Chúng tôi đề cao sự hợp tác của quý khách để giúp Happy Weekend trở nên hoàn thiện hơn.</span></p>
                    <p className="p3"><span className="s1"><strong>5.2. Truy cập vị trí điện thoại</strong>&nbsp;</span></p>
                    <p className="p3"><span className="s1">Nhằm giúp hỗ trợ khách hàng tìm được khách sạn mong muốn 1 cách nhanh chóng và chính xác nhất. Happy Weekend cần quyền truy cập đến vị trí hiện tại của điện thoại của khách hàng.</span></p>
                    <p className="p3"><span className="s1"><strong>5.3. Gọi điện</strong>&nbsp;</span></p>
                    <p className="p3"><span className="s1">Để cung cấp kênh liên lạc trực tiếp giữa khách hàng và khách sạn. Happy Weekend cần quyền truy cập đến khả năng gọi điện từ điện thoại của quý khách.</span></p>
                    <p className="p3"><span className="s1"><strong>Lưu ‎ ý:</strong>&nbsp;</span></p>
                    <p className="p3"><span className="s1">Khi sử dụng chức năng này để liên hệ với khách sạn, chúng tôi không chịu trách nhiệm chi trả đối với mọi chi phí phát sinh từ cuộc gọi.</span></p>
                    <p className="p3"><span className="s1"><strong>5.4. Sử dụng tài khoản Google</strong>&nbsp;</span></p>
                    <p className="p3"><span className="s1">Nhằm mang đến sự tiện lợi khi sử dụng, Happy Weekend cần quyền truy cập đến tài khoản Google trong điện thoại của khách hàng để đáp ứng các chức năng liên quan (đăng nhập bằng tài khoản Google, gửi thông báo ...)</span></p>
                    <p className="p3"><span className="s1">Happy Weekend cũng cần truy cập đến mã số của điện thoại nhằm phục vụ cho việc xác thực đăng nhập.</span></p>
                    <p className="p3"><span className="s1"><strong>5.5. Quyền truy xuất danh bạ</strong>&nbsp;</span></p>
                    <p className="p3"><span className="s1">Cho phép người dùng mời bạn bè sử dụng ứng dụng.</span></p><p />
                  </div>           
                </div>
                <div className={openTab === 4 ? "block" : "hidden"} id="link4">
                  <div className=" text-gray-80">
                    <ul>
                      <li dir="ltr">
                        <p dir="ltr"><strong>Đặt phòng thành công được xác định trong các trường hợp:</strong></p>

                        <ul>
                          <li>
                            <p dir="ltr"><strong>Trường hợp 1: Khách hàng thanh toán trước qua ứng dụng Happy Weekend, không huỷ và không bị huỷ booking, có check-in hoặc không check-in đều được tính là đặt phòng thành công. Thanh toán trước bao gồm các hình thức thanh toán online thông qua đối tác thứ 3 (ví dụ: &nbsp;Mo Mo, Payoo…), không phải thanh toán trực tiếp với Khách sạn.</strong></p>
                          </li>
                          <li>
                            <p dir="ltr"><strong>Trường hợp 2: Khách hàng thanh toán trực tiếp với khách sạn, được khách sạn &nbsp;check-in qua trang web quản lý đặt phòng hoặc khách hàng tự check-in bằng quét mã QR được tính là đặt phòng thành công.</strong></p>
                          </li>
                        </ul>
                      </li>
                      <li dir="ltr">
                        <p dir="ltr"><strong>Đặt phòng không thành công được xác định trong trường hợp: </strong></p>

                        <ul>
                          <li>
                            <p dir="ltr"><strong>Trường hợp 1: Khách hàng thanh toán trước qua ứng dụng Happy Weekend, khách huỷ booking trước 1 tiếng đồng hồ trước giờ check in được tính là đặt phòng không thành công. Thanh toán trước bao gồm các hình thức thanh toán online thông qua đối tác thứ 3 (ví dụ: &nbsp;Mo Mo, Payoo…), không phải thanh toán trực tiếp với Khách sạn.</strong></p>
                          </li>
                          <li>
                            <p dir="ltr"><strong>Trường hợp 2: Khách hàng thanh toán trực tiếp với khách sạn, khách hàng không đến check - in hoặc được khách sạn check - in .</strong></p>
                          </li>
                        </ul>
                      </li>
                      <li dir="ltr">
                        <p dir="ltr"><strong>Chính sách hoàn tiền cho khách: </strong></p>

                        <ul>
                          <li>
                            <p dir="ltr"><strong>Trường hợp 1: Khách hàng thanh toán trước qua ứng dụng Happy Weekend: Sau khi đã xác nhận các thông tin của các khách hàng về các booking không thành công, tuỳ theo từng loại tài khoản khách hàng sử dụng mà việc hoàn tiền sẽ có thời gian khác nhau : </strong></p>

                            <ul>
                              <li>
                                <p dir="ltr"><strong>Thẻ ATM (nội địa): Hoàn tiền trong 7 ngày làm việc</strong></p>
                              </li>
                              <li>
                                <p dir="ltr"><strong>Thẻ Visa/Master Card (nội địa): Hoàn tiền trong 7 ngày làm việc</strong></p>
                              </li>
                              <li>
                                <p dir="ltr"><strong>Thẻ Visa/Master Card (quốc tế): Hoàn tiền từ 30 đến 45 ngày</strong></p>
                              </li>
                              <li>
                                <p dir="ltr"><strong>Ví Mo Mo: Hoàn tiền trong ngày &nbsp;&nbsp;</strong></p>
                              </li>
                              <li>
                                <p dir="ltr"><strong>Lưu ý: thời gian hoàn tiền không bao gồm thứ 7, chủ nhật và các ngày lễ</strong></p>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <p dir="ltr"><strong>Trường hợp 2: Khách hàng thanh toán trực tiếp với khách sạn: Khách hàng không được hoàn tiền.</strong></p></li></ul></li></ul></div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tabs;