var arrhinh = [
    "image/doan2.jpg",
    "image/doan3.jpg",
    "image/doan4.jpg",
    "image/doan5.jpg",
    "image/douong6.jpg",
    "image/douong7.jpg",
    "image/douong0.jpg",
    "image/doan1.jpg",
]
var index = 8;
function prev() {
    index--;
    if (index < 0) { index = arrhinh.length - 1; }
    var hinh = document.getElementById("hinh");
    hinh.src = arrhinh[index];
    if (index == 0) { index = 8 };
    document.getElementById("sohinh").innerHTML = "" + index + "/8";
}
function next() {
    index++;
    if (index >= arrhinh.length) { index = 0; }
    var hinh = document.getElementById("hinh");
    hinh.src = arrhinh[index];
    if (index == 0) { indexmoi = 8 }
    else { indexmoi = index }
    document.getElementById("sohinh").innerHTML = "" + indexmoi + "/8";
}
setInterval("next()", 3500);
function themvaogiohang(x) {
    var arrGH = new Array();
    var gh_str = sessionStorage.getItem("ssgiohang");
    if (gh_str != null) { arrGH = JSON.parse(gh_str); }
    var countsp = sessionStorage.getItem("countsp");
    if (countsp == null) { countsp = 0 };
    var boxsp = x.parentElement.children;
    var hinh = boxsp[0].children[0].src;
    var gia = boxsp[1].children[0].innerText;
    var tensp = boxsp[2].innerText;
    var soluong = parseInt(boxsp[3].value);
    var sp = new Array(hinh, tensp, gia, soluong);
    var coroi = 0;
    for (let i = 0; i < arrGH.length; i++) {
        if (arrGH[i][1] == tensp) {
            var sl = arrGH[i][3];
            sl += soluong;
            arrGH[i][3] = sl;
            coroi = 1;
            break;
        }
    }
    if (coroi == 0) {
        arrGH.push(sp);
        countsp++;
    }
    sessionStorage.setItem("ssgiohang", JSON.stringify(arrGH));
    sessionStorage.setItem("countsp", countsp);
    showcountsp();
}
function laydon() {
    var gh_str = sessionStorage.getItem("ssgiohang");
    var giohang = JSON.parse(gh_str);
    var ttgh = "";
    var tong = 0;
    for (let i = 0; i < giohang.length; i++) {
        var tt = giohang[i][2] * giohang[i][3];
        tong += tt;
        ttgh += `
        <tr>
        <th>STT</th>
        <th>Hình</th>
        <th>Tên sản phẩm</th>
        <th>Đơn giá</th>
        <th>Số lượng</th>
        <th>Thành tiền ($)</th>
</tr>
        <tr>
        <td>${i + 1}</td>
        <td><img src="${giohang[i][0]}"></td>
        <td>${giohang[i][1]}</td>
        <td>${giohang[i][2]}</td>
        <td><input type="number" min="0" max="10" value="${giohang[i][3]}"onchange="tinhlaidon(this);"></td>
        <td>${tt}</td>
        </tr>`
    }
    ttgh += `
    <tr>
        <th colspan="5">Tổng đơn hàng</th>
        <th id="tongtien">${tong}</th>
    </tr>
   
    <button onclick="vaogiohang()" width="100%" height="90%"id="nutvao" class="nuttheo"><a href="giohang.html">Vào giỏ hàng</a></button>`
    document.getElementById("mycart").innerHTML = ttgh;
    if (document.getElementById("mycart").style.display == "block") { document.getElementById("mycart").style.display = "none";}
    else { document.getElementById("mycart").style.display = "block";}

}
function tinhlaidon(x) {
    var gh_str = sessionStorage.getItem("ssgiohang");
    var giohang = JSON.parse(gh_str);
    var tr = x.parentElement.parentElement;
    var dg = parseInt(tr.children[3].innerHTML);
    var sl = x.value;
    var tt = parseInt(tr.children[5].innerHTML);
    var tongdon = document.getElementById("tongtien").innerText;
    tongdon -= tt;
    var tensp = tr.children[2].innerText;
    if (sl == 0) {
        dongy = confirm("về 0 sẽ xóa hàng.OK?");
        if (dongy == true) {
            tr.remove();
        }
        for (let i = 0; i < giohang.length; i++) {
            if (giohang[i][1] == tensp) {
                giohang.splice(i, 1);
            }
        }
        var countsp = parseInt(sessionStorage.getItem("countsp") - 1);
        sessionStorage.setItem("countsp", countsp);
        showcountsp();
    } else {
        for (let i = 0; i < giohang.length; i++) {
            if (giohang[i][1] == tensp) {
                giohang[i][3] = sl;
            }
        }
        tt = dg * sl;
        tr.children[5].innerHTML = tt;
        tongdon += tt;
    }
    document.getElementById("tongtien").innerHTML = tongdon;
    sessionStorage.setItem("ssgiohang", JSON.stringify(giohang));
} function showcountsp() {
    var countsp = sessionStorage.getItem("countsp");
    if (countsp == null) countsp = 0;
    document.getElementById("countsp").innerHTML = countsp;
} function vaogiohang() {
    var gh_str = sessionStorage.getItem("ssgiohang");
    var giohang = JSON.parse(gh_str);
    var ttgh = "";
    var tong = 0;
    for (let i = 0; i < giohang.length; i++) {
        var tt = giohang[i][2] * giohang[i][3];
        tong += tt;
        ttgh += `
        <tr>
                <th>STT</th>
                <th>Hình</th>
                <th>Tên sản phẩm</th>
                <th>Đơn giá</th>
                <th>Số lượng</th>
                <th>Thành tiền ($)</th>
        </tr>
        <tr>
        <td>${i + 1}</td>
        <td><img src="${giohang[i][0]}"></td>
        <td>${giohang[i][1]}</td>
        <td>${giohang[i][2]}</td>
        <td><input type="number" min="0" max="10" value="${giohang[i][3]}"onchange="tinhlaidon(this);"></td>
        <td>${tt}</td>
        </tr>`
    }
    ttgh += `
    <tr>
        <th colspan="5">Tổng đơn hàng</th>
        <th id="tongtien">${tong}</th>
    </tr>
    <button type="button" colspan="3" id="nutvao"class="nuttheo">Đặt đơn</button>
    <button onclick="thoat()" type="button" colspan="2" id="nutvao" >Thoát</button>
    `
    if (document.getElementById("giohang").style.display == "") {document.getElementById("duoi").style.display="none";document.getElementById("mycart").style.display="none";}
    else{document.getElementById("giohang").style.display = "";document.getElementById("duoi").style.display="none";document.getElementById("mycart").style.display="none";}
    document.getElementById("giohang").innerHTML = ttgh;
}
function thoat() {
    if (document.getElementById("giohang").style.display == "") { document.getElementById("giohang").style.display = "none";document.getElementById("duoi").style.display="";document.getElementById("mycart").style.display="block"}

}
