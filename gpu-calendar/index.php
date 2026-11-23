<?php
require_once('includes/config.php');
#print_r($attributes);

// Escape any value before printing it into HTML (text or attribute).
function e($value) {
    return htmlspecialchars((string)$value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

// Week navigation: users may view the current week, the previous week, and any future week.
$currweek = strtotime('monday this week');
$minweek  = strtotime('monday last week');   // earliest week allowed

$weekstart = $currweek;
if (isset($_GET['week'])) {
    $w = filter_var($_GET['week'], FILTER_VALIDATE_INT);
    if ($w === false) { echo "<img src=\"images/bobby.png\">"; exit; }
    $weekstart = strtotime('monday this week', $w);  // snap to Monday 00:00 (avoids DST drift)
}
if ($weekstart < $minweek) {
    $weekstart = $minweek;
}

$prevweek = strtotime('monday last week', $weekstart);
$nextweek = strtotime('monday next week', $weekstart);
?>

<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="Mark Otto, Jacob Thornton, and Bootstrap contributors">
    <meta name="generator" content="Hugo 0.88.1">
    <title><?php echo e($app_title); ?></title>


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
  <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#"><?php echo e($app_title); ?></a>
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
      <p>Select week</p>
      <?php if ($weekstart > $minweek): ?>
        <button class="btn btn-secondary" type="button" aria-expanded="false" onclick="window.location.href='index.php?week=<?php echo $prevweek ?>';">
      &lt;&lt;&lt;
      </button>
      <?php else: ?>
        <button class="btn btn-secondary" type="button" aria-expanded="false" disabled>
      &lt;&lt;&lt;
      </button>
      <?php endif; ?>
      <button class="btn btn-secondary" type="button" aria-expanded="false" onclick="window.location.href='index.php?week=<?php echo $currweek ?>';">
      <?php echo date( 'Y-m-d',$weekstart) . " to ". date( 'Y-m-d', strtotime('+6 days', $weekstart))?>
      </button>
      <button class="btn btn-secondary" type="button" aria-expanded="false" onclick="window.location.href='index.php?week=<?php echo $nextweek ?>';">
      &gt;&gt;&gt;
      </button>
      </div>
      <br />

      <?php
      $weekend = $nextweek;

      $monday    = date( 'Y-m-d', $weekstart );
      $tuesday   = date( 'Y-m-d', strtotime('+1 day',  $weekstart) );
      $wednesday = date( 'Y-m-d', strtotime('+2 days', $weekstart) );
      $thursday  = date( 'Y-m-d', strtotime('+3 days', $weekstart) );
      $friday    = date( 'Y-m-d', strtotime('+4 days', $weekstart) );
      $saturday  = date( 'Y-m-d', strtotime('+5 days', $weekstart) );
      $sunday    = date( 'Y-m-d', strtotime('+6 days', $weekstart) );

      ?>
      <table class="table table-bordered table-sm" id="table">
        <thead>
        <tr>
          <th>GPU</th>
          <th colspan=1>Monday (<?=$monday?>)</th>
          <th colspan=1>Tuesday (<?=$tuesday?>)</th>
          <th colspan=1>Wednesday (<?=$wednesday?>)</th>
          <th colspan=1>Thursday (<?=$thursday?>)</th>
          <th colspan=1>Friday (<?=$friday?>)</th>
          <th colspan=1>Saturday (<?=$saturday?>)</th>
          <th colspan=1>Sunday (<?=$sunday?>)</th>
        </tr>
        </thead>
        <tbody>
        <?php
        $sql = "SELECT * FROM gpus";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
          while($row = $result->fetch_assoc()) {
            $gpuid = (int)$row['gpuid'];
            echo "<tr><td>" . e($row["short_description"]) . "</td>";
            $previousend = 0;
            $previousbegin = 0;
            $days = 7;
            for ($x = 0; $x < $days; $x++) {
              $tdtime = $weekstart + ($x*3600*24);
              $reservation = 0;
              $sql2 = "SELECT * FROM gpubooking WHERE gpu_id=$gpuid AND DATE(FROM_UNIXTIME($tdtime)) BETWEEN DATE(starting_date) AND DATE(ending_date)";
              $result2 = $conn->query($sql2);
              if ($result2->num_rows > 0) {
                while($row2 = $result2->fetch_assoc()) {
                  // Normalize the booking dates to the start of the day
                  $startDate = strtotime(date('Y-m-d', strtotime($row2['starting_date'])));
                  $endDate = strtotime(date('Y-m-d', strtotime($row2['ending_date']))) + (3600 * 24);

                  // Calculate colspan
                  if($startDate < $weekstart){
                    $colspan = ceil(($endDate - $weekstart) / (3600 * 24));
                      if($endDate > ($weekstart + (3600 * 24 * 6))){
                        $colspan = 7;
                    }
                  }
                  else{
                    $colspan = ceil(($endDate - $startDate) / (3600 * 24));
                      if($endDate > ($weekstart + (3600 * 24 * 6))){
                        $colspan = 7 - $x;
                    }
                  }

                  $color = "#0077ff;";
                  if ($previousend > $startDate){
                    $color = "#ff0000;";
                  }

                  $pid = e($row2['project_id']);
                  echo "<td colspan=\"" . (int)$colspan . "\" style=\"background-color: " . $color . "\" data-bs-toggle=\"tooltip\" title=\"begin reservation: " . date('Y-m-d', strtotime($row2['starting_date'])) . "
end reservation: " . date('Y-m-d', strtotime($row2['ending_date'])) . "
project: " . $pid . "\"><p style=\"font-size: 12px;\">" . $pid . "</p></td>";

                  if($colspan > 1){
                  $x += $colspan - 1;
                  }

                  $reservation = 1;
                  $previousbegin = $startDate;
                  $previousend = $endDate;
                }
              }

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

      <p> Reservation starts and ends at 09:00 CEST </p>
      </div>
    </main>
  </div>
</div>


<script src="js/bootstrap.bundle.min.js"></script>

<script src="https://cdn.jsdelivr.net/npm/feather-icons@4.28.0/dist/feather.min.js" integrity="sha384-uO3SXW5IuS1ZpFPKugNNWqTZRRglnUJK6UAZ/gxOX80nxEkN9NcGZTftn6RzhGWE" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/chart.js@2.9.4/dist/Chart.min.js" integrity="sha384-zNy6FEbO50N+Cg5wap8IKA4M/ZnLJgzc6w2NqACZaK0u0FXfOWRRJOnQtpZun8ha" crossorigin="anonymous"></script>
<script src="js/dashboard.js"></script>
  </body>
</html>