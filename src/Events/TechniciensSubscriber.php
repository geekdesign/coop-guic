<?php

namespace App\Events;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Techniciens;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Security;

class TechniciensSubscriber implements EventSubscriberInterface{

    private $security;

    public function __construct(Security $security){
        $this->security = $security;
    }
    
    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['setDepForTechniciens', EventPriorities::PRE_VALIDATE]
        ];
    }

    public function setDepForTechniciens( ViewEvent $event) {
        $techniciens = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();
        if($techniciens instanceof Techniciens  && $method === 'POST'){
            $user = $this->security->getUser();
            $depId = $user->getDepartement();
            $techniciens->setDepartement($depId);
            $techniciens->setActif(true);
        }
    }
    
}