<?php

namespace App\Events;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Pdvs;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Security;

class PdvsSubscriber implements EventSubscriberInterface{
    
    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['setDepForPdvs', EventPriorities::PRE_VALIDATE]
        ];
    }

    public function setDepForPdvs( ViewEvent $event) {
        $pdvs = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();
        if($pdvs instanceof Pdvs  && $method === 'POST'){
            $pdvs->setSupprimer(false);
        }
    }
    
}