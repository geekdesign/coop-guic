<?php

namespace App\Events;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Categories;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Security;

class CategoriesSubscriber implements EventSubscriberInterface{

    private $security;

    public function __construct(Security $security){
        $this->security = $security;
    }
    
    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['setDepForCategories', EventPriorities::PRE_VALIDATE]
        ];
    }

    public function setDepForCategories( ViewEvent $event) {
        $categories = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();
        if($categories instanceof Categories  && $method === 'POST'){
            $user = $this->security->getUser();
            $depId = $user->getDepartement();
            $categories->setDepartement($depId);
            $categories->setActif(true);
        }
    }
    
}