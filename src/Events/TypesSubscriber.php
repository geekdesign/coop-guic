<?php

namespace App\Events;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Types;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Security;

class TypesSubscriber implements EventSubscriberInterface{

    private $security;

    public function __construct(Security $security){
        $this->security = $security;
    }
    
    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['setDepForTypes', EventPriorities::PRE_VALIDATE]
        ];
    }

    public function setDepForTypes( ViewEvent $event) {
        $types = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();
        if($types instanceof Types  && $method === 'POST'){
            $user = $this->security->getUser();
            $depId = $user->getDepartement();
            $types->setDepartement($depId);
            $types->setActif(true);
        }
    }
    
}