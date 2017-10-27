<?php

  class CalendarController
  {

    public function actionIndex()
    {
      if (User::isGuest()){
        header("Location: /");
        return true;
      }else{
        require_once(ROOT . '/views/calendar/index.php');
        return true;
      }
    }
    
  }

 ?>
