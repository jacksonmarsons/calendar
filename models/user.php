<?php

  class User
  {
    // авторизация пользователя
    public static function login($name, $password)
    {

      $db = Db::getConnection();

      $sql = 'SELECT * FROM User WHERE user_name = :name AND user_password = :password';

      $result = $db->prepare($sql);
      $result->bindParam(':name', $name, PDO::PARAM_STR);
      $result->bindParam(':password', md5($password), PDO::PARAM_STR);
      $result->execute();

      $user = $result->fetch();
      if($user){
        return $user['id'];
      }

      return false;

    }

    // запись авторизованного пользователя в сессию
    public static function auth($user_id)
    {
      $_SESSION['user'] = $user_id;
    }

    // проверка авторизации
    public static function isGuest()
    {
      if(isset($_SESSION['user'])){
        return false;
      }
      return true;
    }

    public static function getId()
    {
      if(isset($_SESSION['user'])){
        return $_SESSION['user'];
      }
    }

    // регистрация пользователя
    public static function register($tel, $name, $password)
    {

      $db = Db::getConnection();

      $sql = 'INSERT INTO User (user_phone_nomber, user_name, user_password) VALUES (:tel, :name, :password)';

      $result = $db->prepare($sql);
      $result->bindParam(':tel', $tel, PDO::PARAM_STR);
      $result->bindParam(':name', $name, PDO::PARAM_STR);
      $result->bindParam(':password', md5($password), PDO::PARAM_STR);

      return $result->execute();

    }

    // валидация номера телефона
    public static function checkPhone($tel) {
      if (strlen($tel) == 11) {
        return true;
      }
      return false;
    }

    // валидация имени пользователя
    public static function checkName($name) {
      if (strlen($name) >= 2) {
        return true;
      }
      return false;
    }

    // валидация пароля
    public static function checkPassword($password) {
      if (strlen($password) >= 6) {
        return true;
      }
      return false;
    }

    // валидация на повтор имени пользователя
    public static function chekPhoneExist($tel){

      $db = Db::getConnection();

      $sql = 'SELECT COUNT(*) FROM User WHERE user_phone_nomber = :tel';

      $result = $db->prepare($sql);
      $result->bindParam(':tel', $tel, PDO::PARAM_STR);
      $result->execute();

      if ($result->fetchColumn())
        return true;
      return false;

    }

  }

?>
