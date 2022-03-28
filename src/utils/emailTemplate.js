exports.accountCreatedTemplate = (name, username, password) => {
    return `<html lang="en">

    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
      <style>
        * {
          margin: 0;
          padding: 0;
        }

        body {
          width: 100%;
          background-color: #E5E5E5;
          height: 100%;


        }

        .ova {
          width: 40%;
          background-color: #fff;
          margin: 0 auto;

        }


        header {
          height: 155px;
          background-color: #F2EDF3;
        }

        .brand {
          height: 224px;
          text-align: center;
        }


        .welcome {
          height: 55px;
          background-color: #fff;
          align-items: center;
          line-height: 50px;
          margin: 50px 0px 25px 0;
        }

        .content {
          height: 120%;
          margin: 0 10%;
        }

        .welcome p {
          font-size: 22px;
          color: #000;
          font-family: Open Sans;
        }

        .text-content p {
          font-size: 16px;
          color: #000;
          font-family: Open Sans;
        }

        .ew-f {
          margin: 20px 0;
        }

        .ew-f p {
          font-size: 16px;
          color: #000;
        }

        .btn-content {
          background: linear-gradient(180deg, #DA8CFF 0%, rgba(154, 85, 255, 0.93) 100%);
          padding: 8px 30px;
          color: #fff;
          border: none;
          border-radius: 5px;
        }


        footer {
          position: relative;
          height: 80px;
          background-color: #F2EDF3;
          margin-top: 150px;

        }

        .text-footer {
          text-align: center;
          line-height: 32px;

        }

        .text-footer-container {
          margin-top: 10px
        }

        .text-footer p {
          font-size: 16px;
          color: #000;
          font-family: Open Sans;
          opacity: 0.7;

        }

        .btn-content:hover {
          cursor: pointer;
          background-color: #000;
          border: solid 1px rgba(89, 3, 218, 0.93);
        }

        /* ipad pro */
        @media all and (max-width: 1024px) {
          .welcome {
            height: 80px;
            line-height: 30px;
            margin: 50px 0 0 0;
          }

          .brand img {
            width: 200px;
            height: auto;
          }

          header {
            height: 140px;
          }

          .ova {
            width: 60%;
          }


        }

        /* small tablet */
        @media all and (max-width: 600px) {
          .text-footer p {
            font-size: 14px;
          }


          .ova {
            width: 100%;
          }

        }

        /* iPhone 6/7/8 Plus */

        @media all and (max-width: 414px) {
          .text-footer p {
            font-size: 12px;
          }

          .brand img {
            width: 160px;
            height: auto;
          }

          header {
            height: 110px;
          }

          .text-footer {
            line-height: 30px;
          }

        }

      </style>
      <link href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" rel="stylesheet">
    </head>

    <body>
      <div class="ova">


        <!-- header -->
        <header>
          <div class="container-header">
            <div class="brand">

              <img class="img-responsive" src="https://i.imgur.com/IM8jRzq.png" />
            </div>
          </div>

        </header>

        <!-- content -->

        <section class="content">
          <div class="welcome">
            <p>Welcome to ABC!</p>
          </div>
          <div class="container-content">
            <div class="first-text-content">

              <div class="text-content">
                <p>ABC has invited you to access as a member.</p>
                <div class="ew-f">
                  <p>Email: ${username}</p>
                  <p>Password: ${password}</p>
                </div>

                <button class="btn-content">Log in here</button>

                <div class="ew-f">
                  <p>If you weren't expecting this invitation, you can decline.</p>
                  <p>If you have any questions, contact us.</p>
                </div>

                <div class="ew-f">
                  <p>Best regards,</p>
                  <p>ABC</p>
                </div>
              </div>
            </div>
          </div>

        </section>
        <!-- footer -->
        <footer>
          <div class="text-footer">
            <p>+84 (0) 456 - 789 - 123</p>
            <p>2021 ABC Company. All Rights Reserved</p>
          </div>
        </footer>

      </div>
    </body>

    </html>`
}

