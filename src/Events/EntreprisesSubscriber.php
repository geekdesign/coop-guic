<?php

namespace App\Events;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Entreprises;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Security;

class EntreprisesSubscriber implements EventSubscriberInterface{

    private $security;

    public function __construct(Security $security){
        $this->security = $security;
    }
    
    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['setDepForEntreprises', EventPriorities::PRE_VALIDATE]
        ];
    }

    public function setDepForEntreprises( ViewEvent $event) {
        $entreprises = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();
        if($entreprises instanceof Entreprises  && $method === 'POST'){
            $user = $this->security->getUser();
            $depId = $user->getDepartement();
            $entreprises->setDepartement($depId);
            $entreprises->setSupprimer(false);
        }
    }
    
}