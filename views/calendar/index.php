<?php include ROOT . '/views/header.php' ?>

  <div class="container" id="calendar"></div>

  <!-- модальное окно добавление задачи-->
  <div class="modal fade" id="myModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
          <h4 class="modal-title" id="myModalLabel">На данную дату не назначено задач</h4>
        </div>
        <div class="modal-body">
          <form role="form" id="task_Form">
            <div class="form-group">
              <label for="modarFormTaskText">Текст задачи</label>
              <input type="text" class="form-control" id="modalFormTaskText" placeholder="Опишите задачу">
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Закрыть</button>
          <button type="button" class="btn btn-primary" id="saveNewTask" data-dismiss="modal">Сохранить изменения</button>
        </div>
      </div>
    </div>
  </div>
  <!-- конец модального окна по добавлению задачи -->

<?php include ROOT . '/views/footer.php' ?>
