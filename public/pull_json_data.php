<?php

  //--------------------------------------------------------\\
  // comments for those who may want to edit this file_name \\
  //--------------------------------------------------------\\

  // this includes a db connection script. if you dont want to use it,
  // copy the scripts contents into here and make changes (also remove the include)

  include "db_connect.php";

  // this variable reads in data sent from the client and pulls the
  // surveyID being requested. The request MUST use POST and it MUST have
  // a name of 'ID' for this to work.

  $ID = (isset($_POST['ID'])) ? $_POST['ID'] : "";
  //$ID = "1"; // test value

  // name of the file where everything will be saved to

	$file_name = "r1.json";

  // try/catch that runs all code that fetches info from db

	try {
    // calls checkID function, which will return the valid sql statement
  	$stmt = $connection->prepare(checkID($ID));
		$stmt->execute();

    // this fetches all results and formats them into an associative array

		$result = $stmt->fetchall(PDO::FETCH_ASSOC);

    // calls generateFile to check if file exists and create it

		generateFile($file_name);

    // this opens the file we made in the above if/else block
    // it opens it in append mode, which means that it will add stuff to
    // the end of the file

		$fp = fopen($file_name, 'a');

    // this sets variable equal to whatever the output of jsonProcess is
    // but it formats it as an associative array

		$json_output = json_decode(jsonProcess($result), true);

    // this writes the above variable into the file created earlier
    // it converts the data as a json array, and formats it in a pretty, easy
    // to read string

		fwrite($fp, json_encode($json_output, JSON_PRETTY_PRINT));
		fclose($fp);

		// uncomment the next line for testing purposes
		//echo "<pre>" . file_get_contents('r1.json') . "</pre>";

		$connection = NULL;
	} catch (PDOException $e) {
		echo "PHP Load error: ".$e->getMessage();
  } catch (Exception $e) {
    echo "Message: ".$e->getMessage();
  }


  // this function processes the output from the database

	function jsonProcess ($input) {
    $new_input = parseData($input);
		$inputValue = '';

    // this goes through each row from the db, converts it to a string,
    // then puts it into an associative array

		foreach($new_input as $row) {
			$data[] = array(json_encode($row));
		}

    // this loops through the associative array above and converts each key/value
    // pair into a string

		foreach($data as $k=>$v) {
			$inputValue = $inputValue . implode($v);
		}

    // it then returns a string that meets formal JSON requirements
    // (copy/paste contents of json file into this validator to see that it is
    // valid: https://jsonlint.com/)

		return preg_replace("(}{)", "}, {", preg_replace("(^{)", "[ {",
            preg_replace("(}$)", "} ]", stripslashes(str_replace("\"{", "{",
            str_replace("}\"", "}", $inputValue))))));
	}

  function parseData($input) {
    $field = 'answerJSON';
    $newKey = array('Division', 'Course_ID', 'Course_Prefix');
    for($i = 0; $i < count($input); $i++) {
      for($j = 0; $j < 3; $j++) {
        $q = 'question' . ($j + 1);
        $answerOutput = json_decode($input[$i][$field], true);
        $new_keyVal = $answerOutput[$q];
        $input[$i] += array($newKey[$j] => $new_keyVal);
      }
      $input[$i] += array('Share' => $answerOutput['question17']);
    }
    return $input;
  }

  // this function returns 1 of 2 sqlite statements that joins several db tables
  // the USR_JOIN_ANS_JOIN_SUR is the lynchpin here, as it contains
  // ids from the other three tables, and it is what links everything together

  function checkID($input) {
  // returns individual surveyID
  $sql1 = "SELECT d.surveyName, b.name, b.email, d.surveyJSON, c.answerJSON, c.complete, c.time_complete
			FROM USR_JOIN_ANS_JOIN_SUR a
			JOIN USERS b
			ON a.userID = b.userID
			LEFT JOIN ANSWER c
			ON a.answerID = c.answerID
			JOIN SURVEY d
			ON a.surveyID = d.surveyID
			WHERE d.surveyID = '$input';";

  // returns all surveyIDs
  $sql2 = "SELECT d.surveyName, b.name, b.email, d.surveyJSON, c.answerJSON, c.complete, c.time_complete
			FROM USR_JOIN_ANS_JOIN_SUR a
			JOIN USERS b
			ON a.userID = b.userID
			LEFT JOIN ANSWER c
			ON a.answerID = c.answerID
			JOIN SURVEY d
			ON a.surveyID = d.surveyID
			WHERE d.surveyID LIKE '%';";

	// this tests if $ID is an integer or numeric or if $ID is the string 'all'
	// if $ID is int/numeric, then it will use sql that will search
	// for that specific ID; if $ID is the string 'all', it will use a different
	// sql statement that will perform a wildcard search of all surveyIDs in the DB,
	// and if $ID is neither of these, an error is thrown

      if ((is_int($input) || is_numeric(trim($input))) && (int)$input > 0) {
      	return $sql1;
      } else if (strtolower(trim($input)) == 'all') {
      	return $sql2;
      } else {
        throw new Exception("Input error - values can only be positive integers or the key word 'all'");
      }
  }

    // this function looks to see if file exists; if it does exist, it will
    // delete it (that is what unlink does) and then create an empty file (that is
    // what touch does). otherwise, the file is created

    function generateFile($name) {
    	if (file_exists($name)) {
    		unlink($name);
    		touch($name);
    	} else {
    		touch($name);
    	}
    }

?>
