<?php

  class SiteController
  {

    // показ главной страницы
    public function actionIndex()
    {

      require_once(ROOT . '/views/site/index.php');
      return true;
      
    }

  }

?>
