CREATE TABLE IF NOT EXISTS `teachers` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `created_date` DATETIME NOT NULL,
  `updated_date` DATETIME NULL,
  `email` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE);

CREATE TABLE IF NOT EXISTS `students` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `created_date` DATETIME NOT NULL,
  `updated_date` DATETIME NULL,
  `email` VARCHAR(45) NOT NULL,
  `suspended` TINYINT NOT NULL,
  `suspended_date` DATETIME NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE);

CREATE TABLE IF NOT EXISTS `registrations` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `created_date` DATETIME NOT NULL,
  `updated_date` DATETIME NULL,
  `teacher_id` BIGINT NOT NULL,
  `student_id` BIGINT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_registrations_teachers_id_idx` (`teacher_id` ASC) VISIBLE,
  INDEX `fk_registrations_students_id_idx` (`student_id` ASC) VISIBLE,
  CONSTRAINT `fk_registrations_teachers_id`
    FOREIGN KEY (`teacher_id`)
    REFERENCES `teachers` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_registrations_students_id`
    FOREIGN KEY (`student_id`)
    REFERENCES `students` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
