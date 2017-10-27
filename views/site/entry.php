<?php include ROOT . '/views/header.php' ?>

  <div class="container">
    <div class="row">
      <div class="col-lg-4 col-md-4 col-lg-offset-4 col-md-offset-4">
        <h4 class="text-center register_main_label">Авторизация на сайте</h4>
        
        <?php if (isset($error)): ?>
          <?php echo $error; ?>
        <?php endif; ?>

        <form class="form-horizontal" id="form_entry" action="#" method="post">
          <div class="form-group">
            <input type="text" class="form-control" id="inputEmail3" name="name" placeholder="Имя пользователя">
          </div>
          <div class="form-group">
            <input type="password" class="form-control" id="inputPassword3" name="password" placeholder="Пароль">
          </div>
          <div class="form-group">
            <input type="submit" name="submit" class="btn btn-success form-control" value="Авторизоваться">
          </div>
        </form>

      </div>
    </div>
  </div>

<?php include ROOT . '/views/footer.php' ?>
