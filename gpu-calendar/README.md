Please rename/copy `includes/config.example.php` to `includes/config.php` and fill in the database, database username and password. 

Create this additional table:

```sql
DROP TABLE `gpus`;

CREATE TABLE `gpus` (
  `gpuid` int NOT NULL AUTO_INCREMENT,
  `short_description` varchar(45) DEFAULT NULL,
  `description` varchar(80) DEFAULT NULL,
  PRIMARY KEY (`gpuid`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3;

LOCK TABLES `gpus` WRITE;

INSERT INTO `gpus` VALUES (1,'GPU 1 (V100)','GPU 1 Nvidia Tesla V100 32GB'),(2,'GPU 2 (V100)','GPU 2 Nvidia Tesla V100 32GB'),(3,'GPU 3 (V100)','GPU 3 Nvidia Tesla V100 32GB'),(4,'GPU 4 (V100)','GPU 4 Nvidia Tesla V100 32GB'),(5,'GPU 5 (V100)','GPU 5 Nvidia Tesla V100 32GB'),(6,'GPU 6 (V100)','GPU 6 Nvidia Tesla V100 32GB'),(7,'GPU 7 (V100)','GPU 7 Nvidia Tesla V100 32GB'),(8,'GPU 8 (V100)','GPU 8 Nvidia Tesla V100 32GB');

UNLOCK TABLES;
```

The calendar was tested with php 7.4

