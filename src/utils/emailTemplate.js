exports.accountCreatedTemplate = (name, username, password) => {
    return `<html>
    <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <style>
    .container {
      padding: 0 auto;
      width: 100%;
    }

    .box {
      border: 1px solid #000;
      width: 45%;
      margin: 0 auto;
    }

    .header {
      padding: 25px;
      text-align: center;
      background-color: #0D6EFD;
      color: #fff;
      font-size: 20px;
    }

    .main {
      padding: 25px 40px 25px 40px;
      height: auto;
      text-align: center;
      font-size: 18px;
    }

    .footer {
      padding: 25px;
      text-align: center;
      color: #fff;
      background-color: #DC3545;
      font-size: 18px;
    }

    @media only screen and (max-width: 600px) {
      .box {
        border: 1px solid #000;
        width: 100%;
      }
    }

  </style>
    <title>Document</title>
  </head>
  <body>
    <div class="box">
      <div class="bg-primary text-light header" width="200">
        ${name}
      </div>
      <div class="main">
        Trong một khu rừng nọ, có một cô Vịt mẹ đang ấp trứng, hồi hộp mong chờ đến ngày được gặp mặt những đứa con yêu quý của mình.
  Cuối cùng ngày đó cũng đến, từng quả trứng nở ra, những chú vịt con xinh xắn và đáng yêu lần lượt nhảy ra ngoài, kêu “Cạc cạc”, Vịt mẹ vui lắm. Nhưng vẫn còn một quả trứng lớn nhất ở trong ổ vẫn chưa nở, thế là nó lại nằm xuống ấp tiếp. Bác Vịt già đi ngang qua, hỏi Vịt mẹ: “Này, cô đang làm gì ở đấy thế? Con của cô đã nở hết chưa?” Vịt mẹ nói: “Vẫn còn một trứng chưa nở chị ạ
  Bác Vịt già bèn đi tới xem quả trứng và nói: “Quả trứng to thế này, chắc chắn không phải là trứng của cô đâu. Không chừng lại là trứng Gà tây đấy!” Vịt mẹ nghe lời bác Vịt già nói thì đâm bán tin bán nghi. Bác Vịt già lại nói: “Tốt nhất là cô cứ mặc kệ nó, mau đi dạy lũ con của mình bơi lội đi!” “Không! Tôi nhất định phải ở đây.” Nói xong, Vịt mẹ lại nằm xuống cái ổ của mình.
        Username: ${username},
        Password: ${password}
  </div>
      <div class="footer bg-danger text-light">
        Em ngồi đây và em khóc huhu
      </div>
    </div>
  </body>
  </html>`
}
