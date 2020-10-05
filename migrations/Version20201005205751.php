<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20201005205751 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE types ADD departement_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE types ADD CONSTRAINT FK_59308930CCF9E01E FOREIGN KEY (departement_id) REFERENCES departements (id)');
        $this->addSql('CREATE INDEX IDX_59308930CCF9E01E ON types (departement_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE types DROP FOREIGN KEY FK_59308930CCF9E01E');
        $this->addSql('DROP INDEX IDX_59308930CCF9E01E ON types');
        $this->addSql('ALTER TABLE types DROP departement_id');
    }
}
