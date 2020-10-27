<?php

namespace App\Events;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Bons;
use App\Repository\BonsRepository;
use DateTime;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Security;

class BonsUserSubscriber implements EventSubscriberInterface{

    private $security;
    private $bonsRepository;

    public function __construct(Security $security, BonsRepository $bonsRepository){
        $this->security = $security;
        $this->bonsRepository = $bonsRepository;
    }
    
    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['setUserForBons', EventPriorities::PRE_VALIDATE]
        ];
    }

    public function setUserForBons( ViewEvent $event) {
        $bons = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();
        if($bons instanceof Bons  && $method === 'POST'){
            $user = $this->security->getUser();
            $nextNum = $this->bonsRepository->findNextNumBon($user);
            $depId = $user->getDepartement();
            $dep = $depId->getId();
            $now = new DateTime;
            $bons->setEtat('ENVOYER');
            $bons->setCreatedAt($now);
            $bons->setCreatedBy($user);
            $bons->setDepartement($depId);
            $bons->setNumBon($dep.$nextNum);
        }
    }
    
}