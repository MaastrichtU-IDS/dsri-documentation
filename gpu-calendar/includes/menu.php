<nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
      <div class="position-sticky pt-3">
        <ul class="nav flex-column">
          <li class="nav-item">
              <?php
              if(basename($_SERVER['PHP_SELF'])=="index.php"){
                  echo '<a class="nav-link active" aria-current="page" href="index.php">';
              }
              else{
                echo '<a class="nav-link" href="index.php">';
              }
              ?>
              <span data-feather="home"></span>
              Home
            </a>
          </li>
          <li class="nav-item">
          <?php
              if(basename($_SERVER['PHP_SELF'])=="index.php"){
                  echo '<a class="nav-link active" aria-current="page" href="index.php">';
              }
              else{
                echo '<a class="nav-link" aria-current="page" href="index.php">';
              }
              ?>
              <span data-feather="calendar"></span>
              Agenda
            </a>
          </li>
          <li class="nav-item">
          <?php
              if(basename($_SERVER['PHP_SELF'])=="new-reservation.php"){
                  echo '<a class="nav-link active" aria-current="page" href="new-reservation.php">';
              }
              else{
                echo '<a class="nav-link" aria-current="page" href="new-reservation.php">';
              }
              ?>
              <span data-feather="shopping-cart"></span>
              New reservation
            </a>
          </li>
          <li class="nav-item">
          <?php
              if(basename($_SERVER['PHP_SELF'])=="profile.php"){
                  echo '<a class="nav-link active" aria-current="page" href="profile.php">';
              }
              else{
                echo '<a class="nav-link" aria-current="page" href="profile.php">';
              }
              ?>
              <span data-feather="users"></span>
              Profile
            </a>
          </li>

        </ul>

      </div>
    </nav>