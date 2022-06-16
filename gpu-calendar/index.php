<?php
require_once('includes/config.php');
#print_r($attributes);
if(isset($_GET['week']) && !is_numeric($_GET['week'])){echo "<img src=\"images/bobby.png\">"; exit;}
?>

<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="Mark Otto, Jacob Thornton, and Bootstrap contributors">
    <meta name="generator" content="Hugo 0.88.1">
    <title><?php echo $app_title; ?></title>


    <!-- Bootstrap core CSS -->
<link href="css/bootstrap.min.css" rel="stylesheet">

    <style>
      .bd-placeholder-img {
        font-size: 1.125rem;
        text-anchor: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
      }

      @media (min-width: 768px) {
        .bd-placeholder-img-lg {
          font-size: 3.5rem;
        }
      }
      td.selected {
    background-color: blue;
      }
      .table td {
    text-align: center;
}
.tooltip-inner {
    white-space:pre-wrap;
}
    </style>

    
    <!-- Custom styles for this template -->
    <link href="css/dashboard.css" rel="stylesheet">
    <script src="https://code.jquery.com/jquery-2.1.3.min.js" integrity="sha256-ivk71nXhz9nsyFDoYoGf2sbjrR9ddh+XDkCcfZxjvcM=" crossorigin="anonymous"></script>
    
  </head>
  <body>
  
  <script>
      var table = $("#table");    

var isMouseDown = false;
var startRowIndex = null;
var startCellIndex = null;

function selectTo(cell) {
    
    var row = cell.parent();    
    var cellIndex = cell.index();
    var rowIndex = row.index();
    
    var rowStart, rowEnd, cellStart, cellEnd;
    
    if (rowIndex < startRowIndex) {
        rowStart = rowIndex;
        rowEnd = startRowIndex;
    } else {
        rowStart = startRowIndex;
        rowEnd = rowIndex;
    }
    
    if (cellIndex < startCellIndex) {
        cellStart = cellIndex;
        cellEnd = startCellIndex;
    } else {
        cellStart = startCellIndex;
        cellEnd = cellIndex;
    }        
    
    for (var i = rowStart; i <= rowEnd; i++) {
        var rowCells = table.find("tr").eq(i).find("td");
        for (var j = cellStart; j <= cellEnd; j++) {
            rowCells.eq(j).addClass("selected");
        }        
    }
}

table.find("td").mousedown(function (e) {
    isMouseDown = true;
    var cell = $(this);

    table.find(".selected").removeClass("selected"); // deselect everything
    
    if (e.shiftKey) {
        selectTo(cell);                
    } else {
        cell.addClass("selected");
        startCellIndex = cell.index();
        startRowIndex = cell.parent().index();
    }
    return false; // prevent text selection
})
.mouseover(function () {
  
    if (!isMouseDown) return;
    table.find(".selected").removeClass("selected");
    selectTo($(this));

})
.bind("selectstart", function () {
    return false;
});

$(document).mouseup(function () {
    isMouseDown = false;
});
      </script>

<!--<header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
  <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#"><?php echo $app_title; ?></a>
  <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="navbar-nav">
    <div class="nav-item text-nowrap">
      <a class="nav-link px-3" href="#">Sign out</a>
    </div>
  </div>
</header>-->

<div class="container-fluid">
  <div class="row"><!--
