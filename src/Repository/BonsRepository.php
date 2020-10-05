<?php

namespace App\Repository;

use App\Entity\Bons;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Bons|null find($id, $lockMode = null, $lockVersion = null)
 * @method Bons|null findOneBy(array $criteria, array $orderBy = null)
 * @method Bons[]    findAll()
 * @method Bons[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class BonsRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Bons::class);
    }

    // /**
    //  * @return Bons[] Returns an array of Bons objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('b')
            ->andWhere('b.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('b.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Bons
    {
        return $this->createQueryBuilder('b')
            ->andWhere('b.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