exports.resetPasswordTemplate = (name, username, password) => {
  return `<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" rel="stylesheet">
    <style>
      * {
        margin: 0;
        padding: 0;
      }

      body {
        width: 100%;
        background-color: #E5E5E5;
        height: 100%;


      }

      .ova {
        width: 40%;
        background-color: #fff;
        margin: 0 auto;

      }


      header {
        height: 155px;
        background-color: #F2EDF3;
      }

      .brand {
        height: 224px;
        text-align: center;
      }


      .welcome {
        height: 55px;
        background-color: #fff;
        align-items: center;
        line-height: 50px;
        margin: 50px 0px 25px 0;
      }

      .content {
        height: 120%;
        margin: 0 10%;
      }

      .welcome p {
        font-size: 22px;
        color: #000;
        font-family: Open Sans;
      }

      .text-content p {
        font-size: 16px;
        color: #000;
        font-family: Open Sans;
      }

      .ew-f {
        margin: 20px 0;
      }

      .ew-f p {
        font-size: 16px;
        color: #000;
      }

      .btn-content {
        background: linear-gradient(180deg, #DA8CFF 0%, rgba(154, 85, 255, 0.93) 100%);
        padding: 8px 30px;
        color: #fff;
        border: none;
        border-radius: 5px;
      }


      footer {
        position: relative;
        height: 80px;
        background-color: #F2EDF3;
        margin-top: 150px;

      }

      .text-footer {
        text-align: center;
        line-height: 32px;

      }

      .text-footer-container {
        margin-top: 10px
      }

      .text-footer p {
        font-size: 16px;
        color: #000;
        font-family: Open Sans;
        opacity: 0.7;

      }

      .btn-content:hover {
        cursor: pointer;
        background-color: #000;
        border: solid 1px rgba(89, 3, 218, 0.93);
      }

      /* ipad pro */
      @media all and (max-width: 1024px) {
        .welcome {
          height: 80px;
          line-height: 30px;
          margin: 50px 0 0 0;
        }

        .brand img {
          width: 200px;
          height: auto;
        }

        header {
          height: 140px;
        }

        .ova {
          width: 60%;
        }


      }

      /* small tablet */
      @media all and (max-width: 600px) {
        .text-footer p {
          font-size: 14px;
        }


        .ova {
          width: 100%;
        }

      }

      /* iPhone 6/7/8 Plus */

      @media all and (max-width: 414px) {
        .text-footer p {
          font-size: 12px;
        }

        .brand img {
          width: 160px;
          height: auto;
        }

        header {
          height: 110px;
        }

        .text-footer {
          line-height: 30px;
        }

      }

    </style>
  </head>
  <body>
    <div class="ova">


    <!-- header -->
    <header>
      <div class="container-header">
        <div class="brand">

          <img class="img-responsive" src="https://i.imgur.com/IM8jRzq.png" />
        </div>
      </div>

    </header>

    <!-- content -->

    <section class="content">
      <div class="welcome">
        <p>Hello!</p>
      </div>
      <div class="container-content">
        <div class="first-text-content">

          <div class="text-content">
            <p>This email is to confirm your request for a new password.</p>
            <div class="ew-f">

                <p>Simply click on the button below to set your new password. Please note this link is only valid for 24 hours.</p>
            </div>

            <button class="btn-content">Change Password</button>

            <div class="ew-f">

                <p>If you have any questions, contact us.</p>
            </div>

            <div class="ew-f">
                <p>Best regards,</p>
                <p>ABC</p>
            </div>
          </div>
        </div>
      </div>

    </section>
    <!-- footer -->
    <footer>
      <div class="text-footer">
          <p>+84 (0) 456 - 789 - 123</p>
            <p>2021 ABC Company. All Rights Reserved</p>
      </div>
  </footer>

  </div>
  </body>
</html>`
}

