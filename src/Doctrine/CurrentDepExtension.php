<?php


namespace App\Doctrine;

use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\QueryCollectionExtensionInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\QueryItemExtensionInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use App\Entity\Bons;
use App\Entity\Categories;
use App\Entity\Comptes;
use App\Entity\Entreprises;
use App\Entity\Kwfs;
use App\Entity\Techniciens;
use App\Entity\Types;
use App\Entity\User;
use Doctrine\ORM\QueryBuilder;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;
use Symfony\Component\Security\Core\Security;

class CurrentDepExtension  implements QueryCollectionExtensionInterface, QueryItemExtensionInterface
{

    private $security;
    private $auth;

    public function __construct(Security $security, AuthorizationCheckerInterface $checker){
        $this->security = $security;
        $this->auth = $checker;
    }

    private function addWhere(QueryBuilder $queryBuilder, string $resourceClass){

        $user = $this->security->getUser();
        
        if(($resourceClass === Bons::class || $resourceClass === Comptes::class || $resourceClass === Entreprises::class || $resourceClass === Categories::class || $resourceClass === Types::class || $resourceClass === Techniciens::class || $resourceClass === Kwfs::class || $resourceClass === User::class) && $user instanceof User )
        {
            $dep = $user->getDepartement();
            $rootAlias = $queryBuilder->getRootAliases()[0];
            $queryBuilder->andWhere("$rootAlias.departement = :depId");
            $queryBuilder->setParameter("depId", $dep);
        }
    }

    public function applyToCollection(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, ?string $operationName = null)
    {
        $this->addWhere($queryBuilder, $resourceClass);
    }

    public function applyToItem(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, array $identifiers, ?string $operationName = null, array $context = [])
    {
        $this->addWhere($queryBuilder, $resourceClass);
    }
    
}
