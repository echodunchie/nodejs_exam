module.exports = {
    "up": "CREATE TABLE `node_js`.`users` (`id` INT NOT NULL AUTO_INCREMENT , `first_name` VARCHAR(250) NOT NULL , `last_name` VARCHAR(250) NOT NULL , `address` VARCHAR(250) NOT NULL , `post_code` INT(250) NOT NULL , `phone_number` INT(250) NOT NULL , `email` VARCHAR(250) NOT NULL , `username` VARCHAR(250) NOT NULL , `password` VARCHAR(250) NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;",
    "down": "DROP TABLE users"
}