exports.ideaCreatedTemplate = (full_name, title, description, id, department_name, created_date) => {
  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>

      <link
        href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap"
        rel="stylesheet"
      />
      <style>
          * {
    padding: 0;
    margin: 0;
  }

  body {
    background-color: #e5e5e5;
    width: 100%;
    height: 100%;
    position: relative;
    font-family: "Open Sans", sans-serif;
  }

  .container {
      width: 614px;
      height: 800px;
      background-color: #fff;
      margin-left: 25%;
  }

  header {
      position: absolute;
    width: 614px;
    height: 144px;
    left: 25%;
    top: 0px;
    background: rgba(102, 16, 242, 0.39);
  }
  .logo {
    position: absolute;
    width: 151px;
    height: 134px;
    left: 45%;
    top: 77px;
    mix-blend-mode: darken;
  }

  section {
      position: absolute;
      width: 548px;
      height: 506px;
      left: 27.5%;
      top: 184px;
      background: rgba(102, 16, 242, 0.08);

  }

  .content {
      margin: 5% 5%;
  }
  .content .title {
      margin-top: 10%;
      margin-bottom: 10%;
      text-align: center;
      font-weight: bold;
      font-style: italic;
      font-size: 20px;
      font-family: 'Open Sans';
  }
  .btn-content2 {
      display: block;
      text-align: center;
  }
  .btn-content {
      background: linear-gradient(180deg, #DA8CFF 0%, #DA8CFF 0.01%, #9A55FF 100%);
      width: 164px;
  height: 40px;
  border-radius: 5px;
  color: #fff;
  border: none;
  margin: 20% 35%;

  }

  .btn-content:hover {
      cursor: pointer;
      border: 1px solid #9A55FF;
  }

  footer {
    position: absolute;
    width: 615px;
    height: 80px;
    left: 25%;
    top: 720px;
    background: rgba(102, 16, 242, 0.39);
    text-align: center;
  }

  .text-footer {
      margin-top: 10px;
  }
  @media all and (min-width: 768px) {
      .container {
          width: 60%;
          margin-left: 10%;
      }

      header {
          left: 10%;
          width: 60%;
      }

      .logo {
          left: 35%;
      }

      section {
          left: 15.5%;
      width: 50%;
      }
      .btn-content {
          margin: 10% 35%;
      }

      footer {

      left: 10%;
      width: 60%;


          }
  }

  @media all and (max-width: 768px) {
      .container {
          margin-left: 10%;
      }

      header {
          left: 10%;
      }

      .logo {
          left: 40%;
      }

      section {
          left: 14.5%;
      }

      footer {

      left: 10%;


          }
  }

  @media all and (max-width: 415px) {
      body {
          width: 100%;
      }
      .container {
          width: 100%;
          margin-left: 0;
      }

      header {
          width: 100%;
          left: 0;
      }

      .logo {
          left: 25%;
      }

      section {
          width: 100%;
          left: 0;
      }

      footer {
          width: 100%;
      left: 0;


          }
  }
      </style>
    </head>
    <body>
      <div class="container">
        <!--  -->
        <header></header>
        <!--  -->
        <div class="logo">
          <img
            src="https://i.imgur.com/IM8jRzq.png"
            alt=""
          />
        </div>
        <!--  -->
        <section>
          <div class="content">
            <p class="title">New Idea is coming up!</p>
            <p>Dear Abc,</p>
            <p>
              ${full_name} Department ${department_name} posted a new idea in ${created_date}.
            </p>
            <p>Name idea: ${title}</p>
            <p>Description:  ${description}</p>
          </div>
          <div class="content-2">
          <button class="btn-content">
            <a href="http://103.107.182.190:3000/ideas/${id}">Open</a>
          </button>
      </div>
        </section>
        <!--  -->
        <footer>
            <div class="text-footer">
          <p>+84 (0) 456 - 789 - 123</p>
          <p>  2021 ABC Company. All Rights Reserved</p>
      </div>
        </footer>
        <!--  -->
      </div>
    </body>
  </html>`
}
