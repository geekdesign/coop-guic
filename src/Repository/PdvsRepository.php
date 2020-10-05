<?php

namespace App\Repository;

use App\Entity\Pdvs;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Pdvs|null find($id, $lockMode = null, $lockVersion = null)
 * @method Pdvs|null findOneBy(array $criteria, array $orderBy = null)
 * @method Pdvs[]    findAll()
 * @method Pdvs[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class PdvsRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Pdvs::class);
    }

    // /**
    //  * @return Pdvs[] Returns an array of Pdvs objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('p.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Pdvs
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
