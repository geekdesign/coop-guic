<?php

namespace App\Events;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Comptes;
use App\Repository\ComptesRepository;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Security;

class ComptesSubscriber implements EventSubscriberInterface{

    private $security;
    private $comptesRepository;

    public function __construct(Security $security, ComptesRepository $comptesRepository){
        $this->security = $security;
        $this->comptesRepository = $comptesRepository;
    }
    
    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['setDepForCompte', EventPriorities::PRE_VALIDATE]
        ];
    }

    public function setDepForCompte( ViewEvent $event) {
        $comptes = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();
        if($comptes instanceof Comptes  && $method === 'POST'){
            $user = $this->security->getUser();
            $depId = $user->getDepartement();
            $dep = $depId->getId();
            $comptes->setDepartement($depId);
            $comptes->setActif(true);
        }
    }
    
}