<?php


namespace App\Events;

use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;

class JwtCreatedSubscriber {

    public function updateJwtData(JWTCreatedEvent $event)
    {
        // on récupére l'utilisateur
        $user = $event->getUser();
        // on enrichi les donnée de l'utilisateur
        $data = $event->getData();
        $data['firstName'] = $user->getNom();
        $data['lastName'] = $user->getPrenom();
        $data['mail'] = $user->getMail();
        $data['departement'] = $user->getDepartement();

        $event->setData($data);
    }

}