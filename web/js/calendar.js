$(document).ready(function(){

  task_visibility = 0;
  task = 0;

  tasks = 0;

  $.ajax({
    type: 'post',
    url: 'gettask',
    dataType: 'json',
    success: function(arrayTask){
      show_index_calendar(arrayTask);
    }
  });

  $(document).on('click', '.btn_next_month', function(){
    if(settingsMonth==11){
      settingsMonth=0;
      settingsYear++;
    }else{
      settingsMonth++;
    }
    showHeadCalendar();
    showBodyCalendar();;
  });

  $(document).on('click', '.btn_back_month', function(){
    if(settingsMonth==0){
      settingsMonth=11;
      settingsYear--;
    }else{
      settingsMonth--;
    }
    showHeadCalendar();
    showBodyCalendar();
  });

  $(document).on('click', '.table_price_nomber', function(){
    var count_task = $(this).data('date_count_task');

    objectDay = $(this).data('day');
    settingsDay = objectDay;
    objectMonth = settingsMonth;
    objectYear = settingsYear;

    if (count_task != 0)
    {
      task_visibility = 1;
      mainViev();
    }else {
      $('#myModal').modal('show');
    }
  });

  $(document).on('click', '#saveNewTask', function(){

    $.ajax({
      type: 'post',
      url: 'newtask',
      dataType: 'json',
      data: {'day': settingsDay, 'month': settingsMonth, 'year': settingsYear, 'contentTask': $('#modalFormTaskText').val()},
      success: function(data){
        if(data==1){
          alert("Новая задача успешно добавлена.");

          $.ajax({
            type: 'post',
            url: 'gettask',
            dataType: 'json',
            success: function(arrayTask){
              tasks = arrayTask;

              task_visibility = 1;
              mainViev();

            }
          });

        }else {
          alert("Произошла ошибка, обратитесь в тех.поддержку.");
        }
      }
    });
  });

  $(document).on('click', '#task_label_icon_2', function(){
    task_visibility = 0;
    mainViev();
  });

  $(document).on('click', '#task_label_icon_1', function(){
    $('#myModal').modal('show');
  });

  $(document).on('click', '.delete_task_icon', function(){

    $.ajax({

      type: 'post',
      url: 'delete_task',
      dataType: 'json',
      data: {task_id: $(this).data('task_id')},
      success: function(result){
        if(result == 1){
          alert("Задача удалена");
          $.ajax({
            type: 'post',
            url: 'gettask',
            dataType: 'json',
            success: function(arrayTask){
              tasks = arrayTask;
              mainViev();
            }
          });
        }else {
          alert("Произошла ошибка, обратитесь в тех.поддержку.");
        }
      }
    });

  });

});

function show_index_calendar($task_list){

  tasks = $task_list;

  var currentDate = new Date();

  currentYear = currentDate.getFullYear();
  currentMonth = currentDate.getMonth();
  currentDay = currentDate.getDate();

  settingsYear = currentYear;
  settingsMonth = currentMonth;
  settingsDay = currentDay;

  mainViev();

}

function mainViev(){
  $("#main_row").remove();

  $("<div/>", {"class": "row", "id": "main_row"}).appendTo("#calendar");
  if (task_visibility == 0){
    $("<div/>", {"class": "col-md-12 col-lg-12", "id": "calendar_col"}).appendTo("#main_row");
    showHeadCalendar();
    showBodyCalendar();
  }else {
    $("<div/>", {"class": "col-md-8 col-lg-8", "id": "calendar_col"}).appendTo("#main_row");
    $("<div/>", {"class": "col-md-4 col-lg-4", "id": "task_col"}).appendTo("#main_row");
    showHeadCalendar();
    showBodyCalendar();
    showTask();
  }

}

function showHeadCalendar(){

  $("#row_head_calendar").remove();

  $("<div/>", {"class": "row block_syle", "id": "row_head_calendar"}).appendTo("#calendar_col");
  $("<div/>", {"class": "row", "id": "row_year"}).appendTo("#row_head_calendar");
  $("<div/>", {"class": "col-md-10 col-lg-10"}).appendTo("#row_year");
  $("<div/>", {"class": "col-md-2 col-lg-2", "id": "div_year"}).appendTo("#row_year");
  $("<h3/>", {"id": "label_year", "text": settingsYear}).appendTo("#div_year");

  $("<div/>", {"class": "row", "id": "row_month"}).appendTo("#row_head_calendar");
  $("<div/>", {"class": "col-md-3 col-lg-3 text-center", "id": "div_month_left"}).appendTo("#row_month");
  $("<i/>", {"class": "fa fa-angle-double-left fa-2x btn_back_month btn_settings_month", "aria-hidden":"true"}).appendTo("#div_month_left");
  $("<div/>", {"class": "col-md-6 col-lg-6 text-center", "id": "div_month_label"}).appendTo("#row_month");
  $("<h3/>", {"id": "label_month", "text": GetMonthName(settingsMonth)}).appendTo("#div_month_label");
  $("<div/>", {"class": "col-md-3 col-lg-3 text-center", "id": "div_month_right"}).appendTo("#row_month");
  $("<i/>", {"class": "fa fa-angle-double-right fa-2x btn_next_month btn_settings_month", "aria-hidden":"true"}).appendTo("#div_month_right");

}

