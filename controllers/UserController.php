<?php

  class UserController
  {
    // авторизация пользователя
    public function actionEntry()
    {
      if(isset($_POST['submit'])){
        $name = $_POST['name'];
        $password = $_POST['password'];

        $error = false;

        $user_id = User::login($name, $password);

        if($user_id == false){
          $error = "Введены неправильные данные пользователя";
        }else {
          User::auth($user_id);
          header("Location: /");
        }
      }
      require_once(ROOT . '/views/site/entry.php');
      return true;
    }

    // выход пользователя
    public function actionLogout()
    {
      unset($_SESSION['user']);
      header("Location: /");
    }

    // регистрация пользователя
    public function actionRegister()
    {

      $tel = '';
      $name = '';
      $password = '';
      $result = false;

      if (isset($_POST['submit'])) {
        $tel = $_POST['tel'];
        $name = $_POST['name'];
        $password = $_POST['password'];

        $errors = false;

        if (!User::checkPhone($tel)) {
          $errors[] = 'Номер телефона введён не верно';
        }

        if (!User::checkName($name)) {
          $errors[] = 'Имя не должно быть меньше 3 символов';
        }

        if (!User::checkPassword($password)) {
          $errors[] = 'пароль не должен быть меньше 6 символов';
        }

        if (User::chekPhoneExist($tel)){
          $errors[] = 'Пользователь с таким номером телефона уже существует';
        }

        if ($errors == false) {
          $result = User::register($tel, $name, $password);
        }
      }

      require_once(ROOT . '/views/site/register.php');

      return true;
    }

  }

?>
