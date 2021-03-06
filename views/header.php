<!DOCTYPE html>

<html>

  <head>

    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link type="text/css" rel="stylesheet" href="../../web/css/bootstrap.css" />
    <link type="text/css" rel="stylesheet" href="../../web/css/bootstrap-theme.css" />
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
    <link type="text/css" rel="stylesheet" href="../../web/css/style.css" />

    <script type="text/javascript" src="../../web/js/jquery-3.1.1.js"></script>
    <script type="text/javascript" src="../../web/js/bootstrap.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js" integrity="sha384-DztdAPBWPRXSA/3eYEEUWrWCy7G5KFbe8fFjk5JAIxUYHKkDx6Qin1DkWx51bBrb" crossorigin="anonymous"></script>
    <script charset="utf-8" type="text/javascript" src="../../web/js/calendar.js"></script>

    <title>Календарь</title>

  </head>

  <body>

    <div class="navbar navbar-inverse" role="navigation">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="../">SBR</a>
        </div>
        <div class="collapse navbar-collapse">
          <ul class="nav navbar-nav my_navbar-nav">

            <?php if (User::isGuest()): ?>
              <li id="right_positon_main_menu"><a href="entry">Вход</a></li>
              <li id="right_positon_main_menu"><a href="register">Регистрация</a></li>
            <?php else: ?>
              <li><a href="calendar">Календарь</a></li>
              <li id="right_positon_main_menu"><a href="logout">Выход</a></li>
            <?php endif; ?>

          </ul>
        </div>
      </div>
    </div>