function showBodyCalendar(){

  var StringCalendar = 0; //идентификатор строки календаря
  var ColumnCalendar = 0; //идентификатор столбца календаря

  //определение номера предыдущего и следующего месяца
  var nomberPreviousMonth;
  var nomberNextMonth;
  if(settingsMonth==0){
      nomberPreviousMonth=11;
  }else{
      nomberPreviousMonth = settingsMonth-1;
  }
  if(settingsMonth==11){
      nomberNextMonth=0;
  }else{
      nomberNextMonth = settingsMonth+1;
  }
  //конец определения номера предыдущего и следующего месяца

  //определение последнего дня текущего месяца
  var LastDay_CurrentMonth = new Date(settingsYear, settingsMonth + 1, 0);
  var lastDay = LastDay_CurrentMonth.getDate();
  //конец определенния последнего дня текущего месяца

  //определение последнего дня прошлого месяца
  var previousMonth = new Date(settingsYear, nomberPreviousMonth + 1, 0);
  var LastDay_previousMonth = previousMonth.getDate();
  //конец определения последнего дня прошлого месяца

  //определение дня недели первого дня текущего месяца
  var firstDay_CurrentMonth = new Date(settingsYear, settingsMonth, 1);
  var firstDay_positionWeek = firstDay_CurrentMonth.getDay();
  if(firstDay_positionWeek==0){
    firstDay_positionWeek=7;
  }
  //конец определения дня недели первого дня текущего месяца

  //определение дня недели последнего дня месяца
  var lastDay_positionWeek = LastDay_CurrentMonth.getDay();
  if(lastDay_positionWeek==0){
    lastDay_positionWeek=7;
  }
  //конец определения дня недели последнего дня месяца

  $("#row_body_calendar").remove();

  $("<div/>", {"class": "row block_syle", "id": "row_body_calendar"}).appendTo("#calendar_col");
  $("<div/>", {"class": "col-md-12 col-lg-12", "id":"main_div_calendar"}).appendTo("#row_body_calendar");
  $("<table/>", {"class": "table table-bordered", "id": "table_calendar"}).appendTo("#main_div_calendar");

  //вывод дней недели
  $("<tr/>", {"id": "str_name_day"}).appendTo("#table_calendar");
  $("<td/>", {"class": "text-center", "text": "ПН"}).appendTo("#str_name_day");
  $("<td/>", {"class": "text-center", "text": "ВТ"}).appendTo("#str_name_day");
  $("<td/>", {"class": "text-center", "text": "СР"}).appendTo("#str_name_day");
  $("<td/>", {"class": "text-center", "text": "ЧТ"}).appendTo("#str_name_day");
  $("<td/>", {"class": "text-center", "text": "ПТ"}).appendTo("#str_name_day");
  $("<td/>", {"class": "text-center", "text": "СБ"}).appendTo("#str_name_day");
  $("<td/>", {"class": "text-center", "text": "ВС"}).appendTo("#str_name_day");
  //конец вывода дней недели

  //построение DOM отображения прошлого месяца
  $("<tr/>", {"id": "StringCalendar"+StringCalendar}).appendTo("#table_calendar");
  for($u = LastDay_previousMonth-firstDay_positionWeek+2; $u <= LastDay_previousMonth; $u++){
    $("<td/>", {"id": "StringCalendar"+StringCalendar+"ColumnCalendar"+ColumnCalendar, "class": "text-center table_price_nomber_buf", "text": $u}).appendTo("#StringCalendar"+StringCalendar);
    ColumnCalendar++;
  }
  //конец построения  DOM отображения прошлого месяца

  // построение DOM отображения текущего месяца
  for($i=1; $i<=lastDay; $i++){
    if(ColumnCalendar==7){
      StringCalendar++;
      $("<tr/>", {"id": "StringCalendar"+StringCalendar}).appendTo("#table_calendar");
      ColumnCalendar=0;
    }

    if((settingsYear==currentYear)&&($i==currentDay)&&(settingsMonth==currentMonth)){
      $("<td/>", {"data-date_count_task": count_task_this_data(settingsYear, settingsMonth, $i), "data-day": $i, "id": "StringCalendar"+StringCalendar+"ColumnCalendar"+ColumnCalendar, "class": "table_price_nomber current_day text-center"}).appendTo("#StringCalendar"+StringCalendar);
      $("<span/>", {"class": "calendar_text_date", "text": $i}).appendTo("#StringCalendar"+StringCalendar+"ColumnCalendar"+ColumnCalendar);
      $("<span/>", {"class": "calendar_text_date_task", "text": count_task_this_data(settingsYear, settingsMonth, $i)}).appendTo("#StringCalendar"+StringCalendar+"ColumnCalendar"+ColumnCalendar);
    }else{
      $("<td/>", {"data-date_count_task": count_task_this_data(settingsYear, settingsMonth, $i), "data-day": $i, "id": "StringCalendar"+StringCalendar+"ColumnCalendar"+ColumnCalendar, "class": "table_price_nomber text-center"}).appendTo("#StringCalendar"+StringCalendar);
      $("<span/>", {"class": "calendar_text_date", "text": $i}).appendTo("#StringCalendar"+StringCalendar+"ColumnCalendar"+ColumnCalendar);
      $("<span/>", {"class": "calendar_text_date_task", "text": count_task_this_data(settingsYear, settingsMonth, $i)}).appendTo("#StringCalendar"+StringCalendar+"ColumnCalendar"+ColumnCalendar);
    }
    ColumnCalendar++;
  }
  // построение DOM отображения текущего месяца

  // построения DOM отображения начало следующего месяца
  for($j=1; $j<(7 - lastDay_positionWeek + 1); $j++){
    $("<td/>", {"id": "StringCalendar"+StringCalendar+"ColumnCalendar"+ColumnCalendar, "class": "text-center table_price_nomber_buf", "text": $j}).appendTo("#StringCalendar"+StringCalendar);
    ColumnCalendar++;
  }
  //конец построения DOM отображения начала следующего месяца

}

