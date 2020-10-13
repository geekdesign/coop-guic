<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20201011124920 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE bons DROP FOREIGN KEY FK_C1920A26D5E86FF');
        $this->addSql('DROP INDEX IDX_C1920A26D5E86FF ON bons');
        $this->addSql('ALTER TABLE bons ADD etat VARCHAR(255) DEFAULT NULL, DROP etat_id');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE bons ADD etat_id INT DEFAULT NULL, DROP etat');
        $this->addSql('ALTER TABLE bons ADD CONSTRAINT FK_C1920A26D5E86FF FOREIGN KEY (etat_id) REFERENCES etats (id)');
        $this->addSql('CREATE INDEX IDX_C1920A26D5E86FF ON bons (etat_id)');
    }
}
