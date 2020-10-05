<?php

namespace App\Entity;

use App\Repository\DepartementsRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=DepartementsRepository::class)
 */
class Departements
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $nom;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $logo;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $remarquesBon;

    /**
     * @ORM\OneToMany(targetEntity=Techniciens::class, mappedBy="departement")
     */
    private $techniciens;

    /**
     * @ORM\OneToMany(targetEntity=User::class, mappedBy="departement")
     */
    private $users;

    /**
     * @ORM\OneToMany(targetEntity=Bons::class, mappedBy="departement")
     */
    private $bons;

    public function __construct()
    {
        $this->techniciens = new ArrayCollection();
        $this->users = new ArrayCollection();
        $this->bons = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(string $nom): self
    {
        $this->nom = $nom;

        return $this;
    }

    public function getLogo(): ?string
    {
        return $this->logo;
    }

    public function setLogo(?string $logo): self
    {
        $this->logo = $logo;

        return $this;
    }

    public function getRemarquesBon(): ?string
    {
        return $this->remarquesBon;
    }

    public function setRemarquesBon(?string $remarquesBon): self
    {
        $this->remarquesBon = $remarquesBon;

        return $this;
    }

    /**
     * @return Collection|Techniciens[]
     */
    public function getTechniciens(): Collection
    {
        return $this->techniciens;
    }

    public function addTechnicien(Techniciens $technicien): self
    {
        if (!$this->techniciens->contains($technicien)) {
            $this->techniciens[] = $technicien;
            $technicien->setDepartement($this);
        }

        return $this;
    }

    public function removeTechnicien(Techniciens $technicien): self
    {
        if ($this->techniciens->contains($technicien)) {
            $this->techniciens->removeElement($technicien);
            // set the owning side to null (unless already changed)
            if ($technicien->getDepartement() === $this) {
                $technicien->setDepartement(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|User[]
     */
    public function getUsers(): Collection
    {
        return $this->users;
    }

    public function addUser(User $user): self
    {
        if (!$this->users->contains($user)) {
            $this->users[] = $user;
            $user->setDepartement($this);
        }

        return $this;
    }

    public function removeUser(User $user): self
    {
        if ($this->users->contains($user)) {
            $this->users->removeElement($user);
            // set the owning side to null (unless already changed)
            if ($user->getDepartement() === $this) {
                $user->setDepartement(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Bons[]
     */
    public function getBons(): Collection
    {
        return $this->bons;
    }

    public function addBon(Bons $bon): self
    {
        if (!$this->bons->contains($bon)) {
            $this->bons[] = $bon;
            $bon->setDepartement($this);
        }

        return $this;
    }

    public function removeBon(Bons $bon): self
    {
        if ($this->bons->contains($bon)) {
            $this->bons->removeElement($bon);
            // set the owning side to null (unless already changed)
            if ($bon->getDepartement() === $this) {
                $bon->setDepartement(null);
            }
        }

        return $this;
    }
}
