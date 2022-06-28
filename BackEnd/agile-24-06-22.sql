-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`cliente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`cliente` (
  `idcliente` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(100) NOT NULL,
  `cpf` VARCHAR(11) NOT NULL,
  `telefone` VARCHAR(10) NOT NULL,
  `sexo` VARCHAR(1) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `usuario` VARCHAR(45) NOT NULL,
  `senha` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idcliente`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`veiculo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`veiculo` (
  `id_veiculo` INT NOT NULL AUTO_INCREMENT,
  `veiculo` VARCHAR(45) NOT NULL,
  `marca` VARCHAR(45) NOT NULL,
  `ano` VARCHAR(45) NOT NULL,
  `placa` VARCHAR(45) NOT NULL,
  `modelo` VARCHAR(45) NOT NULL,
  `cliente_idcliente` INT NOT NULL,
  `imagem` LONGTEXT NULL,
  INDEX `fk_veiculo_cliente1_idx` (`cliente_idcliente` ASC) ,
  PRIMARY KEY (`id_veiculo`),
  CONSTRAINT `fk_veiculo_cliente1`
    FOREIGN KEY (`cliente_idcliente`)
    REFERENCES `mydb`.`cliente` (`idcliente`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`viagem`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`viagem` (
  `id_viagem` INT NOT NULL AUTO_INCREMENT,
  `viagem_idcliente` INT NOT NULL,
  `horario` VARCHAR(45) NOT NULL,
  `data` VARCHAR(45) NOT NULL,
  `espaco` VARCHAR(45) NOT NULL,
  `kg_max` VARCHAR(45) NOT NULL,
  `valor_km` VARCHAR(45) NOT NULL,
  `distancia_perc` VARCHAR(45) NOT NULL,
  `veiculo_id_veiculo` INT NOT NULL,
  PRIMARY KEY (`id_viagem`),
  INDEX `fk_viagem_veiculo1_idx` (`veiculo_id_veiculo` ASC) ,
  CONSTRAINT `fk_viagem_veiculo1`
    FOREIGN KEY (`veiculo_id_veiculo`)
    REFERENCES `mydb`.`veiculo` (`id_veiculo`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`origem_carga`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`origem_carga` (
  `id_origem_carga` INT NOT NULL AUTO_INCREMENT,
  `viagem_id` INT NOT NULL,
  `cidade_origem` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id_origem_carga`),
  CONSTRAINT `fk_viagem_origem`
    FOREIGN KEY (`viagem_id`)
    REFERENCES `mydb`.`viagem` (`id_viagem`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`end_cliente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`end_cliente` (
  `id_end_cliente` INT NOT NULL AUTO_INCREMENT,
  `cidade` VARCHAR(50) NOT NULL,
  `uf` VARCHAR(2) NOT NULL,
  `cep` VARCHAR(10) NOT NULL,
  `bairro` VARCHAR(45) NOT NULL,
  `numero` VARCHAR(6) NOT NULL,
  `rua` VARCHAR(45) NOT NULL,
  `cliente_id` INT NOT NULL,
  INDEX `fk_end_cliente_cliente_idx` (`cliente_id` ASC) ,
  PRIMARY KEY (`id_end_cliente`),
  CONSTRAINT `fk_end_cliente_cliente`
    FOREIGN KEY (`cliente_id`)
    REFERENCES `mydb`.`cliente` (`idcliente`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`destino_carga`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`destino_carga` (
  `id_destino_carga` INT NOT NULL AUTO_INCREMENT,
  `viagem_id` INT NOT NULL,
  `cidade_destino` VARCHAR(50) NOT NULL,
  INDEX `fk_destino_carga_viagem1_idx` (`viagem_id` ASC) ,
  PRIMARY KEY (`id_destino_carga`),
  CONSTRAINT `fk_destino_carga_viagem1`
    FOREIGN KEY (`viagem_id`)
    REFERENCES `mydb`.`viagem` (`id_viagem`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`frete`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`frete` (
  `id_frete` INT NOT NULL AUTO_INCREMENT,
  `valor_total` FLOAT NOT NULL,
  `viagem_id` INT NOT NULL,
  INDEX `fk_frete_viagem1_idx` (`viagem_id` ASC) ,
  PRIMARY KEY (`id_frete`),
  CONSTRAINT `fk_frete_viagem1`
    FOREIGN KEY (`viagem_id`)
    REFERENCES `mydb`.`viagem` (`id_viagem`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
