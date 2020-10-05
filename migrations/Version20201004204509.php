<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20201004204509 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE bons ADD departement_id INT NOT NULL');
        $this->addSql('ALTER TABLE bons ADD CONSTRAINT FK_C1920A26CCF9E01E FOREIGN KEY (departement_id) REFERENCES departements (id)');
        $this->addSql('CREATE INDEX IDX_C1920A26CCF9E01E ON bons (departement_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE bons DROP FOREIGN KEY FK_C1920A26CCF9E01E');
        $this->addSql('DROP INDEX IDX_C1920A26CCF9E01E ON bons');
        $this->addSql('ALTER TABLE bons DROP departement_id');
    }
}
