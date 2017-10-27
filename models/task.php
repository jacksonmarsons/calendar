<?php

  class Task{

    public static function getTaskByUserId($user_id)
    {
      $db = Db::getConnection();
      $task_list = array();

      $result = $db->query('SELECT * FROM task WHERE create_user_id=' . $user_id);
      $result->setFetchMode(PDO::FETCH_ASSOC);

      $i = 0;
      while($row = $result->fetch()){
        $tasks_list[$i]['id'] = $row['id'];
        $tasks_list[$i]['create_user_id'] = $row['create_user_id'];
        $tasks_list[$i]['title'] = $row['title'];
        $tasks_list[$i]['content'] = $row['content'];
        $tasks_list[$i]['task_date'] = $row['task_date'];
        $tasks_list[$i]['date_deadline'] = $row['date_deadline'];
        $i++;
      }

      return $tasks_list;
    }

    public static function newTask($settingsDATE, $taskContent, $create_user_id)
    {
      $db = Db::getConnection();

      $sql = 'INSERT INTO task (create_user_id, title, content, task_date)' . 'VALUES (:create_user_id, :title, :content, :task_date)';

      $result = $db->prepare($sql);
      $result->bindParam(':create_user_id', $create_user_id, PDO::PARAM_STR);
      $result->bindParam(':title', $taskContent, PDO::PARAM_STR);
      $result->bindParam(':content', $taskContent, PDO::PARAM_STR);
      $result->bindParam(':task_date', $settingsDATE, PDO::PARAM_STR);

      return $result->execute();
    }

    public static function deleteTask($task_id)
    {

      $db = Db::getConnection();

      $sql = 'DELETE FROM task WHERE id =' . $task_id;
      $result = $db->query($sql);

      return $result->execute();

    }

  }

?>
