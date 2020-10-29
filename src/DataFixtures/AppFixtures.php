<?php

namespace App\DataFixtures;

use App\Entity\Bons;
use App\Entity\Categories;
use App\Entity\Comptes;
use App\Entity\Departements;
use App\Entity\Entreprises;
use App\Entity\Etats;
use App\Entity\Kwfs;
use App\Entity\Pdvs;
use App\Entity\Techniciens;
use App\Entity\Types;
use App\Entity\User;
use DateTime;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class AppFixtures extends Fixture
{
    /**
     * L'encodeur de mot de passe
     * 
     * @var UserPasswordEncoderInterface
     */
    private $encoder;

    public function __construct(UserPasswordEncoderInterface $encoder)
    {
        $this->encoder = $encoder;
    }

    public function load(ObjectManager $manager)
    {
        $faker = Factory::create('fr_CH');

        $numBon = 1;

        $departement1 = new Departements();
        $departement1->setNom('Sécurité');

        $manager->persist($departement1);

        $departement2 = new Departements();
        $departement2->setNom('Total Store');

        $manager->persist($departement2);

        $departement3 = new Departements();
        $departement3->setNom('Test DEV');

        $manager->persist($departement3);

        $entrepriseArray=array();
        for ($e=0; $e < 100; $e++) { 
            $entreprise = new Entreprises();
            $entreprise ->setNom($faker->company)
                        ->setRue($faker->streetAddress)
                        ->setNpa($faker->postcode)
                        ->setLieu($faker->city)
                        ->setTelephone($faker->e164PhoneNumber)
                        ->setFax($faker->e164PhoneNumber)
                        ->setMail($faker->email)
                        ->setDepartement($faker->randomElement([$departement1, $departement2, $departement3]))
                        ->setSupprimer(false);

            array_push($entrepriseArray, $entreprise);            
         
            $manager->persist($entreprise);
        }

        $technicienArray=array();
        for ($t=0; $t < 20; $t++) { 
            $technicien = new Techniciens();
            $technicien ->setNom($faker->lastName())
                        ->setDepartement($faker->randomElement([$departement1, $departement2, $departement3]))
                        ->setPrenom($faker->firstName())
                        ->setMail($faker->email)
                        ->setTelephone($faker->PhoneNumber)
                        ->setActif(true);

            array_push($technicienArray, $technicien);            
            
            $manager->persist($technicien);
            
        }
        
        $admin = new User();
        $adminhash = $this->encoder->encodePassword($admin, "scpie");
        $admin  ->setUsername('scpie')
                ->setDepartement($departement3)
                ->setNom('Schütz')
                ->setPrenom('Pierre-Alain')
                ->setMail("schutz.pa@gmail.com")
                ->setPassword($adminhash)
                ->setSupprimer(false);
        $manager->persist($admin);

        $romain = new User();
        $romainhash = $this->encoder->encodePassword($romain, "rorom");
        $romain  ->setUsername('rorom')
                ->setDepartement($departement3)
                ->setNom('Rosset')
                ->setPrenom('Romain')
                ->setMail($faker->email)
                ->setPassword($romainhash)
                ->setSupprimer(false);
        $manager->persist($romain);

        $guic = new User();
        $guichash = $this->encoder->encodePassword($guic, "testguic");
        $guic  ->setUsername('test')
                ->setDepartement($departement3)
                ->setNom('Doe')
                ->setPrenom('John')
                ->setMail($faker->email)
                ->setPassword($guichash)
                ->setSupprimer(false);
        $manager->persist($guic);

        $userArray=array();
        for ($u=0; $u < 15; $u++) { 
            $user = new User();
            $hash = $this->encoder->encodePassword($user, "password");
            $user   ->setUsername($faker->userName)
                    ->setDepartement($faker->randomElement([$departement1, $departement2, $departement3]))
                    ->setNom($faker->firstName())
                    ->setPrenom($faker->lastName())
                    ->setMail($faker->email)
                    ->setPassword($hash)
                    ->setSupprimer(false);

            array_push($userArray, $user);        
            
            $manager->persist($user);
        }

        $compteArray=array();
        for ($c=0; $c < 50; $c++) { 
            $compte = new Comptes();
            $compte ->setNum($faker->numberBetween($min = 7000, $max = 9900))
                    ->setNom($faker->sentence($nbWords = 5, $variableNbWords = true))
                    ->setActif(true)
                    ->setDepartement($faker->randomElement([$departement1, $departement2, $departement3]));

            array_push($compteArray, $compte);

            $manager->persist($compte);
        }

        $categoriesArray=array();
        for ($cat=0; $cat < 15; $cat++) { 
            $categories = new Categories();
            $categories ->setNom($faker->sentence($nbWords = 2, $variableNbWords = true))
                        ->setActif(true)
                        ->setDepartement($faker->randomElement([$departement1, $departement2, $departement3]));
            
            array_push($categoriesArray, $categories);
            
            $manager->persist($categories);
        }

        $kwfArray=array();
        for ($k=0; $k < 15; $k++) { 
            $kwf = new Kwfs();
            $kwf    ->setNom($faker->lastName())
                    ->setDepartement($faker->randomElement([$departement1, $departement2, $departement3]))
                    ->setPrenom($faker->firstName())
                    ->setEmail($faker->email)
                    ->setSupprimer(false);

            array_push($kwfArray, $kwf);

            $manager->persist($kwf);
        }

        $typeArray=array();
        for ($t=0; $t < 15; $t++) { 
            $type = new Types();
            $type ->setNom($faker->sentence($nbWords = 2, $variableNbWords = true))
                        ->setActif(true)
                        ->setDepartement($faker->randomElement([$departement1, $departement2, $departement3]));
            array_push($typeArray, $type);
            
            $manager->persist($type);
        }

        $pdvArray=array();
        for ($p=0; $p < 180; $p++) { 
            $pdv = new Pdvs();

            $lieu = $faker->city;
            $nom = $lieu . " " . $faker->word;
            $prenomGerant = $faker->firstName;
            $nameGerant = $faker->lastName;
            $fullNameGerant = $nameGerant . " " .  $prenomGerant;
            $format = $faker->randomElement($array = array ('a','b','c')) . $faker->numberBetween($min = 150, $max = 3000);

            $pdv->setSap($faker->numberBetween($min = 1000, $max = 5800))
                ->setNom($nom)
                ->setRue($faker->streetAddress)
                ->setLieu($lieu)
                ->setNpa($faker->postcode)
                ->setTelephone($faker->e164PhoneNumber)
                ->setFax($faker->e164PhoneNumber)
                ->setGerant($fullNameGerant)
                ->setEmail($faker->email)
                ->setFormat($format)
                ->setSupprimer(false);
            
            
            array_push($pdvArray, $pdv);

                
            $manager->persist($pdv);
        }


        for ($b=0; $b < 150; $b++) { 
            $bon = new Bons;
            $remarque = $faker->text($maxNbChars = 100); 
            $bon->setCreatedAt($faker->dateTimeBetween($startDate = '-6 month', $endDate = 'now', $timezone = null))
                ->setDepartement($faker->randomElement([$departement1, $departement2, $departement3]))
                ->setTechnicien($faker->randomElement($technicienArray))
                ->setEntreprise($faker->randomElement($entrepriseArray))
                ->setCreatedBy($faker->randomElement($userArray))
                ->setType($faker->randomElement($typeArray))
                ->setCategorie($faker->randomElement($categoriesArray))
                ->setKwf($faker->randomElement($kwfArray))
                ->setPdv($faker->randomElement($pdvArray))  
                ->setSujet($faker->sentence($nbWords = 6, $variableNbWords = true))
                ->setDescription($faker->paragraph($nbSentences = 3, $variableNbSentences = true))
                ->setRemarque($faker->randomElement( [$remarque ,'']))
                ->setGarantie($faker->randomElement($array = array (false, true)))
                ->setNumCompte($faker->randomElement($compteArray))  
                ->setNumBon($numBon)
                ->setEtat($faker->randomElement(['ENVOYER', 'REALISER', 'FACTURER', 'PAYER', 'ANNULER' ]));

                $numBon++;
                
            $manager->persist($bon);
            
        }
        

        $manager->flush();
    }
}