function showTask(){

  $("#row_main_div_task").remove();

  $("<div/>", {"class": "row", "id":"row_main_div_task"}).appendTo("#task_col");
  $("<div/>", {"class": "col-md-1 col-lg-1"}).appendTo("#row_main_div_task");
  $("<div/>", {"class": "col-md-11 col-lg-11", "id":"main_div_task"}).appendTo("#row_main_div_task");
  $("<div/>", {"class": "row", "id":"row_task_start_label"}).appendTo("#main_div_task");
  $("<div/>", {"class": "col-md-8 col-lg-8", "id": "row_task_start_label_label"}).appendTo("#row_task_start_label");
  $("<div/>", {"class": "col-md-4 col-lg-4", "id":"row_task_start_label_icon"}).appendTo("#row_task_start_label");

  $("<p/>", {"class": "text-center", "text": "Задачи на: "+objectDay+"."+objectMonth+"."+objectYear}).appendTo("#row_task_start_label_label");
  $("<i/>", {"class": "fa fa-plus-circle fa-2x", "aria-hidden": "true", "id": "task_label_icon_1"}).appendTo("#row_task_start_label_icon");
  $("<i/>", {"class": "fa fa-times-circle fa-2x", "aria-hidden": "true", "id": "task_label_icon_2"}).appendTo("#row_task_start_label_icon");


  // вывод задач
  for($i = 0; $i < count_task_this_data(objectYear, objectMonth, objectDay); $i++){
    $("<div/>", {"class": "row", "id":"row_"+$i+"task"}).appendTo("#main_div_task");
    $("<div/>", {"class": "col-md-10 col-lg-10", "id": "task_block"+$i}).appendTo("#row_"+$i+"task");
    $("<div/>", {"class": "col-md-2 col-lg-2", "id": "task_block"+$i+"_icon"}).appendTo("#row_"+$i+"task");
    $("<p/>", {"text": tasks[objectYear][objectMonth+1][objectDay][$i]['content']}).appendTo("#task_block"+$i);
    $("<i/>", {"data-task_id": tasks[objectYear][objectMonth+1][objectDay][$i]['id'], "class": "fa fa-trash-o delete_task_icon", "aria-hidden": "true"}).appendTo("#task_block"+$i+"_icon");
  }
  // конец вывода задач
}

function GetMonthName(NomberMonth){
  var MonthName = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
  return MonthName[NomberMonth];
}

function count_task_this_data(year, month, day){
  var count_task = 0;
  if(count(tasks) !=0 ){
    if(count(tasks[year]) != 0){
      if(count(tasks[year][month+1]) != 0){
        if(count(tasks[year][month+1][day]) != 0){
          count_task = count(tasks[year][month+1][day]);
        }
      }
    }
  }
  return count_task;
}

function count(obj){
  var count = 0;
  for (var prs in obj){
    if (obj.hasOwnProperty(prs)) count++;
  }
  return count;
}
