<?php


namespace App\Events;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Departements;
use App\Entity\User;
use App\Repository\BonsRepository;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\GetResponseForControllerResultEvent;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Security;


class BonsNumSubscriber implements EventSubscriberInterface
{
    private $security;
    private $repository;

    public function __construct(Security $security, BonsRepository $repository)
    {
        $this->security = $security;
        $this->repository = $repository;
    }

    public function findLastNumBon(User $user){
        return $this->createQueryBuilder("i")
                    ->select("numBon")
                    ->join("i.user", "d")
                    ->where("d = :user")
                    ->setParameter("user", $user)
                    ->orderBy("i.numBon", "DESC")
                    ->setMaxResults(1)
                    ->getQuery()
                    ->getSingleScalarResult();
    }


    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['setNumBonForBons', EventPriorities::PRE_VALIDATE]
        ];
    }

    public function setNumBonForBons( ViewEvent $event) {
        // dd($this->repository->findLastNumBon($this->security->getUser()));
    }

} 