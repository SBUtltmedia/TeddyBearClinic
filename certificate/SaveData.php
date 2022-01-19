<?php
$file = "players.csv";
print "hi ${_GET['name']}";
$name = $_GET['name'];
$institution = $_GET['institution'];
$contents = "$name,$institution\n";
file_put_contents($file, $contents, FILE_APPEND | LOCK_EX);
