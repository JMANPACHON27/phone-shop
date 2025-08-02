import React, { useState } from "react";
import "./App.css";

type Phone = {
  id: number;
  name: string;
  price: number;
  image: string;
  desc: string;
};

const PHONES: Phone[] = [
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    price: 34990000,
    image: "https://cdn.tgdd.vn/Products/Images/42/305659/iphone-15-pro-max-blue-1-1.jpg",
    desc: "Màn 6.7 inch, chip Apple A17 Pro, 3 camera 48MP."
  },
  {
    id: 2,
    name: "Samsung Galaxy S24 Ultra",
    price: 26990000,
    image: "https://cdn.tgdd.vn/Products/Images/42/303891/samsung-galaxy-s24-ultra-grey-thumb-600x600.jpg",
    desc: "Màn 6.8 inch, chip Snapdragon 8 Gen 3, 4 camera 200MP."
  },
  {
    id: 3,
    name: "Xiaomi 14",
    price: 15990000,
    image: "https://cdn.tgdd.vn/Products/Images/42/319664/xiaomi-14-thumb-xanh-600x600.jpg",
    desc: "Màn 6.36 inch, chip Snapdragon 8 Gen 3, camera Leica."
  }
];

export default function App() {
  const [cart, setCart] = useState<Phone[]>([]);
  const [selected, setSelected] = useState<Phone | null>(null);

  const addToCart = (phone: Phone) => {
    setCart((prev) => [...prev, phone]);
  };

  const total = cart.reduce((sum, phone) => sum + phone.price, 0);

  return (
    <div className="shop-container">
      <h1>🛒 Cửa Hàng Điện Thoại</h1>
      <div className="main-layout">
        <div className="product-list">
          <h2>Danh sách sản phẩm</h2>
          <div className="products">
            {PHONES.map((phone) => (
              <div key={phone.id} className="product-card">
                <img src={phone.image} alt={phone.name} />
                <h3>{phone.name}</h3>
                <p className="price">
                  {phone.price.toLocaleString()} đ
                </p>
                <button onClick={() => setSelected(phone)}>Xem chi tiết</button>
                <button onClick={() => addToCart(phone)}>Thêm vào giỏ</button>
              </div>
            ))}
          </div>
        </div>
        <div className="cart">
          <h2>Giỏ hàng</h2>
          {cart.length === 0 ? (
            <p>Chưa có sản phẩm nào.</p>
          ) : (
            <ul>
              {cart.map((phone, idx) => (
                <li key={idx}>
                  {phone.name} - {phone.price.toLocaleString()} đ
                </li>
              ))}
            </ul>
          )}
          <div className="total">
            <b>Tổng cộng:</b> {total.toLocaleString()} đ
          </div>
        </div>
      </div>
      {selected && (
        <div className="modal" onClick={() => setSelected(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={selected.image} alt={selected.name} />
            <h2>{selected.name}</h2>
            <b>Giá: {selected.price.toLocaleString()} đ</b>
            <p>{selected.desc}</p>
            <button onClick={() => addToCart(selected)}>Thêm vào giỏ</button>
            <button onClick={() => setSelected(null)}>Đóng</button>
          </div>
        </div>
      )}
    </div>
  );
}