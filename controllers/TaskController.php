<?php

  class TaskController
  {

    public function actionGettask()
    {
      $user_id = User::getId();
      $tasks = Task::getTaskByUserId($user_id);

      $result_task_list = array();

      foreach($tasks as $key => $task){
         $buf_data = $task['task_date'];
         $year = date("Y", $buf_data);
         $month = date("n", $buf_data);
         $day = date("j", $buf_data);
         $result_task_list[$year][$month][$day][count($result_task_list[$year][$month][$day])] = $task;
      }

      $result = json_encode($result_task_list);

      echo $result;

      return true;
    }

    public function actionNewTask()
    {
      $day = $_POST['day'];
      $month = $_POST['month'];
      $year = $_POST['year'];
      $taskContent = $_POST['contentTask'];
      $create_user_id = $_SESSION['user'];

      $settingsDATE = Date("U", mktime(0, 0, 0, $month+1, $day, $year));

      $result = Task::newTask($settingsDATE, $taskContent, $create_user_id);

      echo $result;
      return true;
    }

    public function actionDelete()
    {
      $task_id = $_POST['task_id'];

      $result = Task::deleteTask($task_id);

      echo $result;
      return true;
    }

  }

 ?>
