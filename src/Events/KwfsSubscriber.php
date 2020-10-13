<?php

namespace App\Events;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Kwfs;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Security;

class KwfsSubscriber implements EventSubscriberInterface{

    private $security;

    public function __construct(Security $security){
        $this->security = $security;
    }
    
    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['setDepForKwfs', EventPriorities::PRE_VALIDATE]
        ];
    }

    public function setDepForKwfs( ViewEvent $event) {
        $kwfs = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();
        if($kwfs instanceof Kwfs  && $method === 'POST'){
            $user = $this->security->getUser();
            $depId = $user->getDepartement();
            $kwfs->setDepartement($depId);
            $kwfs->setSupprimer(false);
        }
    }
    
}