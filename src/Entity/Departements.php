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

    /**
     * @ORM\OneToMany(targetEntity=Entreprises::class, mappedBy="departement")
     */
    private $entreprises;

    /**
     * @ORM\OneToMany(targetEntity=Types::class, mappedBy="departement")
     */
    private $types;

    /**
     * @ORM\OneToMany(targetEntity=Categories::class, mappedBy="departement")
     */
    private $categories;

    /**
     * @ORM\OneToMany(targetEntity=Comptes::class, mappedBy="departement")
     */
    private $comptes;

    /**
     * @ORM\OneToMany(targetEntity=Kwfs::class, mappedBy="departement")
     */
    private $kwfs;

    public function __construct()
    {
        $this->techniciens = new ArrayCollection();
        $this->users = new ArrayCollection();
        $this->bons = new ArrayCollection();
        $this->entreprises = new ArrayCollection();
        $this->types = new ArrayCollection();
        $this->categories = new ArrayCollection();
        $this->comptes = new ArrayCollection();
        $this->kwfs = new ArrayCollection();
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

    /**
     * @return Collection|Entreprises[]
     */
    public function getEntreprises(): Collection
    {
        return $this->entreprises;
    }

    public function addEntreprise(Entreprises $entreprise): self
    {
        if (!$this->entreprises->contains($entreprise)) {
            $this->entreprises[] = $entreprise;
            $entreprise->setDepartement($this);
        }

        return $this;
    }

    public function removeEntreprise(Entreprises $entreprise): self
    {
        if ($this->entreprises->contains($entreprise)) {
            $this->entreprises->removeElement($entreprise);
            // set the owning side to null (unless already changed)
            if ($entreprise->getDepartement() === $this) {
                $entreprise->setDepartement(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Types[]
     */
    public function getTypes(): Collection
    {
        return $this->types;
    }

    public function addType(Types $type): self
    {
        if (!$this->types->contains($type)) {
            $this->types[] = $type;
            $type->setDepartement($this);
        }

        return $this;
    }

    public function removeType(Types $type): self
    {
        if ($this->types->contains($type)) {
            $this->types->removeElement($type);
            // set the owning side to null (unless already changed)
            if ($type->getDepartement() === $this) {
                $type->setDepartement(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Categories[]
     */
    public function getCategories(): Collection
    {
        return $this->categories;
    }

    public function addCategory(Categories $category): self
    {
        if (!$this->categories->contains($category)) {
            $this->categories[] = $category;
            $category->setDepartement($this);
        }

        return $this;
    }

    public function removeCategory(Categories $category): self
    {
        if ($this->categories->contains($category)) {
            $this->categories->removeElement($category);
            // set the owning side to null (unless already changed)
            if ($category->getDepartement() === $this) {
                $category->setDepartement(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Comptes[]
     */
    public function getComptes(): Collection
    {
        return $this->comptes;
    }

    public function addCompte(Comptes $compte): self
    {
        if (!$this->comptes->contains($compte)) {
            $this->comptes[] = $compte;
            $compte->setDepartement($this);
        }

        return $this;
    }

    public function removeCompte(Comptes $compte): self
    {
        if ($this->comptes->contains($compte)) {
            $this->comptes->removeElement($compte);
            // set the owning side to null (unless already changed)
            if ($compte->getDepartement() === $this) {
                $compte->setDepartement(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Kwfs[]
     */
    public function getKwfs(): Collection
    {
        return $this->kwfs;
    }

    public function addKwf(Kwfs $kwf): self
    {
        if (!$this->kwfs->contains($kwf)) {
            $this->kwfs[] = $kwf;
            $kwf->setDepartement($this);
        }

        return $this;
    }

    public function removeKwf(Kwfs $kwf): self
    {
        if ($this->kwfs->contains($kwf)) {
            $this->kwfs->removeElement($kwf);
            // set the owning side to null (unless already changed)
            if ($kwf->getDepartement() === $this) {
                $kwf->setDepartement(null);
            }
        }

        return $this;
    }
}
