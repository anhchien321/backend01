
const db = require('../config/db');

const chitiethdModel = {

    getAllCTHD: (callback) => {
        const query = `  SELECT 
        chitiethoadon.*, 
        khachhang.username AS tenKhachHang, 
        khachhang.phone AS soDienThoai, 
        khachhang.email AS email
    FROM 
        chitiethoadon
    JOIN 
        hoadon ON chitiethoadon.hoaDon_id = hoadon.id
    JOIN 
        khachhang ON hoadon.khachhang_id = khachhang.id `
        db.query(query, callback)
    },
    createCTHD: (hoaDon_id, dichVu_id, soLuong = 1, callback) => {
        const query = `
            INSERT INTO chitiethoadon (hoaDon_id, dichVu_id, soLuong, thanhTien, donGia) 
            VALUES (?, ?, ?, 
                (SELECT gia FROM dichvu WHERE id = ?) * ?, 
                (SELECT gia FROM dichvu WHERE id = ?)
            );
        `;

        db.query(query, [hoaDon_id, dichVu_id, soLuong, dichVu_id, soLuong, dichVu_id], callback);
    },

    getCTHDById: (id, callback) => {
        const query = `      SELECT 
        chitiethoadon.*, 
        khachhang.username AS tenKhachHang, 
        khachhang.phone AS soDienThoai, 
        khachhang.email AS email,
        dichvu.tenDichVu AS DichVu
    FROM 
        chitiethoadon
    JOIN 
        hoadon ON chitiethoadon.hoaDon_id = hoadon.id
    JOIN 
        khachhang ON hoadon.khachhang_id = khachhang.id 
	JOIN
		dichvu ON chitiethoadon.dichVu_id = dichvu.id
        where chitiethoadon.hoaDon_id = ?;`; // Query SQL theo ID
        db.query(query, [id], (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    }



}

module.exports = chitiethdModel