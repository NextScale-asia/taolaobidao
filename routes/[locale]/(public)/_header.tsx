export default function Header() {
    return (
        <header>
            <div id="top-header">
                <div className="container mx-auto">
                    Top header
                </div>
            </div>
            <div id="middle-header" >
                <div className="container mx-auto">
                    <div id="middle-header-row-1">
                        <div>
                            <a href="/vi_VN">Logo</a>
                        </div>
                        <div>Search</div>
                        <div>Account</div>
                        <div>Cart</div>
                    </div>
                    <div id="middle-header-row-2">
                        <ul id="middle-header__quick-links">
                            <li><a href="">Sản phẩm vừa xem</a></li>
                            <li><a href="">Sản phẩm mua nhiều</a></li>
                            <li><a href="">Sản phẩm khuyến mãi</a></li>
                            <li><a href="">Tuyển dụng</a></li>
                            <li><a href="">Hình thức thanh toán</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div id="bottom-header">
                <div className="container mx-auto">
                    Bottom header
                </div>
            </div>
        </header>
    );
}
