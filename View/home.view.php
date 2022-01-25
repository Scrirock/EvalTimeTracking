<?php
if (isset($_SESSION['username'])) { ?>
    <input type="hidden" value="<?= $_SESSION['username'] ?>">
<?php }