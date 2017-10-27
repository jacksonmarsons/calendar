<?php include ROOT . '/views/header.php' ?>

  <div class="container">
    <div class="row">
      <div class="col-lg-4 col-md-4 col-lg-offset-4 col-md-offset-4">

        <?php if($result): ?>
          <h4 class="text-center register_main_label">Вы зарегистрированы</h4>
        <?php else: ?>

          <h4 class="text-center register_main_label">Регистрация на сайте</h4>
          <?php if (isset($errors) && is_array($errors)): ?>
            <ul>
              <?php foreach ($errors as $error): ?>
                <li> <?php echo $error; ?> </li>
              <?php endforeach; ?>
            </ul>
          <?php endif; ?>

          <form class="form-horizontal" id="form_entry" action="#" method="post">
            <div class="form-group">
              <input type="tel" class="form-control" name="tel" id="inputTel3" placeholder="Номер телефона" value="<?php echo $tel; ?>">
            </div>
            <div class="form-group">
              <input type="text" class="form-control" name="name" id="inputName3" placeholder="Имя пользователя" value="<?php echo $name; ?>">
            </div>
            <div class="form-group">
              <input type="password" class="form-control" name="password" id="inputPassword3" placeholder="Пароль" value="<?php echo $password; ?>">
            </div>
            <div class="form-group">
              <input type="submit" name="submit" class="btn btn-success form-control" value="Зарегистрироваться">
            </div>
          </form>

        <?php endif; ?>

      </div>
    </div>
  </div>

<?php include ROOT . '/views/footer.php' ?>
