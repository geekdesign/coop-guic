<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20201004204054 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE bons (id INT AUTO_INCREMENT NOT NULL, created_by_id INT NOT NULL, technicien_id INT DEFAULT NULL, entreprise_id INT NOT NULL, pdv_id INT NOT NULL, type_id INT NOT NULL, categorie_id INT NOT NULL, kwf_id INT NOT NULL, num_compte_id INT DEFAULT NULL, etat_id INT DEFAULT NULL, created_at DATETIME NOT NULL, sujet LONGTEXT NOT NULL, description LONGTEXT DEFAULT NULL, remarque LONGTEXT DEFAULT NULL, garantie TINYINT(1) DEFAULT NULL, num_credit VARCHAR(100) DEFAULT NULL, code_sap VARCHAR(255) DEFAULT NULL, prix_ht INT DEFAULT NULL, prix_ttc INT DEFAULT NULL, closed_at DATETIME DEFAULT NULL, supprimer TINYINT(1) DEFAULT NULL, INDEX IDX_C1920A26B03A8386 (created_by_id), INDEX IDX_C1920A2613457256 (technicien_id), INDEX IDX_C1920A26A4AEAFEA (entreprise_id), INDEX IDX_C1920A261069E8D (pdv_id), INDEX IDX_C1920A26C54C8C93 (type_id), INDEX IDX_C1920A26BCF5E72D (categorie_id), INDEX IDX_C1920A261F4ED618 (kwf_id), INDEX IDX_C1920A26801B12FC (num_compte_id), INDEX IDX_C1920A26D5E86FF (etat_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE bons ADD CONSTRAINT FK_C1920A26B03A8386 FOREIGN KEY (created_by_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE bons ADD CONSTRAINT FK_C1920A2613457256 FOREIGN KEY (technicien_id) REFERENCES techniciens (id)');
        $this->addSql('ALTER TABLE bons ADD CONSTRAINT FK_C1920A26A4AEAFEA FOREIGN KEY (entreprise_id) REFERENCES entreprises (id)');
        $this->addSql('ALTER TABLE bons ADD CONSTRAINT FK_C1920A261069E8D FOREIGN KEY (pdv_id) REFERENCES pdvs (id)');
        $this->addSql('ALTER TABLE bons ADD CONSTRAINT FK_C1920A26C54C8C93 FOREIGN KEY (type_id) REFERENCES types (id)');
        $this->addSql('ALTER TABLE bons ADD CONSTRAINT FK_C1920A26BCF5E72D FOREIGN KEY (categorie_id) REFERENCES categories (id)');
        $this->addSql('ALTER TABLE bons ADD CONSTRAINT FK_C1920A261F4ED618 FOREIGN KEY (kwf_id) REFERENCES kwfs (id)');
        $this->addSql('ALTER TABLE bons ADD CONSTRAINT FK_C1920A26801B12FC FOREIGN KEY (num_compte_id) REFERENCES comptes (id)');
        $this->addSql('ALTER TABLE bons ADD CONSTRAINT FK_C1920A26D5E86FF FOREIGN KEY (etat_id) REFERENCES etats (id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE bons');
    }
}