<?php include('includes/menu.php'); ?>
-->

    <main class="col-md-9 col-lg-10 px-md-4">
      <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Agenda</h1>
      </div>
      <div class="col-md-3">
      
      <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
          Select week
        </button>
        <?php 
        $thisweek = strtotime( 'monday this week' );
        ?>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li><a class="dropdown-item" href="index.php"><?php echo date( 'Y-m-d',$thisweek) . " to ". date( 'Y-m-d',$thisweek + 86400*7)?></a></li>
          <li><a class="dropdown-item" href="index.php?week=<?php echo ($thisweek + 604800) ?>"><?php echo date( 'Y-m-d',$thisweek + 436800) . " to ". date( 'Y-m-d',$thisweek + 604800 + 86400*6)?></a></li>
          <li><a class="dropdown-item" href="index.php?week=<?php echo ($thisweek + 1209600) ?>"><?php echo date( 'Y-m-d',$thisweek + 1209600) . " to ". date( 'Y-m-d',$thisweek + 1209600 + 86400*6)?></a></li>
          <li><a class="dropdown-item" href="index.php?week=<?php echo ($thisweek + 1814400) ?>"><?php echo date( 'Y-m-d',$thisweek + 1814400) . " to ". date( 'Y-m-d',$thisweek + 1814400 + 86400*6)?></a></li>
        </ul>
      </div>
      <br />

      <?php

      if(isset($_GET['week'])) {
        $weekstart = $_GET['week'];
      }
        else {
          $weekstart = strtotime( 'monday this week' );
        }
      $weekend = $weekstart + 604800;


      $monday = date( 'Y-m-d', $weekstart );
      $tuesday    = date( 'Y-m-d', $weekstart + 86400 );
      $wednesday = date( 'Y-m-d', $weekstart + 86400*2);
      $thursday = date( 'Y-m-d', $weekstart + 86400*3);
      $friday = date( 'Y-m-d', $weekstart + 86400*4);
      $saturday = date( 'Y-m-d', $weekstart + 86400*5);
      $sunday = date( 'Y-m-d', $weekstart + 86400*6);

      ?>
      <table class="table table-bordered table-sm" id="table">
        <thead>
        <tr>
          <th>GPU</th>
          <th colspan=24>Monday (<?=$monday?>)</th>
          <th colspan=24>Tuesday (<?=$tuesday?>)</th>
          <th colspan=24>Wednesday (<?=$wednesday?>)</th>
          <th colspan=24>Thursday (<?=$thursday?>)</th>
          <th colspan=24>Friday (<?=$friday?>)</th>
          <th colspan=24>Saturday (<?=$saturday?>)</th>
          <th colspan=24>Sunday (<?=$sunday?>)</th>
        </tr>
        </thead>
        <tbody>
        <?php
        $sql = "SELECT * FROM gpus";
        $result = $conn->query($sql);
        
        if ($result->num_rows > 0) {
          while($row = $result->fetch_assoc()) {
            $gpuid = $row['gpuid'];
            echo "<tr><td>" . $row["short_description"] . "</td>";
            
            $hours=168;
            for ($x = 0; $x <= $hours; $x++) {
              $tdtime = $weekstart + ($x*3600);
              $reservation=0;
              $sql2 = "SELECT * FROM gpubooking WHERE gpu_id=$gpuid AND FROM_UNIXTIME($tdtime) >= starting_date AND FROM_UNIXTIME($tdtime) <= ending_date";
              $result2 = $conn->query($sql2);
              if ($result2->num_rows > 0) {
                while($row2 = $result2->fetch_assoc()) {
                  //calculate colspan
                  if(strtotime($row2['starting_date'])<$weekstart){
                    $colspan = (strtotime($row2['ending_date'])-$weekstart)/3600;
                  }
                  else{
                    $colspan = (strtotime($row2['ending_date'])-strtotime($row2['starting_date']))/3600;
                  }

                  echo "<td colspan=" . $colspan . " style=\"background-color: #0077ff;\" data-bs-toggle=\"tooltip\" data-bs-html=\"true\" title=\"begin reservation: " . $row2['starting_date'] . "
end reservation: " . $row2['ending_date'] . "
project: " . $row2['project_id'] . "
reserved by: " . $row2['user_email'] . "\"><p style=\"font-size: 12px;\">" . $row2['project_id'] . "</p></td>";

                  $x = $x + $colspan;
                  $reservation=1;
                }}


              if($reservation==0){echo "<td></td>";}
            } 
            
          echo "</tr>";


          }
        } else {
          ///no results
        }

        ?>

      </tbody>
      </table>
      </div>
    </main>
  </div>
</div>


<script src="js/bootstrap.bundle.min.js"></script>

<script src="https://cdn.jsdelivr.net/npm/feather-icons@4.28.0/dist/feather.min.js" integrity="sha384-uO3SXW5IuS1ZpFPKugNNWqTZRRglnUJK6UAZ/gxOX80nxEkN9NcGZTftn6RzhGWE" crossorigin="anonymous"></script><script src="https://cdn.jsdelivr.net/npm/chart.js@2.9.4/dist/Chart.min.js" integrity="sha384-zNy6FEbO50N+Cg5wap8IKA4M/ZnLJgzc6w2NqACZaK0u0FXfOWRRJOnQtpZun8ha" crossorigin="anonymous"></script><script src="js/dashboard.js"></script>
  </body>
</html>
