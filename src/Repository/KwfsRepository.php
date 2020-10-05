<?php

namespace App\Repository;

use App\Entity\Kwfs;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Kwfs|null find($id, $lockMode = null, $lockVersion = null)
 * @method Kwfs|null findOneBy(array $criteria, array $orderBy = null)
 * @method Kwfs[]    findAll()
 * @method Kwfs[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class KwfsRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Kwfs::class);
    }

    // /**
    //  * @return Kwfs[] Returns an array of Kwfs objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('k')
            ->andWhere('k.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('k.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Kwfs
    {
        return $this->createQueryBuilder('k')
            ->andWhere('k.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
